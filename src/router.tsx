import React from "react"
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./services/firebase"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"

function AppRouter() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        direction: 'rtl'
      }}>
        ???? ???????...
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={!user ? <Login /> : <Navigate to="/dashboard" replace />} 
        />
        <Route 
          path="/dashboard" 
          element={user ? <Dashboard /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/" 
          element={<Navigate to={user ? "/dashboard" : "/login"} replace />} 
        />
      </Routes>
    </Router>
  )
}

export default AppRouter
