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
      <div className="flex min-h-full items-center justify-center px-6 py-16">
        <p className="text-lg text-gray-300">Loading course details...</p>
      </div>
    )
  }

  if (error && !course) {
    return (
      <div className="flex min-h-full items-center justify-center px-6 py-16">
        <div className="max-w-md text-center">
          <h1 className="mb-3 text-3xl font-bold text-white">Course detail</h1>
          <p className="text-red-300">{error}</p>
          <Link to="/my-courses" className="mt-4 inline-flex text-sm font-medium text-blue-400 hover:text-blue-300">
            Back to My Courses
          </Link>
        </div>
      </div>
    )
  }

  return (
    <section className="px-6 py-8 lg:px-10">
      <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-400">Learner course detail</p>
          <h1 className="mt-2 text-4xl font-bold text-white">{course.title}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-300">{course.description}</p>
        </div>
        <Link to="/my-courses" className="inline-flex text-sm font-medium text-blue-400 hover:text-blue-300">
          Back to My Courses
        </Link>
      </div>

      {(error || notice) && (
        <div
          className={`mb-6 rounded-2xl px-5 py-4 text-sm ${
            error
              ? 'border border-red-500/30 bg-red-500/10 text-red-300'
              : 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
          }`}
        >
          {error || notice}
        </div>
      )}

      <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900/60 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-gray-400">Progress</p>
            <p className="mt-2 text-3xl font-semibold text-white">{progress.percentComplete}%</p>
            <p className="mt-2 text-sm text-gray-400">Last opened: {formatLastOpened(progress.lastOpenedAt)}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              disabled={isSaving}
              onClick={() => handleIncreaseBy(10)}
              className="rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-gray-200 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              +10%
            </button>
            <button
              type="button"
              disabled={isSaving}
              onClick={() => handleIncreaseBy(25)}
              className="rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-gray-200 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              +25%
            </button>
            <button
              type="button"
              disabled={isSaving}
              onClick={() => saveProgress(100)}
              className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Mark complete
            </button>
            <button
              type="button"
              disabled={isSaving}
              onClick={() => saveProgress(0)}
              className="rounded-lg border border-amber-500/50 px-4 py-2 text-sm font-medium text-amber-300 hover:bg-amber-500/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="mt-6 h-3 w-full overflow-hidden rounded-full bg-gray-800">
          <div
            className="h-full rounded-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress.percentComplete}%` }}
          />
        </div>
      </div>
    </section>
  )
}