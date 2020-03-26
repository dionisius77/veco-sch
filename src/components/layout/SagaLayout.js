// import { call, put, takeLatest } from 'redux-saga/effects';
import { put, takeLatest } from 'redux-saga/effects';
// import { HTTP_SERVICE } from '../../service/HttpService';

import {
  AUTH_FETCH,
} from './ConfigLayout';
import {
  authSuccess,
  authFailed,
} from './ActionLayout';

function* workerSagaSignIn(params) {
  try {
    // const response = yield call(HTTP_SERVICE.post, API_SIGNIN, params.send);
    // if (response.status === 200 && response.data) {
    yield put(authSuccess(params.send));
    // } else {
    //   yield put(authFailed(response.data.message));
    // }
  } catch (error) {
    yield put(authFailed(error));
  }
}

export const watcherLayout = [
  takeLatest(AUTH_FETCH, workerSagaSignIn),
];
