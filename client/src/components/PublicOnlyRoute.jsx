import { Navigate } from 'react-router-dom'
import { useAtomValue } from 'jotai'
import { authAtom } from '../state/authAtom'
import { instructorAuthAtom } from '../state/instructorAuthAtom'

/**
 * PublicOnlyRoute — wraps pages that should only be accessible when NOT logged in.
 * Logged-in learners → /dashboard/learner
 * Logged-in instructors → /dashboard/instructor
 */
export default function PublicOnlyRoute({ children }) {
  const auth = useAtomValue(authAtom)
  const instructorAuth = useAtomValue(instructorAuthAtom)

  if (instructorAuth.isLoggedIn) {
    return <Navigate to="/dashboard/instructor" replace />
  }

  if (auth.isLoggedIn) {
    return <Navigate to="/dashboard/learner" replace />
  }

  return children
}

