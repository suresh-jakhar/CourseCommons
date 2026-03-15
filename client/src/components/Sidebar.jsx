import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {
  const location = useLocation()

  const links = [
    { to: '/', label: 'Home' },
    { to: '/my-courses', label: 'My Courses' },
    { to: '/community', label: 'Community' },
    { to: '/courses', label: 'Explore' },
    { to: '/profile', label: 'Settings' },
  ]

  return (
    <aside className="cinematic-panel hidden w-64 shrink-0 rounded-2xl p-4 lg:block xl:w-72">
      <p className="mb-3 px-2 text-xs uppercase tracking-[0.2em] text-muted">Navigation</p>
      <ul className="space-y-1.5">
        {links.map((item) => {
          const active = item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to)

          return (
            <li key={item.to}>
              <Link
                to={item.to}
                className={`block rounded-xl px-3 py-2.5 text-sm transition ${
                  active
                    ? 'bg-glass text-primary'
                    : 'text-secondary hover:bg-glass hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
