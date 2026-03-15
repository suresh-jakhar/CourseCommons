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
    <nav className="nav-pill">
      {/* Brand logo */}
      <Link to="/" className="flex items-center gap-2 px-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 border border-white/5">
          <img src={logo} alt="Logo" className="h-4 w-4 brightness-200" />
        </div>
        <span className="hidden font-semibold text-white/90 text-[13px] tracking-tight sm:inline-block">CourseCommons</span>
      </Link>

      <div className="h-4 w-[1px] bg-white/10 mx-1" />

      {/* Nav Links - Centered capsule style */}
      <div className="flex items-center gap-0.5 ml-1">
        <Link to="/" className={`nav-link-capsule ${location.pathname === '/' ? 'nav-link-active' : ''}`}>
          Home
        </Link>
        <Link to="/features" className={`nav-link-capsule ${location.pathname === '/features' ? 'nav-link-active' : ''}`}>
          Features
        </Link>
        <Link to="/community" className={`nav-link-capsule ${location.pathname === '/community' ? 'nav-link-active' : ''}`}>
          Community
        </Link>
        <Link to="/creators" className={`nav-link-capsule ${location.pathname === '/creators' ? 'nav-link-active' : ''}`}>
          Creators
        </Link>
        <Link to="/pricing" className={`nav-link-capsule ${location.pathname === '/pricing' ? 'nav-link-active' : ''}`}>
          Pricing
        </Link>
      </div>

      {/* Search - Restored feature */}
      <div className="nav-search-container">
        <input 
          type="text" 
          placeholder="Type to search" 
          className="nav-search-input"
        />
      </div>

      {/* Auth Actions - Right side */}
      <div className="flex items-center gap-2">
        {isGuest && (
          <>
            <Link to="/signin" className="cinematic-btn-outline">Log in</Link>
            <Link to="/signup" className="cinematic-btn-solid">Create Account</Link>
          </>
        )}
        
        {isLearner && (
          <div className="flex items-center gap-3 pr-2">
            <span className="text-[10px] text-muted tracking-wide uppercase px-2">{userName}</span>
            <button onClick={handleLearnerSignout} className="cinematic-btn-outline">Sign out</button>
          </div>
        )}

        {isInstructor && (
          <div className="flex items-center gap-3 pr-2">
            <span className="text-[10px] text-muted tracking-wide uppercase px-2">{instructorAuth.email}</span>
            <button onClick={handleInstructorSignout} className="cinematic-btn-outline">Sign out</button>
          </div>
        )}
      </div>
    </nav>
  )
}
