import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { deleteInstructorCourse, getInstructorCourses } from '../services/instructor'

function getInstructorCoursesErrorMessage(err) {
  return err.response?.data?.message || 'Unable to load your courses right now.'
}

function formatPrice(course) {
  if (course.isFree) {
    return 'Free'
  }

  return `$${Number(course.price || 0).toFixed(2)}`
}

export default function InstructorCourses() {
  const location = useLocation()
  const [courses, setCourses] = useState([])
  const [error, setError] = useState('')
  const [notice, setNotice] = useState(location.state?.notice || '')
  const [isLoading, setIsLoading] = useState(true)
  const [deletingId, setDeletingId] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadCourses() {
      try {
        const instructorCourses = await getInstructorCourses()

        if (!isMounted) {
          return
        }

        setCourses(instructorCourses)
        setError('')
      } catch (err) {
        if (!isMounted) {
          return
        }

        setError(getInstructorCoursesErrorMessage(err))
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadCourses()

    return () => {
      isMounted = false
    }
  }, [])

  async function handleDelete(courseId) {
    const confirmed = window.confirm('Delete this course? This action cannot be undone.')

    if (!confirmed) {
      return
    }

    setDeletingId(courseId)
    setError('')
    setNotice('')

    try {
      const response = await deleteInstructorCourse(courseId)
      setCourses((prev) => prev.filter((course) => course._id !== courseId))
      setNotice(response.message || 'Course deleted successfully.')
    } catch (err) {
      setError(getInstructorCoursesErrorMessage(err))
    } finally {
      setDeletingId('')
    }
  }

  const freeCourseCount = courses.filter((course) => course.isFree).length
  const paidCourseCount = courses.length - freeCourseCount

  return (
    <section className="px-6 py-8 lg:px-10">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-secondary">Instructor workspace</p>
          <h1 className="mt-2 text-4xl font-bold text-primary">Manage your course catalog</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-secondary">
            Create, update, and retire the courses you publish on CourseCommons.
          </p>
        </div>

        <Link
          to="/dashboard/instructor/courses/new"
          className="inline-flex rounded-lg bg-btn text-primary px-4 py-2.5 text-sm font-semibold text-primary hover:bg-btn-hover"
        >
          Create course
        </Link>
      </div>

      {(notice || error) && (
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

      <div className="mb-8 grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-surface p-5">
          <p className="text-sm text-secondary">Total courses</p>
          <p className="mt-3 text-3xl font-semibold text-primary">{courses.length}</p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5">
          <p className="text-sm text-secondary">Free courses</p>
          <p className="mt-3 text-3xl font-semibold text-primary">{freeCourseCount}</p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5">
          <p className="text-sm text-secondary">Paid courses</p>
          <p className="mt-3 text-3xl font-semibold text-primary">{paidCourseCount}</p>
        </div>
      </div>

      {isLoading ? (
        <div className="rounded-2xl border border-border bg-surface p-8 text-sm text-secondary">
          Loading your instructor courses...
        </div>
      ) : courses.length === 0 ? (
        <div className="rounded-2xl border border-border bg-surface p-8">
          <h2 className="text-2xl font-semibold text-primary">No courses published yet</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-secondary">
            Start by creating your first course. You can make it free or paid and edit it later.
          </p>
          <Link
            to="/dashboard/instructor/courses/new"
            className="mt-6 inline-flex rounded-lg bg-btn text-primary px-4 py-2.5 text-sm font-semibold text-primary hover:bg-btn-hover"
          >
            Create your first course
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-2">
          {courses.map((course) => (
            <article key={course._id} className="overflow-hidden rounded-2xl border border-border bg-surface">
              {course.imageUrl ? (
                <img src={course.imageUrl} alt={course.title} className="h-52 w-full object-cover" />
              ) : (
                <div className="flex h-52 items-center justify-center bg-surface text-sm text-secondary">
                  No image available
                </div>
              )}

              <div className="space-y-5 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-primary">{course.title}</h2>
                    <p className="mt-2 text-sm text-secondary">{formatPrice(course)}</p>
                  </div>
                  <span className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-wide text-secondary">
                    {course.isFree ? 'Free' : 'Paid'}
                  </span>
                </div>

                <p className="text-sm leading-6 text-secondary">{course.description}</p>

                <div className="flex flex-wrap gap-3">
                  <Link
                    to={`/dashboard/instructor/courses/${course._id}/learners`}
                    className="rounded-lg border border-emerald-500/40 px-4 py-2 text-sm font-medium text-emerald-300 hover:bg-emerald-500/10"
                  >
                    View learners
                  </Link>
                  <Link
                    to={`/dashboard/instructor/courses/${course._id}/edit`}
                    className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-secondary hover:text-primary"
                  >
                    Edit course
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(course._id)}
                    disabled={deletingId === course._id}
                    className="rounded-lg border border-red-500/40 px-4 py-2 text-sm font-medium text-red-300 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {deletingId === course._id ? 'Deleting...' : 'Delete course'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}