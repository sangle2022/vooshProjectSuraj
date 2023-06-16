import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDkzQCkzVjY6KT0UORtFAOTyTvNehRWlQs",
  authDomain: "voosh-be665.firebaseapp.com",
  projectId: "voosh-be665",
  storageBucket: "voosh-be665.appspot.com",
  messagingSenderId: "306568421512",
  appId: "1:306568421512:web:f085d3a68c8fe784d5bf3d",
  measurementId: "G-7N5GJL3WTR",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
