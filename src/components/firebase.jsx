import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfLPpUYYLWIbqXEfHvg8RDG2mfZV_lIBA",
  authDomain: "ackleaners-86539.firebaseapp.com",
  projectId: "ackleaners-86539",
  storageBucket: "ackleaners-86539.appspot.com",
  messagingSenderId: "691570522796",
  appId: "1:691570522796:web:fa158849342ba1c4bd3d09",
  measurementId: "G-T90ZG5PFZ7"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
auth.languageCode = 'es_419';
const db = app.firestore();

const signInWithEmailAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (nombre, email, password, tipo) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    await user.sendEmailVerification();
    await db.collection("users").add({
      uid: user.uid,
      nombre,
      authProvider: "local",
      email,
      tipo,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  auth.signOut();
};

export {
  auth,
  db,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
};