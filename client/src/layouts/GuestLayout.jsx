import { Navigate, Outlet } from 'react-router-dom'
import { useAtomValue } from 'jotai'
import { authAtom } from '../state/authAtom'
import { instructorAuthAtom } from '../state/instructorAuthAtom'

/**
 * GuestLayout — wraps all unauthenticated pages.
 * If the user is already authenticated, redirect them to their dashboard.
 */
export default function GuestLayout() {
  const auth = useAtomValue(authAtom)
  const instructorAuth = useAtomValue(instructorAuthAtom)

  // Already logged in — redirect to the right dashboard
  if (instructorAuth.isLoggedIn) {
    return <Navigate to="/dashboard/instructor" replace />
  }

  if (auth.isLoggedIn) {
    return <Navigate to="/dashboard/learner" replace />
  }

  return (
    <div className="cinematic-app min-h-screen text-primary">
      {/* No top nav here — guest pages provide their own inline nav (e.g., LandingPage hero)
          or run with no nav at all (auth pages). */}
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  )
}
