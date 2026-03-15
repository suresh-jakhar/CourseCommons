import { Navigate, Outlet, useLocation, Link } from 'react-router-dom'
import { useAtomValue } from 'jotai'
import { authAtom } from '../state/authAtom'
import { instructorAuthAtom } from '../state/instructorAuthAtom'
import SessionBootstrap from '../components/SessionBootstrap'
import LearnerNav from '../components/navigation/LearnerNav'

const sidebarLinks = [
  { to: '/dashboard/learner', label: 'Home', exact: true },
  { to: '/dashboard/learner/my-courses', label: 'My Courses' },
  { to: '/dashboard/learner/community', label: 'Community' },
  { to: '/dashboard/learner/courses', label: 'Explore' },
  { to: '/dashboard/learner/settings', label: 'Settings' },
]

/**
 * LearnerLayout — wraps all learner-authenticated pages.
 * Instructors are redirected to their dashboard.
 * Unauthenticated users are redirected to /signin.
 */
export default function LearnerLayout() {
  const auth = useAtomValue(authAtom)
  const instructorAuth = useAtomValue(instructorAuthAtom)
  const location = useLocation()

  // Instructor trying to access learner area → send to instructor dashboard
  if (instructorAuth.isLoggedIn) {
    return <Navigate to="/dashboard/instructor" replace />
  }

  // Not logged in → send to sign-in
  if (!auth.isLoggedIn) {
    return <Navigate to="/signin" replace state={{ from: location.pathname }} />
  }

  return (
    <div className="cinematic-app min-h-screen text-primary">
      <SessionBootstrap />
      <LearnerNav />

      <div className="mx-auto flex min-h-[calc(100vh-68px)] w-full max-w-[1440px] gap-4 px-3 pb-4 pt-16 md:px-5 md:pb-5 md:pt-[4.5rem] xl:px-8">
        {/* Sidebar */}
        <aside className="cinematic-panel hidden w-64 shrink-0 rounded-2xl p-4 lg:block xl:w-72">
          <p className="mb-3 px-2 text-xs uppercase tracking-[0.2em] text-muted">Navigation</p>
          <ul className="space-y-1.5">
            {sidebarLinks.map((item) => {
              const active = item.exact
                ? location.pathname === item.to
                : location.pathname.startsWith(item.to)
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={`block rounded-xl px-3 py-2.5 text-sm transition ${
                      active
                        ? 'bg-glass text-primary'
                        : 'text-secondary hover:bg-glass hover:text-primary'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </aside>

        {/* Main content */}
        <main className="cinematic-panel w-full flex-1 overflow-hidden rounded-2xl md:rounded-3xl">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
