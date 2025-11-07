import React from "react"
import { AuthProvider } from "./services/firebase"
import Router from "./router"

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}

export default App
