import { useLocation } from 'react-router-dom'
import { useAtomValue } from 'jotai'
import TopNav from './TopNav'
import Sidebar from './Sidebar'
import SessionBootstrap from './SessionBootstrap'
import { authAtom } from '../state/authAtom'
import { instructorAuthAtom } from '../state/instructorAuthAtom'

// Pages where the TopNav should not render at all
const AUTH_PAGES = ['/signin', '/signup', '/signup/learner', '/signup/instructor']

export default function AppShell({ children }) {
  const location = useLocation()
  const auth = useAtomValue(authAtom)
  const instructorAuth = useAtomValue(instructorAuthAtom)

  const isAuthPage = AUTH_PAGES.includes(location.pathname)
  const isInstructorRoute = location.pathname.startsWith('/instructor')
  const isMarketingHome = location.pathname === '/' && !auth.isLoggedIn && !instructorAuth.isLoggedIn

  // Sidebar only renders for logged-in learners, and not on auth/instructor/marketing pages
  const isLearner = auth.isLoggedIn && !instructorAuth.isLoggedIn
  const showSidebar = isLearner && !isAuthPage && !isInstructorRoute && !isMarketingHome

  // TopNav is hidden on auth pages and the marketing home (Home.jsx has its own pill nav)
  const showTopNav = !isAuthPage && !isMarketingHome

  return (
    <div className="cinematic-app min-h-screen text-primary">
      <SessionBootstrap />

      {showTopNav && <TopNav />}

      {isMarketingHome ? (
        // Marketing landing — full bleed, no chrome
        <main className="w-full">{children}</main>
      ) : isAuthPage ? (
        // Auth pages — centered, no sidebar, no top nav
        <main className="flex min-h-screen w-full items-start justify-center">
          <div className="w-full">{children}</div>
        </main>
      ) : isInstructorRoute ? (
        // Instructor pages — full width, no sidebar, no learner chrome
        <main className="w-full">{children}</main>
      ) : (
        // Learner app shell — optional sidebar + main panel
        <div className="mx-auto flex min-h-[calc(100vh-68px)] w-full max-w-[1440px] gap-4 px-3 pb-4 pt-3 md:px-5 md:pb-5 md:pt-4 xl:px-8">
          {showSidebar && <Sidebar />}
          <main className="cinematic-panel w-full flex-1 overflow-hidden rounded-2xl md:rounded-3xl">
            {children}
          </main>
        </div>
      )}
    </div>
  )
}
