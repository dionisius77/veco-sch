// import { call, put, takeLatest } from 'redux-saga/effects';
import { put, takeLatest } from 'redux-saga/effects';
import { HTTP_SERVICE } from '../../services/HttpServices';

import {
  AUTH_FETCH, MASTER_DATA_FETCH,
} from './ConfigLayout';
import {
  authSuccess,
  authFailed,
  masterDataSuccess,
  masterDataFailed
} from './ActionLayout';

function* workerSagaSignIn(params) {
  try {
    const response = yield HTTP_SERVICE.login(params.send);
    // const user = yield HTTP_SERVICE.getUserInfo();
    // if(response.user){
    const staffData = yield HTTP_SERVICE.getFBFilter({
      collection: 'datastaff',
      lastVisible: '',
      limit: 1,
      orderBy: 'nama',
      directions: 'asc',
      params: 'email',
      operator: "==",
      value: response.user.email,
    });
    if (staffData.docs.length > 0) {
      let bidangStudi, jabatan, wali, nik;
      staffData.forEach(element => {
        bidangStudi = element.data().bidangStudi;
        jabatan = element.data().jabatan;
        wali = element.data().wali || '';
        nik = element.data().nik;
      });
      if (!response.user.emailVerified) {
        response.user.sendEmailVerification().then(res => { });
      }
      yield put(authSuccess({
        displayName: response.user.displayName,
        email: response.user.email,
        phoneNumber: response.user.phoneNumber,
        photoUrl: response.user.photoURL,
        author: response.user.uid,
        bidangStudi: bidangStudi,
        jabatan: jabatan,
        wali: wali,
        emailVerified: response.user.emailVerified,
        nik: nik,
      }));
    } else {
      yield HTTP_SERVICE.logOut();
      yield put(authFailed('nonStaff'));
    }
    // } else {
    //   yield put(authFailed('wrong email password'))
    // }
    // if (response.status === 200 && response.data) {
    // yield put(authSuccess(params.send));
    // } else {
    //   yield put(authFailed(response.data.message));
    // }
  } catch (error) {
    yield HTTP_SERVICE.logOut();
    yield put(authFailed(error));
  }
}

function* getMasterData(params) {
  // console.log(params);
  try {
    const response = yield HTTP_SERVICE.getFb({ collection: 'masterdata' });
    if (response.docs.length > 0) {
      let result = {};
      response.docs.forEach(e => {
        result[e.id] = e.data().data;
      });
      yield put(masterDataSuccess(result));
    }
  } catch (error) {
    yield put(masterDataFailed(error));
  }
}

export const watcherLayout = [
  takeLatest(AUTH_FETCH, workerSagaSignIn),
  takeLatest(MASTER_DATA_FETCH, getMasterData)
];
