import instructorApi from './instructorApi'

export async function instructorSignup({ email, password, firstName, lastName }) {
  const response = await instructorApi.post('/instructor/signup', { email, password, firstName, lastName })
  return response.data
}

export async function instructorSignin({ email, password }) {
  const response = await instructorApi.post('/instructor/signin', { email, password })
  return response.data
}

export async function getInstructorCourses() {
  const response = await instructorApi.get('/instructor/course/bulk')
  return response.data.courses ?? []
}

export async function createInstructorCourse(course) {
  const response = await instructorApi.post('/instructor/course/create', course)
  return response.data
}

export async function updateInstructorCourse(courseId, course) {
  const response = await instructorApi.put(`/instructor/course/update/${courseId}`, course)
  return response.data
}

export async function deleteInstructorCourse(courseId) {
  const response = await instructorApi.delete(`/instructor/course/delete/${courseId}`)
  return response.data
}

export async function getCourseLearners(courseId) {
  const response = await instructorApi.get(`/instructor/course/${courseId}/learners`)
  return response.data
}