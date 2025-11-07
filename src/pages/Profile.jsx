import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../services/firebase-simple";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ROLES } from "../config/roles";
import ProtectedComponent from "../components/ProtectedComponent";

const Profile = () => {
  const [user] = useAuthState(auth);
  const { userProfile, userRole, isAdmin } = useAuth();
  const [profile, setProfile] = useState({ name: "", phone: "", role: ROLES.USER });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfile({ 
            name: data.name || "", 
            phone: data.phone || "", 
            role: data.role || ROLES.USER 
          });
        }
      }
    };
    fetchProfile();
  }, [user]);

  const updateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await setDoc(doc(db, "users", user.uid), {
        ...profile,
        email: user.email,
        updatedAt: new Date()
      });
      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage("Error updating profile: " + error.message);
    }
    setLoading(false);
  };

  return React.createElement("div", { 
    style: { 
      maxWidth: "500px", 
      margin: "30px auto", 
      padding: "30px",
      border: "1px solid #ddd",
      borderRadius: "8px"
    } 
  },
    React.createElement("h1", null, "User Profile"),
    React.createElement("p", { style: { color: "#666" } }, `Current Role: ${userRole}`),
    
    message && React.createElement("div", { 
      style: { 
        padding: "10px", 
        marginBottom: "15px",
        borderRadius: "4px",
        backgroundColor: message.includes("Error") ? "#ffe6e6" : "#e6ffe6",
        color: message.includes("Error") ? "#d63031" : "#2ecc71"
      } 
    }, message),
    
    React.createElement("form", { onSubmit: updateProfile },
      React.createElement("div", { style: { marginBottom: "15px" } },
        React.createElement("label", { style: { display: "block", marginBottom: "5px", fontWeight: "bold" } }, "Full Name"),
        React.createElement("input", {
          type: "text",
          value: profile.name,
          onChange: (e) => setProfile({...profile, name: e.target.value}),
          style: {
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px"
          }
        })
      ),
      
      React.createElement("div", { style: { marginBottom: "15px" } },
        React.createElement("label", { style: { display: "block", marginBottom: "5px", fontWeight: "bold" } }, "Phone"),
        React.createElement("input", {
          type: "tel",
          value: profile.phone,
          onChange: (e) => setProfile({...profile, phone: e.target.value}),
          style: {
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px"
          }
        })
      ),
      
      // Role selection - only visible to admins
      React.createElement(ProtectedComponent, {
        permission: "manage_users",
        fallback: null
      },
        React.createElement("div", { style: { marginBottom: "15px" } },
          React.createElement("label", { style: { display: "block", marginBottom: "5px", fontWeight: "bold" } }, "User Role"),
          React.createElement("select", {
            value: profile.role,
            onChange: (e) => setProfile({...profile, role: e.target.value}),
            style: {
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px"
            }
          },
            React.createElement("option", { value: ROLES.USER }, "User"),
            React.createElement("option", { value: ROLES.MANAGER }, "Manager"),
            React.createElement("option", { value: ROLES.ADMIN }, "Admin")
          )
        )
      ),
      
      React.createElement("button", { 
        type: "submit",
        disabled: loading,
        style: {
          width: "100%",
          padding: "12px",
          backgroundColor: loading ? "#6c757d" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          fontSize: "16px",
          cursor: loading ? "not-allowed" : "pointer"
        }
      }, loading ? "Updating..." : "Update Profile")
    ),
    
    React.createElement("button", { 
      onClick: () => navigate("/dashboard"),
      style: {
        width: "100%",
        padding: "10px",
        marginTop: "15px",
        backgroundColor: "#6c757d",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer"
      }
    }, "Back to Dashboard")
  );
};

export default Profile;
