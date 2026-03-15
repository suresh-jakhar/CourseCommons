import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { enrollInCourse, getCoursePreview, getMyCourses, purchaseCourse } from '../services/course'
import { enrolledCoursesAtom } from '../state/enrolledCoursesAtom'
import { CourseCard, SectionHeader } from '../components/SurfaceCards'

function getActionErrorMessage(err, fallbackMessage) {
  const status = err.response?.status
  const apiMessage = err.response?.data?.message

  if (status === 401 || status === 403) {
    return 'Your session is invalid or expired. Please sign in again.'
  }

  return apiMessage || fallbackMessage
}

export default function Courses() {
  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [courseActions, setCourseActions] = useState({})
  const [enrolledCourses, setEnrolledCourses] = useAtom(enrolledCoursesAtom)

  function syncEnrolledCourse(courseId) {
    const matchedCourse = courses.find((course) => course._id === courseId)

    if (!matchedCourse) {
      return
    }

    setEnrolledCourses((prev) => {
      if (prev.some((course) => course._id === courseId)) {
        return prev
      }

      return [...prev, matchedCourse]
    })
  }

  useEffect(() => {
    let isMounted = true

    async function loadCourses() {
      try {
        const previewCourses = await getCoursePreview()
        const enrolledCoursesFromApi = await getMyCourses().catch((err) => {
          const status = err.response?.status

          if (status === 401 || status === 403) {
            throw err
          }

          return []
        })

        if (!isMounted) {
          return
        }

        setCourses(previewCourses)
        setEnrolledCourses(enrolledCoursesFromApi)
        const fallbackEnrolledCourses = enrolledCoursesFromApi.length > 0 ? enrolledCoursesFromApi : enrolledCourses
        const enrolledCourseIds = new Set(fallbackEnrolledCourses.map((course) => String(course._id)))
        const initialActions = {}

        previewCourses.forEach((course) => {
          if (enrolledCourseIds.has(String(course._id))) {
            initialActions[course._id] = {
              status: 'enrolled',
              type: 'success',
              message: 'Already enrolled in this course',
            }
          }
        })

        setCourseActions(initialActions)
        setError('')
      } catch (err) {
        if (!isMounted) {
          return
        }

        setError(err.response?.data?.message || 'Unable to load courses right now.')
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

  async function handleEnroll(courseId) {
    setCourseActions((prev) => ({
      ...prev,
      [courseId]: {
        status: 'enrolling',
        type: 'info',
        message: 'Enrolling in course...',
      },
    }))

    try {
      const data = await enrollInCourse(courseId)

      if (data.alreadyEnrolled) {
        syncEnrolledCourse(courseId)
        setCourseActions((prev) => ({
          ...prev,
          [courseId]: {
            status: 'already_enrolled',
            type: 'success',
            message: data.message || 'Already enrolled in this course',
          },
        }))

        return
      }

      if (data.paymentRequired) {
        setCourseActions((prev) => ({
          ...prev,
          [courseId]: {
            status: 'purchase_required',
            type: 'info',
            message: data.message || 'Payment required before enrollment is complete.',
          },
        }))

        return
      }

      setCourseActions((prev) => ({
        ...prev,
        [courseId]: {
          status: 'enrolled',
          type: 'success',
          message: data.message || 'Enrolled successfully.',
        },
      }))
      syncEnrolledCourse(courseId)
    } catch (err) {
      const apiStatus = err.response?.status

      setCourseActions((prev) => ({
        ...prev,
        [courseId]: {
          status: apiStatus === 409 ? 'already_enrolled' : 'idle',
          type: 'error',
          message: getActionErrorMessage(err, 'Unable to enroll right now.'),
        },
      }))
    }
  }

  async function handlePurchase(courseId) {
    setCourseActions((prev) => ({
      ...prev,
      [courseId]: {
        ...(prev[courseId] || {}),
        status: 'purchasing',
        type: 'info',
        message: 'Purchasing course...',
      },
    }))

    try {
      const data = await purchaseCourse(courseId)

      if (data.alreadyEnrolled) {
        syncEnrolledCourse(courseId)
        setCourseActions((prev) => ({
          ...prev,
          [courseId]: {
            status: 'already_enrolled',
            type: 'success',
            message: data.message || 'Already enrolled in this course',
          },
        }))

        return
      }

      setCourseActions((prev) => ({
        ...prev,
        [courseId]: {
          status: 'enrolled',
          type: 'success',
          message: data.message || 'Course purchased and enrolled successfully.',
        },
      }))
      syncEnrolledCourse(courseId)
    } catch (err) {
      const apiStatus = err.response?.status

      setCourseActions((prev) => ({
        ...prev,
        [courseId]: {
          status: apiStatus === 409 ? 'already_enrolled' : 'purchase_required',
          type: 'error',
          message: getActionErrorMessage(err, 'Unable to purchase this course right now.'),
        },
      }))
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-full items-center justify-center px-6 py-16 text-secondary">
        Loading courses...
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-full items-center justify-center px-6 py-16">
        <div className="cinematic-panel max-w-md rounded-2xl p-8 text-center">
          <h1 className="cinematic-title mb-3 text-3xl font-semibold text-primary">Course Page</h1>
          <p className="text-red-200">{error}</p>
        </div>
      </div>
    )
  }

  if (courses.length === 0) {
    return (
      <div className="flex min-h-full items-center justify-center px-6 py-16">
        <div className="cinematic-panel max-w-md rounded-2xl p-8 text-center">
          <h1 className="cinematic-title mb-3 text-3xl font-semibold text-primary">Course Page</h1>
          <p className="text-secondary">No courses are available yet.</p>
        </div>
      </div>
    )
  }

  return (
    <section className="space-y-6 p-4 md:p-6">
      <div className="cinematic-panel rounded-2xl p-5 md:p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Explore</p>
        <h1 className="cinematic-title mt-2 text-3xl font-semibold text-primary md:text-4xl">Course Page</h1>
        <p className="mt-3 max-w-3xl text-sm text-secondary md:text-base">Discover free and paid courses in a cleaner cinematic catalog.</p>
      </div>

      <SectionHeader title="Available Courses" />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <div key={course._id} className="cinematic-card">
            <CourseCard
              title={course.title}
              subtitle={course.isFree ? 'Free course' : `Price $${course.price}`}
              description={course.description}
              imageUrl={course.imageUrl}
            />
            <div className="mt-2">
              {(() => {
                const action = courseActions[course._id] || { status: 'idle' }

                if (action.status === 'enrolled' || action.status === 'already_enrolled') {
                  return (
                    <button
                      type="button"
                      disabled
                      className="w-full rounded-lg border border-border bg-surface px-4 py-2 text-sm font-semibold text-secondary"
                    >
                      Enrolled
                    </button>
                  )
                }

                if (action.status === 'purchase_required' || action.status === 'purchasing') {
                  return (
                    <button
                      type="button"
                      onClick={() => handlePurchase(course._id)}
                      disabled={action.status === 'purchasing'}
                      className="w-full rounded-lg border border-border bg-surface px-4 py-2 text-sm font-semibold text-primary hover:bg-surface disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {action.status === 'purchasing' ? 'Purchasing...' : 'Purchase'}
                    </button>
                  )
                }

                return (
                  <button
                    type="button"
                    onClick={() => handleEnroll(course._id)}
                    disabled={action.status === 'enrolling'}
                    className="w-full rounded-lg border border-border bg-surface px-4 py-2 text-sm font-semibold text-primary hover:bg-surface disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {action.status === 'enrolling' ? 'Enrolling...' : 'Enroll'}
                  </button>
                )
              })()}

              {courseActions[course._id]?.message && (
                <p
                  className={`mt-3 text-sm ${
                    courseActions[course._id].type === 'error'
                      ? 'text-red-200'
                      : courseActions[course._id].type === 'info'
                        ? 'text-secondary'
                        : 'text-secondary'
                  }`}
                >
                  {courseActions[course._id].message}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
