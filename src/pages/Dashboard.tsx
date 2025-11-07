import React from "react"
import { useAuth } from "../services/firebase"
import { Link } from "react-router-dom"

function Dashboard() {
  const { user, logout } = useAuth()

  return (
    <div style={{ 
      minHeight: '100vh',
      background: '#f8f9fa',
      direction: 'rtl'
    }}>
      <nav style={{
        background: 'white',
        padding: '1rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e88e5' }}>
            ???? ????????? ???????
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button onClick={logout} style={{
              padding: '0.5rem 1rem',
              background: '#d32f2f',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}>
              ????? ??????
            </button>
          </div>
        </div>
      </nav>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem'
      }}>
        <h1>???? ??????</h1>
        <p>??????? {user?.email}</p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginTop: '2rem'
        }}>
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#1e88e5', marginBottom: '1rem' }}>????????</h3>
            <p>????? ???????? ?????????</p>
            <div style={{ marginTop: '1rem' }}>
              <Link to="/invoices/new" style={{
                display: 'inline-block',
                padding: '0.5rem 1rem',
                background: '#1e88e5',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                marginRight: '0.5rem'
              }}>
                ?????? ?????
              </Link>
              <Link to="/invoices" style={{
                display: 'inline-block',
                padding: '0.5rem 1rem',
                background: '#6c757d',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px'
              }}>
                ??? ????????
              </Link>
            </div>
          </div>

          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#1e88e5', marginBottom: '1rem' }}>???????</h3>
            <p>????? ?????? ???????</p>
            <div style={{ marginTop: '1rem' }}>
              <Link to="/customers" style={{
                display: 'inline-block',
                padding: '0.5rem 1rem',
                background: '#1e88e5',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px'
              }}>
                ????? ???????
              </Link>
            </div>
          </div>

          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#1e88e5', marginBottom: '1rem' }}>????????</h3>
            <p>????? ??????? ?????????</p>
            <div style={{ marginTop: '1rem' }}>
              <Link to="/products" style={{
                display: 'inline-block',
                padding: '0.5rem 1rem',
                background: '#1e88e5',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px'
              }}>
                ????? ????????
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
