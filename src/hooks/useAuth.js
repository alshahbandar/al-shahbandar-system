import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../services/firebase-simple";

export const useAuth = () => {
  const [user, loading, error] = useAuthState(auth);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
        if (docSnap.exists()) {
          setUserProfile(docSnap.data());
        } else {
          // Create default profile
          setUserProfile({ 
            email: user.email, 
            name: "",
            phone: ""
          });
        }
      });

      return () => unsubscribe();
    } else {
      setUserProfile(null);
    }
  }, [user]);

  return {
    user,
    loading,
    error,
    userProfile
  };
};
