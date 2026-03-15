import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Courses from './pages/Courses'
import Community from './pages/Community'
import Channels from './pages/Channels'
import Announcements from './pages/Announcements'
import MyCourses from './pages/MyCourses'
import LearnerCourseDetail from './pages/LearnerCourseDetail'
import LearnerSignup from './pages/LearnerSignup'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import InstructorSignup from './pages/InstructorSignup'
import InstructorCourses from './pages/InstructorCourses'
import InstructorCreateCourse from './pages/InstructorCreateCourse'
import InstructorEditCourse from './pages/InstructorEditCourse'
import InstructorCourseLearners from './pages/InstructorCourseLearners'
import AppShell from './components/AppShell'
import InstructorProtectedRoute from './components/InstructorProtectedRoute'
import ProtectedRoute from './components/ProtectedRoute'
import PublicOnlyRoute from './components/PublicOnlyRoute'

function App() {
  return (
    <AppShell>
      <Routes>
        {/* Public — marketing home (shows dashboard when logged in as learner) */}
        <Route path="/" element={<Home />} />

        {/* Public-only — redirect authenticated users to their dashboard */}
        <Route
          path="/signup"
          element={
            <PublicOnlyRoute>
              <Signup />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/signup/learner"
          element={
            <PublicOnlyRoute>
              <LearnerSignup />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/signup/instructor"
          element={
            <PublicOnlyRoute>
              <InstructorSignup />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/signin"
          element={
            <PublicOnlyRoute>
              <Signin />
            </PublicOnlyRoute>
          }
        />

        {/* Learner-protected routes */}
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-courses"
          element={
            <ProtectedRoute>
              <MyCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-courses/:courseId"
          element={
            <ProtectedRoute>
              <LearnerCourseDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/community"
          element={
            <ProtectedRoute>
              <Community />
            </ProtectedRoute>
          }
        />
        <Route
          path="/channels"
          element={
            <ProtectedRoute>
              <Channels />
            </ProtectedRoute>
          }
        />
        <Route
          path="/announcements"
          element={
            <ProtectedRoute>
              <Announcements />
            </ProtectedRoute>
          }
        />

        {/* Convenience redirects */}
        <Route path="/explore" element={<Navigate to="/courses" replace />} />

        {/* Instructor route aliases */}
        <Route path="/instructor" element={<Navigate to="/instructor/courses" replace />} />
        <Route path="/instructor/signup" element={<Navigate to="/signup/instructor" replace />} />
        <Route path="/instructor/signin" element={<Navigate to="/signin" replace />} />

        {/* Instructor-protected routes */}
        <Route
          path="/instructor/courses"
          element={
            <InstructorProtectedRoute>
              <InstructorCourses />
            </InstructorProtectedRoute>
          }
        />
        <Route
          path="/instructor/courses/new"
          element={
            <InstructorProtectedRoute>
              <InstructorCreateCourse />
            </InstructorProtectedRoute>
          }
        />
        <Route
          path="/instructor/courses/:courseId/edit"
          element={
            <InstructorProtectedRoute>
              <InstructorEditCourse />
            </InstructorProtectedRoute>
          }
        />
        <Route
          path="/instructor/courses/:courseId/learners"
          element={
            <InstructorProtectedRoute>
              <InstructorCourseLearners />
            </InstructorProtectedRoute>
          }
        />
      </Routes>
    </AppShell>
  )
}

export default App
