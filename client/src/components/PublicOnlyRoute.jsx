import { Navigate } from 'react-router-dom'
import { useAtomValue } from 'jotai'
import { authAtom } from '../state/authAtom'
import { instructorAuthAtom } from '../state/instructorAuthAtom'

/**
 * PublicOnlyRoute — wraps pages that should only be accessible when NOT logged in.
 * Logged-in learners → /my-courses
 * Logged-in instructors → /instructor/courses
 */
export default function PublicOnlyRoute({ children }) {
  const auth = useAtomValue(authAtom)
  const instructorAuth = useAtomValue(instructorAuthAtom)

  if (instructorAuth.isLoggedIn) {
    return <Navigate to="/instructor/courses" replace />
  }

  if (auth.isLoggedIn) {
    return <Navigate to="/my-courses" replace />
  }

  return children
}
