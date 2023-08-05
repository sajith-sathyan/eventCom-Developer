// Import the functions you need from the SDKs you need
import { initializeApp ,getApp,getApps} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// import {getStorage} from "firebase/storage"
// import {getFirestore} from "firebase/firestore"



const firebaseConfig = {
  apiKey: "AIzaSyAJ6H_301JNjfASCjMtul6p1gnLhixQfqw",
  authDomain: "evevtcom.firebaseapp.com",
  projectId: "evevtcom",
  storageBucket: "evevtcom.appspot.com",
  messagingSenderId: "317712597058",
  appId: "1:317712597058:web:01ff1591b7dcbbc8faeddb",
  measurementId: "G-0QFSYHV5XM"
};

// Initialize Firebase

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

const storage = getStorage(app);

export { app, storage };