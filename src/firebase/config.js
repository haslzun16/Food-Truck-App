import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyBxGHYixNRHXakbnHjsw9qKcQjsb0JssUI',
    authDomain: 'your-auth-domain-b1234.firebaseapp.com',
    databaseURL: 'https://your-database-name.firebaseio.com',
    projectId: 'foodtruck-a92cc',
    storageBucket: 'your-project-id-1234.appspot.com',
    messagingSenderId: '12345-insert-yourse',
    appId: '1:233124233438:ios:afb05f5be9fdc7b83cc24f',
  };
  
  

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };