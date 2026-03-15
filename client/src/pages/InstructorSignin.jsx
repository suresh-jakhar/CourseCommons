import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAtomValue, useSetAtom } from 'jotai'
import { instructorSignin } from '../services/instructor'
import { instructorAuthAtom } from '../state/instructorAuthAtom'

export default function InstructorSignin() {
  const navigate = useNavigate()
  const location = useLocation()
  const instructorAuth = useAtomValue(instructorAuthAtom)
  const setInstructorAuth = useSetAtom(instructorAuthAtom)
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  if (instructorAuth.isLoggedIn) {
    return <Navigate to="/instructor/courses" replace />
  }

  function handleChange(event) {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const data = await instructorSignin(form)
      localStorage.setItem('instructorToken', data.token)
      localStorage.setItem('instructorEmail', form.email)
      setInstructorAuth({ token: data.token, email: form.email, isLoggedIn: true })

      const destination = location.state?.from || '/instructor/courses'
      navigate(destination, { replace: true })
    } catch (err) {
      setError(err.response?.data?.message || 'Instructor sign in failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-full items-center justify-center px-6 py-16">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-secondary">Instructor access</p>
          <h1 className="mt-3 text-3xl font-bold text-primary">Sign in to manage your courses</h1>
          <p className="mt-2 text-sm text-secondary">
            Need an instructor account?{' '}
            <Link to="/instructor/signup" className="text-secondary hover:text-secondary">
              Create one
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-secondary">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full cinematic-btn cinematic-btn-primary py-2.5 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="teacher@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-secondary">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full cinematic-btn cinematic-btn-primary py-2.5 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Your password"
            />
          </div>

          {error && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full cinematic-btn cinematic-btn-primary py-2.5 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Sign in as instructor'}
          </button>
        </form>
      </div>
    </div>
  )
}