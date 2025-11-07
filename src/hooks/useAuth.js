import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../services/firebase-simple";
import { ROLES, ROLE_PERMISSIONS } from "../config/roles";

export const useAuth = () => {
  const [user, loading, error] = useAuthState(auth);
  const [userRole, setUserRole] = useState(ROLES.USER);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      
      // Real-time listener for user profile changes
      const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
        if (docSnap.exists()) {
          const profileData = docSnap.data();
          setUserProfile(profileData);
          setUserRole(profileData.role || ROLES.USER);
        } else {
          // Create user profile if it doesn't exist
          setUserProfile({ email: user.email, role: ROLES.USER });
          setUserRole(ROLES.USER);
        }
      });

      return () => unsubscribe();
    } else {
      setUserRole(ROLES.GUEST);
      setUserProfile(null);
    }
  }, [user]);

  const hasPermission = (permission) => {
    const userPermissions = ROLE_PERMISSIONS[userRole] || [];
    return userPermissions.includes(permission);
  };

  const isAdmin = () => userRole === ROLES.ADMIN;
  const isManager = () => userRole === ROLES.MANAGER;
  const isUser = () => userRole === ROLES.USER;

  return {
    user,
    loading,
    error,
    userRole,
    userProfile,
    hasPermission,
    isAdmin,
    isManager,
    isUser
  };
};
