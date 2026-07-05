import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import api from '../utils/api'

/* ============================================================
   AUTH CONTEXT
   - Stores current user + tokens
   - Provides login / register / logout helpers
   - Auto-refreshes access token on mount
   ============================================================ */

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true) // true until initial auth check

  /* --------------------------------------------------------
     On mount, try to restore session.
     Backend sends { user, accessToken, refreshToken } on login/register.
     We store both in localStorage; access token is attached to
     every request by the api.js interceptor.
     -------------------------------------------------------- */
  const restoreSession = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken')
      if (!refreshToken) {
        setLoading(false)
        return
      }
      // Try to get a new access token using stored refresh token
      const { data } = await api.post('/auth/refresh-token', { refreshToken })
      if (data.user) setUser(data.user)
      if (data.accessToken) localStorage.setItem('accessToken', data.accessToken)
      if (data.refreshToken) localStorage.setItem('refreshToken', data.refreshToken)
    } catch {
      // Token expired or invalid — clear everything
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    restoreSession()
  }, [restoreSession])

  /* --------------------------------------------------------
     Login — calls POST /api/auth/login
     Backend responds with: { success, user, accessToken, refreshToken }
     -------------------------------------------------------- */
  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    // Store tokens
    if (data.accessToken) localStorage.setItem('accessToken', data.accessToken)
    if (data.refreshToken) localStorage.setItem('refreshToken', data.refreshToken)
    // Store user
    if (data.user) setUser(data.user)
    return data
  }

  /* --------------------------------------------------------
     Register — calls POST /api/auth/register
     Backend responds with: { success, user, accessToken, refreshToken }
     -------------------------------------------------------- */
  const register = async ({ name, email, phone, password, confirmPassword }) => {
    const { data } = await api.post('/auth/register', {
      name,
      email,
      phone,
      password,
      confirmPassword,
    })
    // Store tokens
    if (data.accessToken) localStorage.setItem('accessToken', data.accessToken)
    if (data.refreshToken) localStorage.setItem('refreshToken', data.refreshToken)
    // Store user
    if (data.user) setUser(data.user)
    return data
  }

  /* --------------------------------------------------------
     Logout — clears tokens + user state
     -------------------------------------------------------- */
  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

/* Custom hook — use anywhere: const { user, login } = useAuth() */
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
