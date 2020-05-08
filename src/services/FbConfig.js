import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBv7iMi16HW6ZmBNyk7aTwen08sP3fg1b4",
  authDomain: "veco-school.firebaseapp.com",
  databaseURL: "https://veco-school.firebaseio.com",
  projectId: "veco-school",
  storageBucket: "veco-school.appspot.com",
  messagingSenderId: "660205853013",
  appId: "1:660205853013:web:90cf59a44270a02803b7dc",
  serviceAccountId: "firebase-adminsdk-ghrk4@veco-school.iam.gserviceaccount.com"
};

let firebaseMain = firebase.initializeApp(firebaseConfig);
let firebaseSecondary = firebase.initializeApp(firebaseConfig, "secondary");

export default {
  firebaseMain: firebaseMain,
  firebaseSecondary: firebaseSecondary,
}