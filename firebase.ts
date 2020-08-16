import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDUzmlEIOFKJs6fgMFqN-XA6BaSqnVxg4M",
  authDomain: "hack20-52610.firebaseapp.com",
  databaseURL: "https://hack20-52610.firebaseio.com",
  projectId: "hack20-52610",
  storageBucket: "hack20-52610.appspot.com",
  messagingSenderId: "331581558698",
  appId: "1:331581558698:web:6535817d4cc241f813e5d3",
  measurementId: "G-BVLN2400LQ",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const storage = firebase.storage();

export { firebase, auth, storage };
