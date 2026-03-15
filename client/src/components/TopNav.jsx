import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAtom, useAtomValue } from 'jotai'
import { instructorAuthAtom } from '../state/instructorAuthAtom'
import { authAtom } from '../state/authAtom'
import { enrolledCoursesAtom } from '../state/enrolledCoursesAtom'
import { profileAtom } from '../state/profileAtom'
import { clearInstructorSession, clearLearnerSession } from '../state/sessionActions'
import logo from '../assets/CC-logo-svg.svg'

// All learner navigation links
const learnerLinks = [
  { to: '/', label: 'Home' },
  { to: '/community', label: 'Community' },
  { to: '/channels', label: 'Channels' },
  { to: '/announcements', label: 'Announcements' },
  { to: '/courses', label: 'Explore' },
]

// Guest sees only Home in the nav (all others require login)
const guestLinks = [{ to: '/', label: 'Home' }]

function isActive(pathname, to) {
  if (to === '/') return pathname === '/'
  return pathname.startsWith(to)
}

export default function TopNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [auth] = useAtom(authAtom)
  const [profile] = useAtom(profileAtom)
  const [, setEnrolledCourses] = useAtom(enrolledCoursesAtom)
  const instructorAuth = useAtomValue(instructorAuthAtom)

  // Derive current user role — only one can be true
  const isLearner = auth.isLoggedIn && !instructorAuth.isLoggedIn
  const isInstructor = instructorAuth.isLoggedIn
  const isGuest = !auth.isLoggedIn && !instructorAuth.isLoggedIn

  // Nav links to render — role-dependent
  const visibleLinks = isLearner ? learnerLinks : isGuest ? guestLinks : []

  const userName = profile ? `${profile.firstName} ${profile.lastName}` : 'User'

  function handleLearnerSignout() {
    clearLearnerSession()
    setEnrolledCourses([])
    navigate('/')
  }

  function handleInstructorSignout() {
    clearInstructorSession()
    navigate('/signin')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface backdrop-blur-xl relative">
      <div className="mx-auto flex h-[68px] w-full max-w-[1440px] items-center gap-3 px-3 md:px-5 xl:px-8">

        {/* Logo — always visible */}
        <Link to={isInstructor ? '/instructor/courses' : '/'} className="flex items-center gap-2 rounded-xl border border-border bg-glass px-3 py-2">
          <img src={logo} alt="CourseCommons" className="h-5 w-5" />
          <span className="cinematic-title text-sm font-semibold text-primary">CourseCommons</span>
        </Link>

        {/* Desktop nav pill — only rendered when there are links to show */}
        {visibleLinks.length > 0 && (
          <div className="hidden items-center gap-1 rounded-xl border border-border bg-glass p-1 lg:flex">
            {visibleLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-lg px-3 py-2 text-sm transition ${
                  isActive(location.pathname, item.to)
                    ? 'bg-glass text-primary'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}

        {/* Desktop right-side controls */}
        <div className="ml-auto hidden items-center gap-3 md:flex">

          {/* Search, Notifications, Avatar — learners only */}
          {isLearner && (
            <div className="flex min-w-[220px] items-center gap-2 rounded-xl border border-border bg-glass px-3 py-2">
              <span className="text-muted">Search</span>
            </div>
          )}
          {isLearner && (
            <button type="button" className="rounded-xl border border-border bg-glass px-3 py-2 text-sm text-secondary hover:text-primary">
              Notifications
            </button>
          )}
          {isLearner && (
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-glass text-sm font-semibold text-primary">
              {userName.trim().charAt(0).toUpperCase()}
            </div>
          )}

          {/* User label + Sign out — per role */}
          {isInstructor && (
            <>
              <span className="hidden rounded-xl border border-border bg-glass px-3 py-2 text-sm text-secondary xl:inline-block">
                {instructorAuth.email}
              </span>
              <button type="button" onClick={handleInstructorSignout} className="cinematic-btn text-sm">
                Sign out
              </button>
            </>
          )}
          {isLearner && (
            <>
              <span className="hidden rounded-xl border border-border bg-glass px-3 py-2 text-sm text-secondary xl:inline-block">
                {userName}
              </span>
              <button type="button" onClick={handleLearnerSignout} className="cinematic-btn text-sm">
                Sign out
              </button>
            </>
          )}
          {isGuest && (
            <>
              <Link to="/signup" className="cinematic-btn cinematic-btn-primary text-sm">Create Account</Link>
              <Link to="/signin" className="cinematic-btn text-sm">Log in</Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="ml-auto rounded-lg border border-border bg-glass px-3 py-2 text-sm text-primary lg:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          Menu
        </button>
      </div>

      {/* Mobile menu — role-aware, mirrors desktop logic */}
      {isOpen && (
        <div className="border-t border-border bg-surface px-3 py-4 lg:hidden">
          <nav className="space-y-1">
            {visibleLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={`block rounded-lg px-3 py-2 text-sm ${
                  isActive(location.pathname, item.to)
                    ? 'bg-glass text-primary'
                    : 'text-secondary hover:bg-glass hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Learner-only extra links */}
            {isLearner && (
              <Link to="/my-courses" onClick={() => setIsOpen(false)} className="block rounded-lg px-3 py-2 text-sm text-secondary hover:bg-glass hover:text-primary">
                My Courses
              </Link>
            )}
            {isLearner && (
              <Link to="/profile" onClick={() => setIsOpen(false)} className="block rounded-lg px-3 py-2 text-sm text-secondary hover:bg-glass hover:text-primary">
                Settings
              </Link>
            )}

            {/* Auth action button */}
            {isInstructor && (
              <button
                type="button"
                onClick={() => { handleInstructorSignout(); setIsOpen(false) }}
                className="block w-full rounded-lg px-3 py-2 text-left text-sm text-secondary hover:bg-glass hover:text-primary"
              >
                Sign out
              </button>
            )}
            {isLearner && (
              <button
                type="button"
                onClick={() => { handleLearnerSignout(); setIsOpen(false) }}
                className="block w-full rounded-lg px-3 py-2 text-left text-sm text-secondary hover:bg-glass hover:text-primary"
              >
                Sign out
              </button>
            )}
            {isGuest && (
              <>
                <Link to="/signin" onClick={() => setIsOpen(false)} className="block rounded-lg px-3 py-2 text-sm text-secondary hover:bg-glass hover:text-primary">
                  Log in
                </Link>
                <Link to="/signup" onClick={() => setIsOpen(false)} className="block rounded-lg px-3 py-2 text-sm text-secondary hover:bg-glass hover:text-primary">
                  Create Account
                </Link>
              </>
            )}
          </nav>
        </div>
      )}

      <div className="pointer-events-none absolute inset-x-0 top-0 h-[68px] bg-gradient-to-b from-white/10 to-transparent opacity-20" />
    </header>
  )
}
