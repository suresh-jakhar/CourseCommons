import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { Link } from 'react-router-dom'
import { profileAtom } from '../state/profileAtom'
import { enrolledCoursesAtom } from '../state/enrolledCoursesAtom'
import { getMyCourses } from '../services/course'
import { AnnouncementCard, CourseCard, SectionHeader, UpdateCard } from '../components/SurfaceCards'

function getDashboardErrorMessage(err) {
  const status = err.response?.status
  const apiMessage = err.response?.data?.message

  if (status === 401 || status === 403) {
    return 'Your session expired. Please sign in again.'
  }

  return apiMessage || 'Unable to load your learner dashboard right now.'
}

export default function LearnerDashboard() {
  const [profile] = useAtom(profileAtom)
  const [enrolledCourses, setEnrolledCourses] = useAtom(enrolledCoursesAtom)
  const [isLoadingCourses, setIsLoadingCourses] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadDashboardCourses() {
      try {
        if (isMounted) {
          setIsLoadingCourses(true)
        }

        const courses = await getMyCourses()

        if (!isMounted) {
          return
        }

        setEnrolledCourses(courses)
        setError('')
      } catch (err) {
        if (!isMounted) {
          return
        }

        setError(getDashboardErrorMessage(err))
      } finally {
        if (isMounted) {
          setIsLoadingCourses(false)
        }
      }
    }

    loadDashboardCourses()

    return () => {
      isMounted = false
    }
  }, [setEnrolledCourses])

  if (!profile || isLoadingCourses) {
    return (
      <div className="flex min-h-full items-center justify-center px-6 py-16">
        <p className="text-lg text-secondary">Loading your learner dashboard...</p>
      </div>
    )
  }

  const latestCourses = enrolledCourses.slice(0, 3)
  const trendingCourses = enrolledCourses.slice(0, 6)
  const recentTeacherUpdates = [
    {
      author: 'Instructor Notes',
      role: 'Announcement',
      message: 'New lecture notes and revision tasks are now available for your active courses.',
      engagement: { likes: 19, comments: 12, shares: 3 },
    },
    {
      author: 'Data Structures Team',
      role: 'Discussion',
      message: 'Weekly peer discussion thread is live. Drop your doubts before the live walkthrough.',
      engagement: { likes: 14, comments: 9, shares: 2 },
    },
  ]
  const courseUpdateCards = latestCourses.map((course, index) => ({
    title: `${course.title}`,
    meta: 'New lecture added and practice content updated.',
    time: `${index + 1} hour ago`,
  }))

  return (
    <section className="space-y-6 p-4 md:p-6">
      <div className="cinematic-panel rounded-2xl p-5 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Home</p>
            <h1 className="cinematic-title mt-2 text-3xl font-semibold text-primary md:text-4xl">Welcome back, {profile.firstName}</h1>
            <p className="mt-2 text-sm text-secondary">Signed in as {profile.email}</p>
          </div>
          <div className="flex gap-3">
            <Link to="/dashboard/learner/courses" className="cinematic-btn cinematic-btn-primary">Explore Courses</Link>
            <Link to="/dashboard/learner/my-courses" className="cinematic-btn">My Courses</Link>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-border bg-glass px-5 py-4 text-sm text-secondary">
          {error}
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeader title="Resume Learning" />
          {latestCourses[0] ? (
            <CourseCard
              title={latestCourses[0].title}
              subtitle={`${profile.firstName} ${profile.lastName}`}
              description={latestCourses[0].description}
              imageUrl={latestCourses[0].imageUrl}
              to={`/dashboard/learner/my-courses/${latestCourses[0]._id}`}
              footer={<span className="text-xs uppercase tracking-[0.2em] text-muted">Continue Learning</span>}
            />
          ) : (
            <div className="cinematic-card text-sm text-secondary">No active course yet. Start by exploring the course catalog.</div>
          )}
        </div>

        <div className="lg:col-span-8">
          <SectionHeader title="Updates in Your Courses" actionLabel="See all" actionTo="/dashboard/learner/my-courses" />
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {courseUpdateCards.length > 0
              ? courseUpdateCards.map((update) => (
                  <UpdateCard key={update.title} title={update.title} meta={update.meta} time={update.time} compact />
                ))
              : [1, 2, 3, 4].map((item) => (
                  <UpdateCard key={item} title="No new update" meta="Enroll in courses to receive updates." time="Just now" compact />
                ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-12">
        <div className="space-y-4 xl:col-span-8">
          <SectionHeader title="Recent Updates from Teachers" />
          <div className="space-y-3">
            {recentTeacherUpdates.map((item) => (
              <AnnouncementCard
                key={item.message}
                author={item.author}
                role={item.role}
                message={item.message}
                engagement={item.engagement}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4 xl:col-span-4">
          <SectionHeader title="Trending Courses" actionLabel="See all" actionTo="/dashboard/learner/courses" />
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            {trendingCourses.length > 0
              ? trendingCourses.slice(0, 4).map((course) => (
                  <CourseCard
                    key={course._id}
                    title={course.title}
                    subtitle="Trending"
                    description={course.description}
                    imageUrl={course.imageUrl}
                    to={`/dashboard/learner/my-courses/${course._id}`}
                  />
                ))
              : <CourseCard title="No trending course" subtitle="Start learning" description="Your trending recommendations will appear here." to="/dashboard/learner/courses" />}
          </div>
        </div>
      </div>

      {enrolledCourses.length === 0 && (
        <div className="cinematic-panel rounded-2xl p-6 md:p-8">
          <h3 className="cinematic-title text-2xl font-semibold text-primary">Start your first course</h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-secondary">
            Your dashboard is ready. Enroll in any course to unlock personalized updates, progress, and trending recommendations.
          </p>
          <Link to="/dashboard/learner/courses" className="cinematic-btn cinematic-btn-primary mt-6 inline-flex">
            Start Learning
          </Link>
        </div>
      )}
    </section>
  )
}
