import { Link } from 'react-router-dom'
import { AnnouncementCard, CourseCard, SectionHeader, UpdateCard } from '../components/SurfaceCards'
import GuestNav from '../components/navigation/GuestNav'
import logo from '../assets/CC-logo-svg.svg'
import Sparkles from '../components/Sparkles'

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Full-bleed hero with starfield */}
      <section
        className="relative min-h-screen overflow-hidden"
        style={{ background: '#04070d' }}
      >
        {/* Sparkles overlay */}
        <Sparkles />
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
        <div className="landing-lamp-glow">
          <div className="landing-lamp-source" />
          <div className="landing-lamp-beam" />
          <div className="landing-lamp-core" />
          <div className="landing-lamp-haze" />
          <div className="landing-lamp-floor" />
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              'radial-gradient(circle at 50% 42%, transparent 0%, rgba(3,8,18,0.10) 62%, rgba(3,8,18,0.36) 100%)',
          }}
        />

        {/* Vertical light streaks */}
        <div className="landing-streak landing-streak-left" />
        <div className="landing-streak landing-streak-left-secondary" />
        <div className="landing-streak landing-streak-right" />
        <div className="landing-streak landing-streak-right-secondary" />

        {/* Guest Navigation */}
        <GuestNav />

        {/* Hero content restored */}
        <div className="landing-hero-copy relative z-10 mx-auto max-w-4xl px-6 pb-10 pt-28 text-center md:pt-32">
          <h1 className="landing-hero-title cinematic-title text-[2.9rem] font-black leading-[1.05] tracking-tight text-primary md:text-[4.1rem]">
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

        {/* Dashboard mockup */}
        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pb-16 md:px-10">
          <div className="relative">
            {/* Floating card — left */}
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

            {/* Floating card — bottom right */}
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

            {/* Main browser window */}
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

      {false && (
        <>
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
            <Link to="/signup" className="cinematic-btn">Explore Courses</Link>
          </div>
        </div>
      </section>
        </>
      )}
    </div>
  )
}
