import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getLearnerCourseDetail, updateLearnerCourseProgress } from '../services/course'

function getCourseDetailErrorMessage(err) {
  const status = err.response?.status
  const apiMessage = err.response?.data?.message

  if (status === 403) {
    return 'You are not enrolled in this course.'
  }

  return apiMessage || 'Unable to load this course right now.'
}

function formatLastOpened(value) {
  if (!value) {
    return 'Not opened yet'
  }

  return new Date(value).toLocaleString()
}

export default function LearnerCourseDetail() {
  const { courseId } = useParams()
  const [course, setCourse] = useState(null)
  const [progress, setProgress] = useState({ percentComplete: 0, lastOpenedAt: null })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadCourseDetail() {
      try {
        const data = await getLearnerCourseDetail(courseId)

        if (!isMounted) {
          return
        }

        setCourse(data.course)
        setProgress(data.progress ?? { percentComplete: 0, lastOpenedAt: null })
        setError('')
      } catch (err) {
        if (!isMounted) {
          return
        }

        setError(getCourseDetailErrorMessage(err))
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadCourseDetail()

    return () => {
      isMounted = false
    }
  }, [courseId])

  async function saveProgress(nextPercent) {
    setIsSaving(true)
    setError('')
    setNotice('')

    try {
      const boundedPercent = Math.max(0, Math.min(100, nextPercent))
      const data = await updateLearnerCourseProgress(courseId, boundedPercent)
      setProgress(data.progress)
      setNotice(data.message || 'Progress updated.')
    } catch (err) {
      setError(getCourseDetailErrorMessage(err))
    } finally {
      setIsSaving(false)
    }
  }

  function handleIncreaseBy(step) {
    saveProgress(progress.percentComplete + step)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-full items-center justify-center px-6 py-16 text-secondary">
        Loading course details...
      </div>
    )
  }

  if (error && !course) {
    return (
      <div className="flex min-h-full items-center justify-center px-6 py-16">
        <div className="cinematic-panel max-w-md rounded-2xl p-8 text-center">
          <h1 className="cinematic-title mb-3 text-3xl font-semibold text-primary">Course Detail Page</h1>
          <p className="text-red-200">{error}</p>
          <Link to="/dashboard/learner/my-courses" className="mt-4 inline-flex text-sm font-medium text-secondary hover:text-primary">
            Back to My Courses
          </Link>
        </div>
      </div>
    )
  }

  return (
    <section className="space-y-6 p-4 md:p-6">
      <div className="cinematic-panel rounded-2xl p-5 md:p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Course Detail</p>
            <h1 className="cinematic-title mt-2 text-3xl font-semibold text-primary md:text-4xl">{course.title}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-secondary">{course.description}</p>
          </div>
          <Link to="/dashboard/learner/my-courses" className="inline-flex text-sm font-medium text-secondary hover:text-primary">
            Back to My Courses
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="cinematic-card">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Progress</p>
          <p className="mt-2 text-4xl font-semibold text-primary">{progress.percentComplete}%</p>
        </div>
        <div className="cinematic-card md:col-span-2">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Last Opened</p>
          <p className="mt-2 text-lg text-secondary">{formatLastOpened(progress.lastOpenedAt)}</p>
        </div>
      </div>

      {(error || notice) && (
        <div
          className={`rounded-2xl px-5 py-4 text-sm ${
            error
              ? 'border border-red-500/30 bg-red-500/10 text-red-200'
              : 'border border-border bg-surface text-secondary'
          }`}
        >
          {error || notice}
        </div>
      )}

      <div className="cinematic-panel rounded-2xl p-5 md:p-6">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled={isSaving}
            onClick={() => handleIncreaseBy(10)}
            className="cinematic-btn disabled:cursor-not-allowed disabled:opacity-60"
          >
            +10%
          </button>
          <button
            type="button"
            disabled={isSaving}
            onClick={() => handleIncreaseBy(25)}
            className="cinematic-btn disabled:cursor-not-allowed disabled:opacity-60"
          >
            +25%
          </button>
          <button
            type="button"
            disabled={isSaving}
            onClick={() => saveProgress(100)}
            className="cinematic-btn cinematic-btn-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            Mark Complete
          </button>
          <button
            type="button"
            disabled={isSaving}
            onClick={() => saveProgress(0)}
            className="cinematic-btn disabled:cursor-not-allowed disabled:opacity-60"
          >
            Reset
          </button>
        </div>

        <div className="mt-6 h-3 w-full overflow-hidden rounded-full bg-glass">
          <div
            className="h-full rounded-full bg-surface transition-all duration-300"
            style={{ width: `${progress.percentComplete}%` }}
          />
        </div>
      </div>
    </section>
  )
}