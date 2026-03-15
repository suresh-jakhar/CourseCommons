import { Link } from 'react-router-dom'

export default function Signup() {
  return (
    <div className="flex min-h-full items-center justify-center px-6 py-16">
      <div className="w-full max-w-4xl space-y-10">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-secondary">Choose account type</p>
          <h1 className="mt-3 text-4xl font-bold text-primary">Sign up as a learner or instructor</h1>
          <p className="mt-2 text-sm text-secondary">
            Already have an account?{' '}
            <Link to="/signin" className="text-secondary hover:text-secondary">
              Sign in
            </Link>
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Link
            to="/signup/learner"
            className="rounded-3xl border border-border bg-surface p-8 transition hover:border-muted hover:bg-surface"
          >
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-secondary">Learner</p>
            <h2 className="mt-4 text-2xl font-semibold text-primary">Join to enroll and keep learning</h2>
            <p className="mt-3 text-sm leading-6 text-secondary">
              Create a learner account to browse courses, enroll, and track your learning dashboard.
            </p>
            <span className="mt-6 inline-flex text-sm font-semibold text-secondary">Continue as learner</span>
          </Link>
          <Link
            to="/signup/instructor"
            className="rounded-3xl border border-border bg-surface p-8 transition hover:border-muted hover:bg-surface"
          >
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-secondary">Instructor</p>
            <h2 className="mt-4 text-2xl font-semibold text-primary">Create and manage your own courses</h2>
            <p className="mt-3 text-sm leading-6 text-secondary">
              Set up an instructor account to publish, edit, and manage your course catalog.
            </p>
            <span className="mt-6 inline-flex text-sm font-semibold text-secondary">Continue as instructor</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
