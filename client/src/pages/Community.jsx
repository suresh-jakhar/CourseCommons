import { AnnouncementCard, SectionHeader } from '../components/SurfaceCards'

const items = [
  {
    author: 'Frontend Guild',
    role: 'Community Discussion',
    message: 'Design critique circle opens at 7 PM. Bring one component and one interaction challenge.',
    engagement: { likes: 24, comments: 11, shares: 4 },
  },
  {
    author: 'DSA Circle',
    role: 'Peer Group',
    message: 'Weekly problem-solving sprint starts tomorrow. Share your preferred language in thread.',
    engagement: { likes: 18, comments: 9, shares: 2 },
  },
]

export default function Community() {
  return (
    <section className="space-y-6 p-4 md:p-6">
      <div className="cinematic-panel rounded-2xl p-5 md:p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Community</p>
        <h1 className="cinematic-title mt-2 text-3xl font-semibold text-primary md:text-4xl">Community Page</h1>
        <p className="mt-3 max-w-3xl text-sm text-secondary md:text-base">A focused social layer for collaborative learning and course discussions.</p>
      </div>

      <SectionHeader title="Recent Updates from Teachers" />
      <div className="space-y-3">
        {items.map((item) => (
          <AnnouncementCard key={item.message} author={item.author} role={item.role} message={item.message} engagement={item.engagement} />
        ))}
      </div>
    </section>
  )
}
