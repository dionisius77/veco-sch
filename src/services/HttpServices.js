import axios from 'axios';
import firebase from './FbConfig';
// import 'firebase/performance';
const { firebaseMain, firebaseSecondary } = firebase;
const server = 'http://dionisius77.pythonanywhere.com/';
const db = firebaseMain.firestore();
const storageRef = firebaseMain.storage().ref();
// db.settings({ timestampsInSnapshots: true });
// const perf = firebaseMain.performance();

export const HTTP_SERVICE = {
  get(url) {
    return axios(server + url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  },
  post(request) {
    return axios(server + request.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: request.data
    });
  },
  inputFb(request) {
    let userRef;
    if (request.doc) {
      userRef = db.collection(request.collection).doc(request.doc).set(request.data);
    } else {
      userRef = db.collection(request.collection).add(request.data);
    }
    return userRef;
  },
  getFb(request) {
    let userRef;
    // const trace = perf.trace('input to collection ' + request.collection);
    if (request.limit !== undefined && request.directions !== undefined) {
      if (request.lastVisible !== '') {
        userRef = db.collection(request.collection)
          .orderBy(request.orderBy, request.directions)
          .startAfter(request.lastVisible)
          .limit(request.limit)
          .get();
      } else {
        userRef = db.collection(request.collection).orderBy(request.orderBy, request.directions).limit(request.limit).get();
      }
    } else {
      if (request.doc) {
        userRef = db.collection(request.collection).doc(request.doc).get();
      } else {
        userRef = db.collection(request.collection).get();
      }
    }
    return userRef;
  },
  updateFB(request) {
    const userRef = db.collection(request.collection)
      .doc(request.doc).update(request.data);

    return userRef;
  },
  deleteFB(request) {
    const userRef = db.collection(request.collection).doc(request.doc).delete();
    return userRef;
  },
  getFBFilter(request) {
    const userRef = db.collection(request.collection)
      .where(request.params, request.operator, request.value)
      .orderBy(request.orderBy, request.directions)
      .startAfter(request.lastVisible)
      .limit(request.limit)
      .get();
    return userRef;
  },
  getFBTwoFilter(request) {
    const userRef = db.collection(request.collection)
      .where(request.params, request.operator, request.value)
      .where(request.params2, request.operator2, request.value2)
      .orderBy(request.orderBy, request.directions)
      .startAfter(request.lastVisible)
      .limit(request.limit)
      .get();
    return userRef;
  },
  getFbSubCollection(request) {
    let userRef;
    userRef = db.collection(request.collection).doc(request.doc).collection(request.subCollection).get();
    return userRef;
  },
  inputFbSubCollection(request) {
    let userRef;
    if (request.doc) {
      userRef = db.collection(request.collection).doc(request.doc).collection(request.subCollection).doc(request.subDoc).set(request.data);
    } else {
      userRef = db.collection(request.collection).doc(request.doc).collection(request.subCollection).add(request.data);
    }
    return userRef;
  },
  deleteFbSubCollection(request) {
    const userRef = db.collection(request.collection).doc(request.doc).collection(request.subCollection).doc(request.subDoc).delete();
    return userRef;
  },
  registerAcc(request) {
    firebaseSecondary.auth().createUserWithEmailAndPassword(request.email, request.password)
      .then(res => {
        firebaseSecondary.auth().signOut();
      })
  },
  login(request) {
    const userRef = firebaseMain.auth().signInWithEmailAndPassword(request.email, request.password);
    return userRef;
  },
  getUserInfo() {
    const userRef = firebaseMain.auth().currentUser;
    return userRef;
  },
  getUserInfoLoggedIn() {
    const userRef = firebaseMain.auth();
    return userRef;
  },
  logOut() {
    const userRef = firebaseMain.auth().signOut();
    return userRef;
  },
  profilePicture(req){
    const metadata = {
      contentType: 'image/jpeg'
    };
    const userRef = storageRef.child('profilePicture/'+req.uid).put(req.file, metadata);
    return userRef;
  },
}