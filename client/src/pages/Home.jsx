import { useEffect, useState } from 'react'
import { useAtom, useAtomValue } from 'jotai'
import { Link, Navigate } from 'react-router-dom'
import { authAtom } from '../state/authAtom'
import { instructorAuthAtom } from '../state/instructorAuthAtom'
import { profileAtom } from '../state/profileAtom'
import { enrolledCoursesAtom } from '../state/enrolledCoursesAtom'
import { getMyCourses } from '../services/course'
import { AnnouncementCard, CourseCard, SectionHeader, UpdateCard } from '../components/SurfaceCards'
import logo from '../assets/CC-logo-svg.svg'

function getDashboardErrorMessage(err) {
  const status = err.response?.status
  const apiMessage = err.response?.data?.message

  if (status === 401 || status === 403) {
    return 'Your session expired. Please sign in again.'
  }

  return apiMessage || 'Unable to load your learner dashboard right now.'
}

export default function Home() {
  const [auth] = useAtom(authAtom)
  const instructorAuth = useAtomValue(instructorAuthAtom)
  const [profile] = useAtom(profileAtom)
  const [enrolledCourses, setEnrolledCourses] = useAtom(enrolledCoursesAtom)
  const [isLoadingCourses, setIsLoadingCourses] = useState(false)
  const [error, setError] = useState('')

  // Instructors have no home here — send them to their workspace
  if (instructorAuth.isLoggedIn) {
    return <Navigate to="/instructor/courses" replace />
  }

  useEffect(() => {
    let isMounted = true

    async function loadDashboardCourses() {
      if (!auth.isLoggedIn) {
        if (isMounted) {
          setError('')
          setIsLoadingCourses(false)
        }
        return
      }

      try {
        if (isMounted) {
          setIsLoadingCourses(true)
        }

        const courses = await getMyCourses()

        if (!isMounted) {
          return
        }

        setEnrolledCourses(courses)
        setError('')
      } catch (err) {
        if (!isMounted) {
          return
        }

        setError(getDashboardErrorMessage(err))
      } finally {
        if (isMounted) {
          setIsLoadingCourses(false)
        }
      }
    }

    loadDashboardCourses()

    return () => {
      isMounted = false
    }
  }, [auth.isLoggedIn, setEnrolledCourses])

  if (!auth.isLoggedIn) {
    return (
      <div className="min-h-screen overflow-x-hidden">
        {/* Full-bleed hero with starfield */}
        <section
          className="relative min-h-screen overflow-hidden"
          style={{ background: 'radial-gradient(ellipse 74% 48% at 50% 0%, rgba(202,216,233,0.28) 0%, rgba(108,132,157,0.08) 38%, transparent 70%), #04070d' }}
        >
          {/* Dense starfield */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(1.5px 1.5px at 5%  8%,  rgba(255,255,255,0.70) 0%,transparent 100%),
                radial-gradient(1px   1px   at 12% 3%,  rgba(255,255,255,0.45) 0%,transparent 100%),
                radial-gradient(1px   1px   at 18% 15%, rgba(255,255,255,0.50) 0%,transparent 100%),
                radial-gradient(1.5px 1.5px at 24% 6%,  rgba(255,255,255,0.60) 0%,transparent 100%),
                radial-gradient(1px   1px   at 32% 20%, rgba(255,255,255,0.40) 0%,transparent 100%),
                radial-gradient(1px   1px   at 38% 9%,  rgba(255,255,255,0.55) 0%,transparent 100%),
                radial-gradient(1.5px 1.5px at 45% 18%, rgba(255,255,255,0.65) 0%,transparent 100%),
                radial-gradient(1px   1px   at 52% 5%,  rgba(255,255,255,0.45) 0%,transparent 100%),
                radial-gradient(1px   1px   at 59% 14%, rgba(255,255,255,0.50) 0%,transparent 100%),
                radial-gradient(1.5px 1.5px at 65% 7%,  rgba(255,255,255,0.60) 0%,transparent 100%),
                radial-gradient(1px   1px   at 72% 22%, rgba(255,255,255,0.40) 0%,transparent 100%),
                radial-gradient(1px   1px   at 79% 4%,  rgba(255,255,255,0.55) 0%,transparent 100%),
                radial-gradient(1.5px 1.5px at 85% 16%, rgba(255,255,255,0.70) 0%,transparent 100%),
                radial-gradient(1px   1px   at 91% 9%,  rgba(255,255,255,0.45) 0%,transparent 100%),
                radial-gradient(1px   1px   at 97% 20%, rgba(255,255,255,0.50) 0%,transparent 100%),
                radial-gradient(1px   1px   at 3%  35%, rgba(255,255,255,0.40) 0%,transparent 100%),
                radial-gradient(1px   1px   at 9%  42%, rgba(255,255,255,0.35) 0%,transparent 100%),
                radial-gradient(1px   1px   at 17% 38%, rgba(255,255,255,0.45) 0%,transparent 100%),
                radial-gradient(1px   1px   at 27% 50%, rgba(255,255,255,0.30) 0%,transparent 100%),
                radial-gradient(1px   1px   at 36% 44%, rgba(255,255,255,0.40) 0%,transparent 100%),
                radial-gradient(1px   1px   at 48% 55%, rgba(255,255,255,0.35) 0%,transparent 100%),
                radial-gradient(1px   1px   at 57% 40%, rgba(255,255,255,0.45) 0%,transparent 100%),
                radial-gradient(1px   1px   at 68% 48%, rgba(255,255,255,0.30) 0%,transparent 100%),
                radial-gradient(1px   1px   at 76% 36%, rgba(255,255,255,0.50) 0%,transparent 100%),
                radial-gradient(1px   1px   at 84% 52%, rgba(255,255,255,0.35) 0%,transparent 100%),
                radial-gradient(1px   1px   at 93% 43%, rgba(255,255,255,0.40) 0%,transparent 100%),
                radial-gradient(1.5px 1.5px at 7%  65%, rgba(255,255,255,0.55) 0%,transparent 100%),
                radial-gradient(1px   1px   at 14% 72%, rgba(255,255,255,0.35) 0%,transparent 100%),
                radial-gradient(1px   1px   at 23% 68%, rgba(255,255,255,0.40) 0%,transparent 100%),
                radial-gradient(1px   1px   at 33% 80%, rgba(255,255,255,0.30) 0%,transparent 100%),
                radial-gradient(1px   1px   at 43% 74%, rgba(255,255,255,0.45) 0%,transparent 100%),
                radial-gradient(1px   1px   at 54% 83%, rgba(255,255,255,0.30) 0%,transparent 100%),
                radial-gradient(1px   1px   at 63% 70%, rgba(255,255,255,0.40) 0%,transparent 100%),
                radial-gradient(1.5px 1.5px at 73% 78%, rgba(255,255,255,0.50) 0%,transparent 100%),
                radial-gradient(1px   1px   at 82% 66%, rgba(255,255,255,0.35) 0%,transparent 100%),
                radial-gradient(1px   1px   at 90% 80%, rgba(255,255,255,0.45) 0%,transparent 100%),
                radial-gradient(1px   1px   at 96% 60%, rgba(255,255,255,0.30) 0%,transparent 100%)`,
            }}
          />
          {/* Overhead light cone */}
          <div
            className="pointer-events-none absolute inset-0 z-[2]"
            style={{
              background:
                'radial-gradient(ellipse 40% 22% at 50% 0%, rgba(242,248,255,0.60) 0%, rgba(198,215,232,0.34) 34%, rgba(123,147,173,0.14) 56%, transparent 76%)',
              mixBlendMode: 'screen',
            }}
          />
          <div
            className="pointer-events-none absolute left-1/2 top-[36px] z-[2] h-[760px] w-[1050px] -translate-x-1/2"
            style={{
              background:
                'radial-gradient(ellipse 52% 74% at 50% 0%, rgba(228,238,248,0.42) 0%, rgba(170,190,211,0.22) 28%, rgba(106,130,156,0.11) 50%, rgba(69,89,112,0.05) 62%, transparent 78%)',
              filter: 'blur(1px)',
              mixBlendMode: 'screen',
            }}
          />
          <div
            className="pointer-events-none absolute left-1/2 bottom-[-240px] z-[2] h-[580px] w-[1240px] -translate-x-1/2"
            style={{
              background:
                'radial-gradient(ellipse 46% 60% at 50% 35%, rgba(228,238,249,0.34) 0%, rgba(165,185,206,0.16) 34%, rgba(95,117,141,0.05) 56%, transparent 74%)',
              mixBlendMode: 'screen',
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{
              background:
                'radial-gradient(circle at 50% 42%, transparent 0%, rgba(3,8,18,0.10) 62%, rgba(3,8,18,0.36) 100%)',
            }}
          />

          {/* Vertical light streaks — prominent on edges */}
          <div className="pointer-events-none absolute left-[11%] top-0 h-full w-px bg-gradient-to-b from-transparent via-white/25 to-transparent" />
          <div className="pointer-events-none absolute left-[50%] top-0 h-full w-px bg-gradient-to-b from-transparent via-white/18 to-transparent" />
          <div className="pointer-events-none absolute left-[88%] top-0 h-full w-px bg-gradient-to-b from-transparent via-white/22 to-transparent" />

          {/* Redesigned Floating pill nav — compact, centered */}
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
              <Link to="/" className="nav-link-capsule nav-link-active">
                Home
              </Link>
              <Link to="/courses" className="nav-link-capsule">
                Courses
              </Link>
            </div>

            {/* Search feature - Restored and styled per reference */}
            <div className="nav-search-container">
              <input 
                type="text" 
                placeholder="Type to search" 
                className="nav-search-input"
              />
            </div>

            {/* Auth Actions - Right side */}
            <div className="flex items-center gap-2">
              <Link to="/signin" className="cinematic-btn-outline">Log in</Link>
              <Link to="/signup" className="cinematic-btn-solid">Create Account</Link>
            </div>
          </nav>

          {/* Hero content */}
          <div className="relative z-10 mx-auto max-w-4xl px-6 pb-10 pt-28 text-center md:pt-32">
            <h1 className="cinematic-title text-[3.2rem] font-black leading-[1.05] tracking-tight text-primary md:text-[5.5rem]">
              Where Knowledge
              <br />
              Becomes Shared.
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-muted md:text-lg md:leading-8">
              Teachers create courses, students learn together, and communities grow around knowledge.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link to="/signin" className="rounded-xl bg-glass px-5 py-2.5 text-sm font-medium text-primary backdrop-blur-sm border border-border hover:bg-glass0 transition-colors">Start Learning</Link>
              <Link to="/signup/instructor" className="rounded-xl border border-border bg-transparent px-5 py-2.5 text-sm font-medium text-secondary hover:bg-glass transition-colors">Create a Course</Link>
            </div>
          </div>

          {/* Dashboard mockup — light themed with floating cards */}
          <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pb-16 md:px-10">
            <div className="relative">
              {/* Floating card — left (Course page) */}
              <div className="absolute -bottom-4 -left-4 z-20 hidden w-36 rounded-xl border border-black/8 bg-surface p-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.18)] md:block">
                <p className="text-[9px] font-semibold text-muted">Course page</p>
                <p className="text-[8px] text-secondary">12 courses-page</p>
                <div className="mt-2 space-y-1">
                  <div className="h-1.5 rounded-full bg-btn">
                    <div className="h-full w-3/5 rounded-full bg-muted" />
                  </div>
                  <div className="h-1.5 rounded-full bg-btn">
                    <div className="h-full w-2/5 rounded-full bg-btn-hover" />
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[8px] text-secondary">❤ 10</span>
                  <span className="text-[8px] text-secondary">Edit</span>
                </div>
              </div>

              {/* Floating card — bottom right (user / create course) */}
              <div className="absolute -bottom-6 -right-2 z-20 hidden w-40 rounded-xl border border-black/8 bg-surface p-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.18)] md:block">
                <div className="mb-1.5 flex items-center gap-1.5">
                  <div className="h-5 w-5 rounded-full bg-btn-hover" />
                  <div>
                    <p className="text-[9px] font-medium text-primary">Riaex Slaon</p>
                    <p className="text-[8px] text-secondary">Instructor</p>
                  </div>
                </div>
                <button className="w-full rounded-lg bg-surface px-2 py-1 text-[9px] font-medium text-primary">+ Create course</button>
              </div>

              {/* Main browser window — light theme */}
              <div className="overflow-hidden rounded-2xl border border-black/12 bg-surface shadow-[0_40px_100px_rgba(0,0,0,0.55)]">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 border-b border-border bg-base px-4 py-2">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-btn-hover" />
                    <div className="h-2.5 w-2.5 rounded-full bg-btn-hover" />
                    <div className="h-2.5 w-2.5 rounded-full bg-btn-hover" />
                  </div>
                  <div className="mx-auto flex items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-0.5">
                    <div className="h-2 w-2 rounded-full bg-btn-hover" />
                    <span className="text-[10px] text-secondary">coursecommons.app/dashboard</span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="h-4 w-4 rounded bg-btn" />
                    <div className="h-4 w-4 rounded bg-btn" />
                  </div>
                </div>
                {/* App body */}
                <div className="flex h-[260px] md:h-[320px]">
                  {/* Sidebar */}
                  <div className="hidden w-40 shrink-0 border-r border-border bg-base px-3 py-3 md:block">
                    <div className="mb-3 flex items-center gap-1.5 px-1">
                      <div className="h-4 w-4 rounded bg-btn-hover" />
                      <span className="text-[10px] font-semibold text-muted">CourseCommons</span>
                    </div>
                    {[['Dashboard', true], ['Features', false], ['Community', false], ['Creators', false]].map(([label, active]) => (
                      <div key={label} className={`mb-0.5 flex items-center gap-1.5 rounded-lg px-2 py-1.5 ${active ? 'bg-btn text-primary' : 'text-secondary'}`}>
                        <div className="h-3 w-3 rounded-sm bg-current opacity-50" />
                        <span className="text-[10px]">{label}</span>
                      </div>
                    ))}
                  </div>
                  {/* Main content */}
                  <div className="flex-1 overflow-hidden bg-surface p-3">
                    <div className="mb-2 flex items-center justify-between border-b border-border pb-2">
                      <span className="text-xs font-semibold text-primary">Dashboard</span>
                      <div className="flex items-center gap-1">
                        <div className="h-4 w-4 rounded bg-card" />
                        <div className="h-4 w-4 rounded bg-card" />
                        <div className="h-5 w-5 rounded-full bg-btn" />
                      </div>
                    </div>
                    <div className="mb-2 flex items-center justify-between rounded-lg border border-border bg-base px-2.5 py-1.5">
                      <div>
                        <p className="text-[10px] font-medium text-muted">Course Page</p>
                        <p className="text-[8px] text-secondary">8 course-lab sessions · 1 course</p>
                      </div>
                      <span className="rounded bg-btn px-1.5 py-0.5 text-[8px] text-muted">+ Start assign</span>
                    </div>
                    <div className="mb-2 flex gap-3 border-b border-border pb-1.5">
                      {['Coursepage', 'Discussion', 'Financials'].map((tab, i) => (
                        <span key={tab} className={`text-[10px] pb-1 ${i === 0 ? 'border-b border-muted text-primary font-medium' : 'text-secondary'}`}>{tab}</span>
                      ))}
                    </div>
                    <div className="space-y-1.5">
                      {[
                        { name: 'Jisacah', time: '3 minutes ago', msg: 'I watched the second video and did a course announcement', likes: 44, replies: 7 },
                        { name: 'Jiterticsh', time: '1 hours ago', msg: 'Hey exam!', likes: 12, replies: 3 },
                      ].map((item) => (
                        <div key={item.name} className="rounded-lg border border-border bg-base p-2">
                          <div className="mb-0.5 flex items-center gap-1.5">
                            <div className="h-3.5 w-3.5 rounded-full bg-btn-hover" />
                            <span className="text-[9px] font-medium text-muted">{item.name}</span>
                            <span className="text-[8px] text-secondary">{item.time}</span>
                          </div>
                          <p className="text-[9px] text-muted">{item.msg}</p>
                          <div className="mt-1 flex gap-2">
                            <span className="text-[8px] text-secondary">👍 {item.likes} · Reply</span>
                            <span className="text-[8px] text-secondary">Removed</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Right panel */}
                  <div className="hidden w-44 shrink-0 space-y-2 border-l border-border bg-base p-2.5 lg:block">
                    <div className="rounded-lg border border-border bg-surface p-2">
                      <div className="mb-1.5 flex items-center justify-between">
                        <p className="text-[9px] font-semibold text-muted">Discussion thread</p>
                        <span className="rounded bg-card px-1 py-0.5 text-[8px] text-secondary">Discussion</span>
                      </div>
                      {['Jason Wringe', 'Gusnov Wringe', 'Jason B.', 'Jason Bringas'].map((n) => (
                        <div key={n} className="mb-0.5 flex items-center gap-1">
                          <div className="h-2.5 w-2.5 rounded-full bg-btn-hover" />
                          <span className="text-[8px] text-muted">{n}</span>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-lg border border-border bg-surface p-2">
                      <p className="mb-1 text-[9px] font-semibold text-muted">Teacher Channels</p>
                      <p className="text-[8px] leading-3.5 text-secondary">Course whiteboards across student channels. Sustainable and specialises teachers.</p>
                      <p className="mt-1 text-[8px] text-secondary">+ Add a comment</p>
                    </div>
                    <div className="rounded-lg border border-border bg-surface p-2">
                      <div className="mb-1 flex items-center justify-between">
                        <p className="text-[9px] font-semibold text-muted">Announcements</p>
                        <span className="text-[8px] text-secondary">×</span>
                      </div>
                      <div className="mb-1 flex items-center gap-1">
                        <div className="h-3 w-3 rounded-full bg-btn-hover" />
                        <span className="text-[8px] text-muted">Andy Reach</span>
                      </div>
                      <p className="text-[8px] leading-3.5 text-secondary">Teacher listed course add to the student, teachers to that person.</p>
                      <button className="mt-1 w-full rounded bg-card py-0.5 text-[8px] text-primary">Submit note</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="border-t border-border px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-7xl">
            <p className="inline-flex rounded-full border border-border bg-glass px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-secondary">Features</p>
            <h2 className="cinematic-title mt-4 text-3xl font-semibold text-primary md:text-4xl">Everything you need to learn and teach.</h2>
            <p className="mt-3 max-w-xl text-sm text-muted">Minimal blocks, soft spotlight depth, and elegant spacing — built for focus.</p>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <UpdateCard title="Course Creation" meta="Create structured bite-sized lessons." />
              <UpdateCard title="Student Enrollment" meta="Access and activity tracking." />
              <UpdateCard title="Community Discussions" meta="Threads and announcements." />
              <UpdateCard title="Teacher Channels" meta="Focused cohort spaces." />
            </div>
          </div>
        </section>

        {/* Creator section */}
        <section className="border-t border-border px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-7xl">
            <p className="inline-flex rounded-full border border-border bg-glass px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-secondary">Creator</p>
            <h3 className="cinematic-title mt-4 max-w-3xl text-4xl font-semibold text-secondary md:text-5xl">Teach what you know. Build what matters.</h3>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">Teachers create courses and communities, and build a long-term growth loop around their knowledge.</p>
            <Link to="/signup/instructor" className="cinematic-btn mt-6 inline-flex">Start Creating</Link>
          </div>
        </section>

        {/* CTA section */}
        <section className="border-t border-border px-6 py-20 text-center md:px-10 md:py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="cinematic-title text-4xl font-semibold text-secondary md:text-5xl">Join the Future of Collaborative Learning.</h2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to="/signin" className="cinematic-btn cinematic-btn-primary">Start Learning</Link>
              <Link to="/courses" className="cinematic-btn">Explore Courses</Link>
            </div>
          </div>
        </section>
      </div>
    )
  }

  if (!profile || isLoadingCourses) {
    return (
      <div className="flex min-h-full items-center justify-center px-6 py-16">
        <p className="text-lg text-secondary">Loading your learner dashboard...</p>
      </div>
    )
  }

  const latestCourses = enrolledCourses.slice(0, 3)
  const trendingCourses = enrolledCourses.slice(0, 6)
  const recentTeacherUpdates = [
    {
      author: 'Instructor Notes',
      role: 'Announcement',
      message: 'New lecture notes and revision tasks are now available for your active courses.',
      engagement: { likes: 19, comments: 12, shares: 3 },
    },
    {
      author: 'Data Structures Team',
      role: 'Discussion',
      message: 'Weekly peer discussion thread is live. Drop your doubts before the live walkthrough.',
      engagement: { likes: 14, comments: 9, shares: 2 },
    },
  ]
  const courseUpdateCards = latestCourses.map((course, index) => ({
    title: `${course.title}`,
    meta: 'New lecture added and practice content updated.',
    time: `${index + 1} hour ago`,
  }))

  return (
    <section className="space-y-6 p-4 md:p-6">
      <div className="cinematic-panel rounded-2xl p-5 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Home</p>
            <h1 className="cinematic-title mt-2 text-3xl font-semibold text-primary md:text-4xl">Welcome back, {profile.firstName}</h1>
            <p className="mt-2 text-sm text-secondary">Signed in as {profile.email}</p>
          </div>
          <div className="flex gap-3">
            <Link to="/courses" className="cinematic-btn cinematic-btn-primary">Explore Courses</Link>
            <Link to="/my-courses" className="cinematic-btn">My Courses</Link>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-border bg-glass px-5 py-4 text-sm text-secondary">
          {error}
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeader title="Resume Learning" />
          {latestCourses[0] ? (
            <CourseCard
              title={latestCourses[0].title}
              subtitle={`${profile.firstName} ${profile.lastName}`}
              description={latestCourses[0].description}
              imageUrl={latestCourses[0].imageUrl}
              to={`/my-courses/${latestCourses[0]._id}`}
              footer={<span className="text-xs uppercase tracking-[0.2em] text-muted">Continue Learning</span>}
            />
          ) : (
            <div className="cinematic-card text-sm text-secondary">No active course yet. Start by exploring the course catalog.</div>
          )}
        </div>

        <div className="lg:col-span-8">
          <SectionHeader title="Updates in Your Courses" actionLabel="See all" actionTo="/my-courses" />
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {courseUpdateCards.length > 0
              ? courseUpdateCards.map((update) => (
                  <UpdateCard key={update.title} title={update.title} meta={update.meta} time={update.time} compact />
                ))
              : [1, 2, 3, 4].map((item) => (
                  <UpdateCard key={item} title="No new update" meta="Enroll in courses to receive updates." time="Just now" compact />
                ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-12">
        <div className="space-y-4 xl:col-span-8">
          <SectionHeader title="Recent Updates from Teachers" />
          <div className="space-y-3">
            {recentTeacherUpdates.map((item) => (
              <AnnouncementCard
                key={item.message}
                author={item.author}
                role={item.role}
                message={item.message}
                engagement={item.engagement}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4 xl:col-span-4">
          <SectionHeader title="Trending Courses" actionLabel="See all" actionTo="/courses" />
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            {trendingCourses.length > 0
              ? trendingCourses.slice(0, 4).map((course) => (
                  <CourseCard
                    key={course._id}
                    title={course.title}
                    subtitle="Trending"
                    description={course.description}
                    imageUrl={course.imageUrl}
                    to={`/my-courses/${course._id}`}
                  />
                ))
              : <CourseCard title="No trending course" subtitle="Start learning" description="Your trending recommendations will appear here." to="/courses" />}
          </div>
        </div>
      </div>

      {enrolledCourses.length === 0 && (
        <div className="cinematic-panel rounded-2xl p-6 md:p-8">
          <h3 className="cinematic-title text-2xl font-semibold text-primary">Start your first course</h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-secondary">
            Your dashboard is ready. Enroll in any course to unlock personalized updates, progress, and trending recommendations.
          </p>
          <Link to="/courses" className="cinematic-btn cinematic-btn-primary mt-6 inline-flex">
            Start Learning
          </Link>
        </div>
      )}
    </section>
  )
}
