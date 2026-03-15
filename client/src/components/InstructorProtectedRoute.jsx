import { Navigate, useLocation } from 'react-router-dom'
import { useAtomValue } from 'jotai'
import { instructorAuthAtom } from '../state/instructorAuthAtom'

export default function InstructorProtectedRoute({ children }) {
  const instructorAuth = useAtomValue(instructorAuthAtom)
  const location = useLocation()

  if (!instructorAuth.isLoggedIn) {
    return <Navigate to="/signin" replace state={{ from: location.pathname }} />
  }

  return children
}