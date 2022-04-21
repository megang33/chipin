// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA76jduRFf8rn1o_u3WFYYpIm-LgkGpmqg",
    authDomain: "chipin-e812c.firebaseapp.com",
    projectId: "chipin-e812c",
    storageBucket: "chipin-e812c.appspot.com",
    messagingSenderId: "682897930529",
    appId: "1:682897930529:web:64348b7083650d9001a660"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);