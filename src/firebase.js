// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAuth } from "firebase/auth"; // 👈 import auth module
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHsxyj2CQh2bh9fQBV-RRw8LNhIYEo0w4",
  authDomain: "finacial-dashboard.firebaseapp.com",
  projectId: "finacial-dashboard",
  storageBucket: "finacial-dashboard.appspot.com",

  //storageBucket: "finacial-dashboard.firebasestorage.app",
  messagingSenderId: "51793370417",
  appId: "1:51793370417:web:bcb1c09c494cebffad6410"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Create Google Auth Provider instance
const googleProvider = new GoogleAuthProvider();

// Export what you need
export { auth, googleProvider };
export default app;