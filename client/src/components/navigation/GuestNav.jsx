import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/CC-logo-svg.svg'

export default function GuestNav() {
  const location = useLocation()

  return (
    <nav className="nav-pill guest-nav-pill">
      {/* Brand logo */}
      <Link to="/" className="flex items-center gap-2 px-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 border border-white/5">
          <img src={logo} alt="Logo" className="h-4 w-4 brightness-200" />
        </div>
        <span className="hidden font-semibold text-white/90 text-[13px] tracking-tight sm:inline-block">CourseCommons</span>
      </Link>

      <div className="h-4 w-[1px] bg-white/10 mx-1" />

      {/* Nav Links */}
      <div className="flex items-center gap-0.5 ml-1">
        <Link to="/" className={`nav-link-capsule ${location.pathname === '/' ? 'nav-link-active' : ''}`}>
          Home
        </Link>
        <Link to="/courses" className={`nav-link-capsule ${location.pathname === '/courses' ? 'nav-link-active' : ''}`}>
          Courses
        </Link>
      </div>

      {/* Search */}
      <div className="nav-search-container">
        <input
          type="text"
          placeholder="Type to search"
          className="nav-search-input"
        />
      </div>

      {/* Auth Actions */}
      <div className="flex items-center gap-2">
        <Link to="/signin" className="cinematic-btn-outline">Log in</Link>
        <Link to="/signup" className="cinematic-btn-solid">Create Account</Link>
      </div>
    </nav>
  )
}
