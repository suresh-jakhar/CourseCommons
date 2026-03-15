import { Navigate, useLocation } from 'react-router-dom'
import { useAtomValue } from 'jotai'
import { authAtom } from '../state/authAtom'
import { instructorAuthAtom } from '../state/instructorAuthAtom'

/**
 * ProtectedRoute — learner-only pages.
 * Instructors who try to access these are redirected to their own dashboard.
 * Unauthenticated users are redirected to /signin.
 */
export default function ProtectedRoute({ children }) {
  const auth = useAtomValue(authAtom)
  const instructorAuth = useAtomValue(instructorAuthAtom)
  const location = useLocation()

  // Logged-in instructor trying to access a learner page → send to instructor dashboard
  if (instructorAuth.isLoggedIn) {
    return <Navigate to="/instructor/courses" replace />
  }

  // Not logged in at all → send to sign-in, preserving the intended destination
  if (!auth.isLoggedIn) {
    return <Navigate to="/signin" replace state={{ from: location.pathname }} />
  }

  return children
}
