import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyAfLPpUYYLWIbqXEfHvg8RDG2mfZV_lIBA",
    authDomain: "ackleaners-86539.firebaseapp.com",
    databaseURL: "https://ackleaners-86539-default-rtdb.firebaseio.com",
    projectId: "ackleaners-86539",
    storageBucket: "ackleaners-86539.appspot.com",
    messagingSenderId: "691570522796",
    appId: "1:691570522796:web:fa158849342ba1c4bd3d09",
    measurementId: "G-T90ZG5PFZ7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);