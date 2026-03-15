import { useState } from 'react'
import { useNavigate, Link, Navigate, useLocation } from 'react-router-dom'
import { useAtomValue, useSetAtom } from 'jotai'
import { instructorSignin } from '../services/instructor'
import { getProfile, signin } from '../services/auth'
import { instructorAuthAtom } from '../state/instructorAuthAtom'
import { authAtom } from '../state/authAtom'
import { profileAtom } from '../state/profileAtom'
import { enrolledCoursesAtom } from '../state/enrolledCoursesAtom'
import { clearInstructorSession, clearLearnerSession } from '../state/sessionActions'

function getSigninErrorMessage(userError, instructorError) {
  const instructorMessage = instructorError?.response?.data?.message
  const userMessage = userError?.response?.data?.message

  if (instructorMessage === 'Invalid password' || userMessage === 'Invalid password') {
    return 'Invalid password'
  }

  if (instructorMessage === 'Instructor not found' && userMessage === 'User not found') {
    return 'No account found for this email'
  }

  return userMessage || instructorMessage || 'Sign in failed. Please try again.'
}

export default function Signin() {
  const navigate = useNavigate()
  const location = useLocation()
  const learnerAuth = useAtomValue(authAtom)
  const instructorAuth = useAtomValue(instructorAuthAtom)
  const setAuth = useSetAtom(authAtom)
  const setInstructorAuth = useSetAtom(instructorAuthAtom)
  const setProfile = useSetAtom(profileAtom)
  const setEnrolledCourses = useSetAtom(enrolledCoursesAtom)
  const [form, setForm] = useState({ email: '', password: '' })
  const [notice] = useState(location.state?.notice || '')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  if (instructorAuth.isLoggedIn) {
    return <Navigate to="/dashboard/instructor/courses" replace />
  }

  if (learnerAuth.isLoggedIn) {
    return <Navigate to="/dashboard/learner" replace />
  }

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    clearLearnerSession()
    clearInstructorSession()
    setEnrolledCourses([])

    try {
      const instructorData = await instructorSignin(form)
      localStorage.setItem('instructorToken', instructorData.token)
      localStorage.setItem('instructorEmail', form.email)
      setInstructorAuth({ token: instructorData.token, email: form.email, isLoggedIn: true })
      navigate('/dashboard/instructor/courses', { replace: true })
    } catch (instructorError) {
      try {
        const data = await signin(form)
        localStorage.setItem('token', data.token)
        setAuth({ token: data.token, isLoggedIn: true })
        const user = await getProfile()
        setProfile(user)
        navigate('/dashboard/learner', { replace: true })
      } catch (userError) {
        setError(getSigninErrorMessage(userError, instructorError))
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-full items-center justify-center px-6 py-16">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">Sign in to your account</h1>
          <p className="mt-2 text-sm text-secondary">
            We will route you to the right dashboard automatically.
          </p>
          <p className="mt-2 text-sm text-secondary">
            Don't have an account yet?{' '}
            <Link to="/signup" className="text-secondary hover:text-secondary">
              Sign up
            </Link>
          </p>
        </div>

        {notice && (
          <p className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
            {notice}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-secondary mb-1.5">
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
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-secondary mb-1.5">
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
            <p className="rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full cinematic-btn cinematic-btn-primary py-2.5 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  )
}
