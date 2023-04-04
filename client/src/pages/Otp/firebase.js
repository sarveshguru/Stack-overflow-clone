import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWHqjFf9qjProYE6vxXLsQH5T50ULVBu4",
  authDomain: "stack-overflow-5d2d8.firebaseapp.com",
  projectId: "stack-overflow-5d2d8",
  storageBucket: "stack-overflow-5d2d8.appspot.com",
  messagingSenderId: "371363223772",
  appId: "1:371363223772:web:0d21f031a73c86feb07c19"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;