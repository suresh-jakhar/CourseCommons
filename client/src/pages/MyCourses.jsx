import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAtom } from 'jotai'
import { getMyCourses } from '../services/course'
import { enrolledCoursesAtom } from '../state/enrolledCoursesAtom'
import { CourseCard, SectionHeader } from '../components/SurfaceCards'

function getErrorMessage(err) {
  const status = err.response?.status
  const apiMessage = err.response?.data?.message

  if (status === 401 || status === 403) {
    return 'Your session is invalid or expired. Please sign in again.'
  }

  return apiMessage || 'Unable to load your courses right now.'
}

export default function MyCourses() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [courses, setCourses] = useAtom(enrolledCoursesAtom)

  useEffect(() => {
    let isMounted = true

    async function loadMyCourses() {
      try {
        const enrolledCourses = await getMyCourses()

        if (!isMounted) {
          return
        }

        setCourses(enrolledCourses)
        setError('')
      } catch (err) {
        if (!isMounted) {
          return
        }

        setError(getErrorMessage(err))
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadMyCourses()

    return () => {
      isMounted = false
    }
  }, [setCourses])

  if (isLoading) {
    return <div className="flex min-h-full items-center justify-center text-secondary">Loading your courses...</div>
  }

  return (
    <section className="space-y-6 p-4 md:p-6">
      <div className="cinematic-panel rounded-2xl p-5 md:p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Learning</p>
        <h1 className="cinematic-title mt-2 text-3xl font-semibold text-primary md:text-4xl">My Courses Page</h1>
        <p className="mt-3 text-sm text-secondary md:text-base">All enrolled courses in one clean responsive view.</p>
      </div>

      {error && (
        <div className="rounded-2xl border border-border bg-glass px-4 py-3 text-sm text-secondary">
          {error}
        </div>
      )}

      {courses.length === 0 ? (
        <div className="cinematic-panel rounded-2xl p-6">
          <h2 className="cinematic-title text-2xl font-semibold text-primary">No courses enrolled yet</h2>
          <p className="mt-2 text-sm text-secondary">Start from the Explore page and enroll in your first course.</p>
          <Link to="/courses" className="cinematic-btn cinematic-btn-primary mt-5 inline-flex">
            Explore Courses
          </Link>
        </div>
      ) : (
        <>
          <SectionHeader title="Enrolled Courses" />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <div key={course._id} className="cinematic-card">
                <CourseCard
                  title={course.title}
                  subtitle="Enrolled"
                  description={course.description}
                  imageUrl={course.imageUrl}
                />
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.18em] text-secondary">Active</span>
                  <Link to={`/my-courses/${course._id}`} className="cinematic-btn text-xs">
                    Open Course
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  )
}
