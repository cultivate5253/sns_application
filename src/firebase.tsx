import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// Firebaseの初期化
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export { firestore };