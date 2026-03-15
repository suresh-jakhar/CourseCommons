import api from './api'

export async function getCoursePreview() {
  const response = await api.get('/course/preview')
  return response.data.courses ?? []
}

export async function enrollInCourse(courseId) {
  const response = await api.post('/user/course/enroll', { courseId })
  return response.data
}

export async function purchaseCourse(courseId) {
  const response = await api.post('/user/course/purchase', { courseId })
  return response.data
}

export async function getMyCourses() {
  const response = await api.get('/user/my-courses')
  return response.data.courses ?? []
}

export async function getLearnerCourseDetail(courseId) {
  const response = await api.get(`/user/course/${courseId}`)
  return response.data
}

export async function updateLearnerCourseProgress(courseId, percentComplete) {
  const response = await api.put(`/user/course/${courseId}/progress`, { percentComplete })
  return response.data
}
