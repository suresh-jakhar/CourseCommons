import { Routes, Route, Navigate } from 'react-router-dom'
import GuestLayout from './layouts/GuestLayout'
import LearnerLayout from './layouts/LearnerLayout'
import InstructorLayout from './layouts/InstructorLayout'

// Guest pages
import LandingPage from './pages/LandingPage'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import LearnerSignup from './pages/LearnerSignup'
import InstructorSignup from './pages/InstructorSignup'

// Learner pages
import LearnerDashboard from './pages/LearnerDashboard'
import Courses from './pages/Courses'
import MyCourses from './pages/MyCourses'
import LearnerCourseDetail from './pages/LearnerCourseDetail'
import Community from './pages/Community'
import Channels from './pages/Channels'
import Announcements from './pages/Announcements'

// Instructor pages
import InstructorCourses from './pages/InstructorCourses'
import InstructorCreateCourse from './pages/InstructorCreateCourse'
import InstructorEditCourse from './pages/InstructorEditCourse'
import InstructorCourseLearners from './pages/InstructorCourseLearners'

function App() {
  return (
    <Routes>
      {/* ─── Guest Routes ─── */}
      <Route element={<GuestLayout />}>
        <Route path="/" element={<LandingPage />} />
        {/* Only wrap LandingPage with GuestLayout */}
      </Route>

      {/* ─── Standalone Auth Routes ─── */}
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signup/learner" element={<LearnerSignup />} />
      <Route path="/signup/instructor" element={<InstructorSignup />} />

      {/* ─── Learner Routes ─── */}
      <Route path="/dashboard/learner" element={<LearnerLayout />}>
        <Route index element={<LearnerDashboard />} />
        <Route path="courses" element={<Courses />} />
        <Route path="my-courses" element={<MyCourses />} />
        <Route path="my-courses/:courseId" element={<LearnerCourseDetail />} />
        <Route path="community" element={<Community />} />
        <Route path="channels" element={<Channels />} />
        <Route path="announcements" element={<Announcements />} />
      </Route>

      {/* ─── Instructor Routes ─── */}
      <Route path="/dashboard/instructor" element={<InstructorLayout />}>
        <Route index element={<Navigate to="courses" replace />} />
        <Route path="courses" element={<InstructorCourses />} />
        <Route path="courses/new" element={<InstructorCreateCourse />} />
        <Route path="courses/:courseId/edit" element={<InstructorEditCourse />} />
        <Route path="courses/:courseId/learners" element={<InstructorCourseLearners />} />
      </Route>

      {/* ─── Legacy redirects ─── */}
      <Route path="/courses" element={<Navigate to="/dashboard/learner/courses" replace />} />
      <Route path="/my-courses" element={<Navigate to="/dashboard/learner/my-courses" replace />} />
      <Route path="/community" element={<Navigate to="/dashboard/learner/community" replace />} />
      <Route path="/channels" element={<Navigate to="/dashboard/learner/channels" replace />} />
      <Route path="/announcements" element={<Navigate to="/dashboard/learner/announcements" replace />} />
      <Route path="/explore" element={<Navigate to="/dashboard/learner/courses" replace />} />
      <Route path="/instructor" element={<Navigate to="/dashboard/instructor/courses" replace />} />
      <Route path="/instructor/*" element={<Navigate to="/dashboard/instructor/courses" replace />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
