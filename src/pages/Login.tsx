import React, { useState } from "react"
import { auth } from "../services/firebase"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1e88e5 0%, #0d47a1 100%)',
      padding: '1rem'
    }}>
      <div style={{ 
        background: 'white', 
        padding: '2rem', 
        borderRadius: '12px', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        maxWidth: '400px',
        width: '100%'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#1e88e5' }}>
          ???? ????????? ???????
        </h1>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              ?????? ??????????
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              placeholder="example@email.com"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '2px solid #e1e5e9',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              ???? ??????
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              placeholder="???? ??????"
              minLength={6}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '2px solid #e1e5e9',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
          </div>
          
          {error && (
            <div style={{ 
              color: '#d32f2f', 
              textAlign: 'center', 
              marginBottom: '1rem',
              padding: '0.5rem',
              background: '#ffebee',
              borderRadius: '4px'
            }}>
              {error}
            </div>
          )}
          
          <button 
            type="submit" 
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.75rem 1.5rem',
              background: '#1e88e5',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              marginBottom: '1rem',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? '???? ????????...' : (isSignUp ? '????? ????' : '????? ??????')}
          </button>
          
          <button 
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.75rem 1.5rem',
              background: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {isSignUp ? '???? ????? ??? ??????' : '?? ???? ????? ????? ????'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
