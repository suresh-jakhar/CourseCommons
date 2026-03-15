import { Link } from 'react-router-dom'

export function SectionHeader({ title, actionLabel, actionTo }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="text-xl font-semibold text-primary md:text-2xl">{title}</h2>
      {actionLabel && actionTo && (
        <Link to={actionTo} className="text-sm font-medium text-secondary transition hover:text-primary">
          {actionLabel}
        </Link>
      )}
    </div>
  )
}

export function CourseCard({ title, subtitle, description, imageUrl, to, footer }) {
  return (
    <article className="cinematic-card overflow-hidden">
      <div className="h-32 w-full overflow-hidden rounded-xl border border-border bg-glass md:h-36">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full cinematic-spotlight" />
        )}
      </div>
      <div className="mt-4 space-y-2">
        <h3 className="line-clamp-2 text-base font-semibold text-primary md:text-lg">{title}</h3>
        {subtitle && <p className="text-sm text-secondary">{subtitle}</p>}
        {description && <p className="line-clamp-2 text-sm text-secondary">{description}</p>}
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        {footer || <span className="text-xs uppercase tracking-[0.18em] text-muted">Course</span>}
        {to && (
          <Link to={to} className="cinematic-btn text-xs">
            Open
          </Link>
        )}
      </div>
    </article>
  )
}

export function UpdateCard({ title, meta, time, compact = false }) {
  return (
    <article className={`cinematic-card ${compact ? 'p-4' : ''}`}>
      <p className="text-sm font-medium text-primary md:text-base">{title}</p>
      {meta && <p className="mt-1 text-sm text-secondary">{meta}</p>}
      {time && <p className="mt-2 text-xs uppercase tracking-[0.16em] text-muted">{time}</p>}
    </article>
  )
}

export function AnnouncementCard({ author, role, message, engagement }) {
  return (
    <article className="cinematic-card">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-primary">{author}</p>
          <p className="text-xs uppercase tracking-[0.16em] text-muted">{role}</p>
        </div>
        <button type="button" className="text-muted transition hover:text-primary">...</button>
      </div>
      <p className="mt-3 text-sm leading-6 text-secondary">{message}</p>
      <div className="mt-4 flex gap-4 text-xs text-muted">
        <span>Like {engagement?.likes ?? 0}</span>
        <span>Comments {engagement?.comments ?? 0}</span>
        <span>Shares {engagement?.shares ?? 0}</span>
      </div>
    </article>
  )
}
