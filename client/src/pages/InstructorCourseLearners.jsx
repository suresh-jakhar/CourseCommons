import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCourseLearners } from '../services/admin'

function getLearnersErrorMessage(err) {
  return err.response?.data?.message || 'Unable to load enrolled learners right now.'
}

export default function InstructorCourseLearners() {
  const { courseId } = useParams()
  const [course, setCourse] = useState(null)
  const [learners, setLearners] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadLearners() {
      try {
        const data = await getCourseLearners(courseId)

        if (!isMounted) {
          return
        }

        setCourse(data.course)
        setLearners(data.learners ?? [])
        setError('')
      } catch (err) {
        if (!isMounted) {
          return
        }

        setError(getLearnersErrorMessage(err))
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadLearners()

    return () => {
      isMounted = false
    }
  }, [courseId])

  return (
    <section className="px-6 py-8 lg:px-10">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-400">Instructor workspace</p>
        <h1 className="mt-2 text-4xl font-bold text-white">Enrolled learners</h1>
        {course && (
          <p className="mt-2 text-sm text-gray-300">
            Course: <span className="font-medium text-white">{course.title}</span>
          </p>
        )}
      </div>

      {isLoading ? (
        <div className="rounded-2xl border border-gray-800 bg-gray-900/60 p-8 text-sm text-gray-300">
          Loading learners...
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-sm text-red-300">
          {error}
        </div>
      ) : (
        <>
          <div className="mb-6 rounded-2xl border border-gray-800 bg-gray-900/60 p-5">
            <p className="text-sm text-gray-400">Total enrolled learners</p>
            <p className="mt-3 text-3xl font-semibold text-white">{learners.length}</p>
          </div>

          {learners.length === 0 ? (
            <div className="rounded-2xl border border-gray-800 bg-gray-900/60 p-8">
              <h2 className="text-2xl font-semibold text-white">No learners enrolled yet</h2>
              <p className="mt-3 text-sm leading-6 text-gray-300">
                Once learners enroll in this course, their profile details will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/60">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-900">
                  <tr className="border-b border-gray-800 text-gray-300">
                    <th className="px-5 py-3 font-medium">Name</th>
                    <th className="px-5 py-3 font-medium">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {learners.map((learner) => (
                    <tr key={learner._id} className="border-b border-gray-800 last:border-b-0">
                      <td className="px-5 py-3 text-white">
                        {learner.firstName} {learner.lastName}
                      </td>
                      <td className="px-5 py-3 text-gray-300">{learner.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      <Link to="/instructor/courses" className="mt-6 inline-flex text-sm font-medium text-blue-400 hover:text-blue-300">
        Back to all courses
      </Link>
    </section>
  )
}