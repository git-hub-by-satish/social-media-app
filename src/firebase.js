import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBM-8dkNZMRi31hDKI5SCMSpKvoU5K6GkA",
    authDomain: "satish-social-media-app.firebaseapp.com",
    projectId: "satish-social-media-app",
    storageBucket: "satish-social-media-app.appspot.com",
    messagingSenderId: "48779322396",
    appId: "1:48779322396:web:0d975bb410d3b09fcf2bd9",
    measurementId: "G-99MN74RSWP"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
//export const db = firebase.firestore()
//const auth = firebase.auth()

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

export default auth