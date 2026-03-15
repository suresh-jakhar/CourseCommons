import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InstructorCourseForm from '../components/InstructorCourseForm'
import { createInstructorCourse } from '../services/instructor'

function getCourseSaveError(err) {
  return err.response?.data?.message || 'Unable to save this course right now.'
}

export default function InstructorCreateCourse() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(course) {
    setError('')
    setIsSubmitting(true)

    try {
      const response = await createInstructorCourse(course)
      navigate('/instructor/courses', {
        replace: true,
        state: { notice: response.message || 'Course created successfully.' },
      })
    } catch (err) {
      setError(getCourseSaveError(err))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="px-6 py-8 lg:px-10">
      <div className="mb-8 space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-secondary">Instructor workspace</p>
        <h1 className="text-4xl font-bold text-primary">Create a new course</h1>
        <p className="max-w-2xl text-sm leading-6 text-secondary">
          Set up the course metadata, pricing model, and cover image learners will see in the catalog.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-6">
        <InstructorCourseForm
          submitLabel="Create course"
          isSubmitting={isSubmitting}
          error={error}
          onSubmit={handleSubmit}
        />
      </div>

      <Link to="/instructor/courses" className="mt-6 inline-flex text-sm font-medium text-secondary hover:text-secondary">
        Back to all courses
      </Link>
    </section>
  )
}