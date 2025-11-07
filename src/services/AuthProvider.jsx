import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "./firebase-simple";
import { ROLES } from "../config/roles";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        // Listen to user profile changes in Firestore
        const userDocRef = doc(db, "users", user.uid);
        const profileUnsubscribe = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            setUserProfile(docSnap.data());
          } else {
            // Create default profile if it doesn't exist
            setUserProfile({
              email: user.email,
              role: ROLES.USER,
              name: "",
              phone: ""
            });
          }
          setLoading(false);
        });

        return () => profileUnsubscribe();
      } else {
        setUserProfile(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    userProfile,
    loading,
    isAuthenticated: !!user
  };

  return React.createElement(AuthContext.Provider, { value }, children);
};
