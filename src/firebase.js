import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBRRPJ4QpJHYi3W4Wktm9ZYFAwej16JSPo",
    authDomain: "react-blogs-app-f9eed.firebaseapp.com",
    projectId: "react-blogs-app-f9eed",
    storageBucket: "react-blogs-app-f9eed.appspot.com",
    messagingSenderId: "690012845549",
    appId: "1:690012845549:web:eeec9c0af50888667163e4"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getFirestore(app);

  export{auth,db,storage};