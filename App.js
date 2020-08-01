import React from 'react';
import Navigation from './src/navigation/Navigation'
import firebase from '@react-native-firebase/app'

var firebaseConfig = {
  apiKey: "AIzaSyA0VgMf6hfoJmhb-M2jXRWUEdeUopAkFq8",
  authDomain: "ayoshopping-fbaff.firebaseapp.com",
  databaseURL: "https://ayoshopping-fbaff.firebaseio.com",
  projectId: "ayoshopping-fbaff",
  storageBucket: "ayoshopping-fbaff.appspot.com",
  messagingSenderId: "713244706516",
  appId: "1:713244706516:web:ab13482f0f83b94f1bdd41",
  measurementId: "G-5BFFRV0Y87"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  return (
    <Navigation />
  );
}
