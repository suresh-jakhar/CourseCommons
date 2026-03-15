import { UpdateCard, SectionHeader } from '../components/SurfaceCards'

const announcements = [
  {
    title: 'Live workshop this Friday',
    meta: 'UI architecture session with practical redesign walkthrough.',
    time: '2 hours ago',
  },
  {
    title: 'Course update policy revised',
    meta: 'Instructors can now pin weekly recap notes in each course module.',
    time: '5 hours ago',
  },
  {
    title: 'New onboarding challenge',
    meta: 'First-time learners can unlock a guided challenge in Explore.',
    time: '8 hours ago',
  },
]

export default function Announcements() {
  return (
    <section className="space-y-6 p-4 md:p-6">
      <div className="cinematic-panel rounded-2xl p-5 md:p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Announcements</p>
        <h1 className="cinematic-title mt-2 text-3xl font-semibold text-primary md:text-4xl">Announcements Page</h1>
        <p className="mt-3 max-w-3xl text-sm text-secondary md:text-base">Important updates from instructors, platform team, and course communities.</p>
      </div>

      <SectionHeader title="Latest Announcements" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {announcements.map((item) => (
          <UpdateCard key={item.title} title={item.title} meta={item.meta} time={item.time} />
        ))}
      </div>
    </section>
  )
}
