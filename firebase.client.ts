// firebase.config.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDOXRAadqa79eGWb6U040ASzFEQZFvgobM',
  authDomain: 'mytravel-3f9b8.firebaseapp.com',
  projectId: 'mytravel-3f9b8',
  storageBucket: 'mytravel-3f9b8.firebasestorage.app',
  messagingSenderId: '704102064231',
  appId: '1:704102064231:web:76ac89e6c2d864e2e234c2',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const db = getFirestore(app);
// const storage = getStorage(app);

export { app, auth };
