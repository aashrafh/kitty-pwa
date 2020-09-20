const firebaseConfig = {
  apiKey: "AIzaSyBX22QqvGHGqZCYjpC77d_Wu0Iyjin0Zh4",
  authDomain: "kitty-pwa.firebaseapp.com",
  databaseURL: "https://kitty-pwa.firebaseio.com",
  projectId: "kitty-pwa",
  storageBucket: "kitty-pwa.appspot.com",
  messagingSenderId: "530831665784",
  appId: "1:530831665784:web:d5a907aff764bf441adb8d",
  measurementId: "G-3PCHVV7XFQ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
