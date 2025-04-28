// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase"; // make sure you export `auth` from firebase.js

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // State to hold the user info
  const [loading, setLoading] = useState(true);  // State to track loading status

  // Listen to authentication state changes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);  // Set user when logged in
      } else {
        setUser(null);  // Set user to null when logged out
      }
      setLoading(false);  // Stop loading once the state is set
    });

    return () => unsub();  // Clean up the listener on component unmount
  }, []);

  // Signup function
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login function
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout function
  const logout = () => {
    return signOut(auth);
  };

  // Only render children once the loading is finished
  if (loading) {
    return <div>Loading...</div>;  // Or you can add a loader component
  }

  // Provide the user and auth functions via context
  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

