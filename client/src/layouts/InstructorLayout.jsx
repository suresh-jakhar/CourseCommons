import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAtomValue } from 'jotai'
import { instructorAuthAtom } from '../state/instructorAuthAtom'
import InstructorNav from '../components/navigation/InstructorNav'

/**
 * InstructorLayout — wraps all instructor-authenticated pages.
 * Unauthenticated users are redirected to /signin.
 */
export default function InstructorLayout() {
  const instructorAuth = useAtomValue(instructorAuthAtom)
  const location = useLocation()

  if (!instructorAuth.isLoggedIn) {
    return <Navigate to="/signin" replace state={{ from: location.pathname }} />
  }

  return (
    <div className="cinematic-app min-h-screen text-primary">
      <InstructorNav />

      <main className="w-full pt-16 md:pt-[4.5rem]">
        <Outlet />
      </main>
    </div>
  )
}
