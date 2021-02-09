import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBxGHYixNRHXakbnHjsw9qKcQjsb0JssUI",
  authDomain: "foodtruck-a92cc.firebaseapp.com",
  projectId: "foodtruck-a92cc",
  storageBucket: "foodtruck-a92cc.appspot.com",
  messagingSenderId: "233124233438",
  appId: "1:233124233438:web:1cdfddc68195cf453cc24f",
  measurementId: "G-P5NE44M3M8"
};
  
  

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };