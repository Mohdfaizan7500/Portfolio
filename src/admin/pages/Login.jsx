import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../../context/AdminAuthContext'
import { ShieldAlert } from 'lucide-react'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSignup, setIsSignup] = useState(false)
  const { login, signup } = useAdminAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (isSignup) {
      const result = await signup(email, password)
      if (result.error) {
        setError(result.error)
      } else {
        setError('Account created! You can now sign in.')
        setIsSignup(false)
      }
    } else {
      const result = await login(email, password)
      if (result.error) {
        setError(result.error)
      } else {
        navigate('/admin')
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
            <ShieldAlert className="w-8 h-8 text-indigo-600" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">Admin Login</h1>
        <p className="text-center text-gray-500 mb-6 text-sm">
          {isSignup ? 'Create an admin account' : 'Sign in to access the CRM'}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none"
              placeholder="admin@example.com"
              autoFocus
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none"
              placeholder="Enter password"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
            {isSignup ? 'Create Account' : 'Sign In'}
          </button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-4">
          {isSignup ? (
            <>Already have an account? <button onClick={() => setIsSignup(false)} className="text-indigo-600 hover:underline">Sign in</button></>
          ) : (
            <>No account? <button onClick={() => setIsSignup(true)} className="text-indigo-600 hover:underline">Create one</button></>
          )}
        </p>
      </div>
    </div>
  )
}
