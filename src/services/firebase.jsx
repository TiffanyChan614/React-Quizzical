// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB1C90JDqTuXHLJg82gpfceCDnojRSnUu4',
  authDomain: 'react-quizzical-426e3.firebaseapp.com',
  projectId: 'react-quizzical-426e3',
  storageBucket: 'react-quizzical-426e3.appspot.com',
  messagingSenderId: '410222502658',
  appId: '1:410222502658:web:3b34261a2817d94b30d81b',
  measurementId: 'G-RY94JYMJSC',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export const scoreCollection = collection(db, 'scores')
