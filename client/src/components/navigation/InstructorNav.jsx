import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAtomValue } from 'jotai'
import { instructorAuthAtom } from '../../state/instructorAuthAtom'
import { clearInstructorSession } from '../../state/sessionActions'
import logo from '../../assets/CC-logo-svg.svg'

const instructorLinks = [
  { to: '/dashboard/instructor/courses', label: 'My Courses' },
  { to: '/dashboard/instructor/courses/new', label: 'Create Course' },
]

export default function InstructorNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const instructorAuth = useAtomValue(instructorAuthAtom)

  function handleSignout() {
    clearInstructorSession()
    navigate('/signin')
  }

  return (
    <nav className="nav-pill-fixed">
      {/* Brand logo */}
      <Link to="/dashboard/instructor" className="flex items-center gap-2 px-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 border border-white/5">
          <img src={logo} alt="Logo" className="h-4 w-4 brightness-200" />
        </div>
        <span className="hidden font-semibold text-white/90 text-[13px] tracking-tight sm:inline-block">CourseCommons</span>
      </Link>

      <div className="h-4 w-[1px] bg-white/10 mx-1" />

      {/* Nav Links */}
      <div className="flex items-center gap-0.5 ml-1">
        {instructorLinks.map((link) => {
          const active = location.pathname === link.to ||
            (link.to === '/dashboard/instructor/courses' && location.pathname.startsWith('/dashboard/instructor/courses') && location.pathname !== '/dashboard/instructor/courses/new')
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link-capsule ${active ? 'nav-link-active' : ''}`}
            >
              {link.label}
            </Link>
          )
        })}
      </div>

      {/* Search */}
      <div className="nav-search-container">
        <input
          type="text"
          placeholder="Type to search"
          className="nav-search-input"
        />
      </div>

      {/* Instructor Actions */}
      <div className="flex items-center gap-3 pr-2">
        <span className="text-[10px] text-muted tracking-wide uppercase px-2">{instructorAuth.email}</span>
        <button onClick={handleSignout} className="cinematic-btn-outline">Sign out</button>
      </div>
    </nav>
  )
}
