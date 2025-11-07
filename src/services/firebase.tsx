import React, { createContext, useContext, useEffect, useState } from "react"
import { initializeApp, FirebaseApp } from "firebase/app"
import { getAuth, Auth, User, signOut } from "firebase/auth"
import { getFirestore, Firestore, enableIndexedDbPersistence } from "firebase/firestore"

export const firebaseConfig = {
  apiKey: "AIzaSyBXF-T-5_3a_p5DLx6mtVcXU6oMpC5F488",
  authDomain: "al-shahbandar.firebaseapp.com",
  projectId: "al-shahbandar",
  storageBucket: "al-shahbandar.firebasestorage.app",
  messagingSenderId: "246101313051",
  appId: "1:246101313051:web:706ec12d5d23ec56eb9abe",
  measurementId: "G-3GQQHQN8QP"
}

let app: FirebaseApp
let auth: Auth
let db: Firestore

export function getFirebase() {
  if (!app) {
    app = initializeApp(firebaseConfig)
    auth = getAuth(app)
    db = getFirestore(app)
    
    enableIndexedDbPersistence(db).catch((err) => {
      console.log("Persistence failed: ", err)
    })
  }
  
  return { app, auth, db }
}

interface AuthContextType {
  user: User | null
  loading: boolean
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  loading: true,
  logout: async () => {}
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const { auth } = getFirebase()
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const logout = async () => {
    const { auth } = getFirebase()
    await signOut(auth)
  }

  return (
    React.createElement(AuthContext.Provider, { 
      value: { user, loading, logout } 
    }, children)
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

export { app, auth, db }
