import { CourseCard, SectionHeader } from '../components/SurfaceCards'

const channels = [
  { title: 'Frontend Systems', subtitle: '120 members', description: 'Component architecture, UI systems, and design QA discussions.' },
  { title: 'Backend Core', subtitle: '94 members', description: 'API design, auth, database strategy, and deployment threads.' },
  { title: 'Exam Prep Group', subtitle: '203 members', description: 'Shared resources, mock tests, and daily accountability sessions.' },
  { title: 'Creators Lounge', subtitle: '76 members', description: 'Educator focused channel for planning course content and feedback.' },
]

export default function Channels() {
  return (
    <section className="space-y-6 p-4 md:p-6">
      <div className="cinematic-panel rounded-2xl p-5 md:p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Channels</p>
        <h1 className="cinematic-title mt-2 text-3xl font-semibold text-primary md:text-4xl">Channels Page</h1>
        <p className="mt-3 max-w-3xl text-sm text-secondary md:text-base">Join focused channels to learn with peers and mentors in smaller groups.</p>
      </div>

      <SectionHeader title="Active Channels" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {channels.map((item) => (
          <CourseCard key={item.title} title={item.title} subtitle={item.subtitle} description={item.description} />
        ))}
      </div>
    </section>
  )
}
