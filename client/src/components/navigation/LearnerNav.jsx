import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai'
import { authAtom } from '../../state/authAtom'
import { profileAtom } from '../../state/profileAtom'
import { enrolledCoursesAtom } from '../../state/enrolledCoursesAtom'
import { clearLearnerSession } from '../../state/sessionActions'
import logo from '../../assets/CC-logo-svg.svg'

const learnerLinks = [
  { to: '/dashboard/learner', label: 'Home', exact: true },
  { to: '/dashboard/learner/my-courses', label: 'My Courses' },
  { to: '/dashboard/learner/courses', label: 'Explore' },
  { to: '/dashboard/learner/community', label: 'Community' },
  { to: '/dashboard/learner/announcements', label: 'Announcements' },
]

export default function LearnerNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const [profile] = useAtom(profileAtom)
  const [, setEnrolledCourses] = useAtom(enrolledCoursesAtom)

  const userName = profile ? `${profile.firstName} ${profile.lastName}` : 'User'

  function handleSignout() {
    clearLearnerSession()
    setEnrolledCourses([])
    navigate('/')
  }

  return (
    <nav className="nav-pill-fixed">
      {/* Brand logo */}
      <Link to="/dashboard/learner" className="flex items-center gap-2 px-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 border border-white/5">
          <img src={logo} alt="Logo" className="h-4 w-4 brightness-200" />
        </div>
        <span className="hidden font-semibold text-white/90 text-[13px] tracking-tight sm:inline-block">CourseCommons</span>
      </Link>

      <div className="h-4 w-[1px] bg-white/10 mx-1" />

      {/* Nav Links */}
      <div className="flex items-center gap-0.5 ml-1">
        {learnerLinks.map((link) => {
          const active = link.exact
            ? location.pathname === link.to
            : location.pathname.startsWith(link.to)
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

      {/* User Actions */}
      <div className="flex items-center gap-3 pr-2">
        <span className="text-[10px] text-muted tracking-wide uppercase px-2">{userName}</span>
        <button onClick={handleSignout} className="cinematic-btn-outline">Sign out</button>
      </div>
    </nav>
  )
}
