import React, { Suspense, lazy } from 'react';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';

// Lazy-loaded components for performance optimization
const Home = lazy(() => import('./components/Home'));
const StudentDashboard = lazy(() => import('./components/Studentdashboard'));
const StudentProfile = lazy(() => import('./components/Studentprofile'));
const ApplyScholarship = lazy(() => import('./components/Applysclorship'));
const EditProfile = lazy(() => import('./components/Editprofile'));
const StudentDocuments = lazy(() => import('./components/Studentdocument'));
const StudentRecords = lazy(() => import('./components/Studentsclrecodes'));
const StudentLogin = lazy(() => import('./components/Studentlogin'));
const Sitemap = lazy(() => import('./components/Sitemap'));
const Info = lazy(() => import('./components/Info'));
const NotFound = lazy(() => import('./components/NotFound')); // 404 page
const Forgetpassword =lazy(()=>import('./components/Forgetpassword'))
const Announce=lazy(()=>import('./components/Announce'))
const Track =lazy(()=>import('./components/Track'))


// Middleware: Protect Routes Based on Role
const ProtectedRoute = ({ element, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // Example: "student", "institute", "officer"

  // If there's no token, redirect to signinup
  if (!token) {
    return <Navigate to="/signinup" replace />;
  }

  // If the user's role doesn't match the allowed roles, redirect to home
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return element;
};

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signinup" element={<StudentLogin />} />  {/* No protection for login/signup */}
          <Route path="/site-map" element={<Sitemap />} />
          <Route path="/forgetpass" element={<Forgetpassword/>}/>
          <Route path="/Announce" element={<Announce/>} />
          <Route path="/info" element={<Info />} />

          {/* Protected Routes - Only Accessible by Students */}
          <Route path="/student" element={<ProtectedRoute element={<StudentDashboard />} allowedRoles={["student"]} />} />
          <Route path="/student/profile" element={<ProtectedRoute element={<StudentProfile />} allowedRoles={["student"]} />} />
          <Route path="/student/apply" element={<ProtectedRoute element={<ApplyScholarship />} allowedRoles={["student"]} />} />
          <Route path="/student/edit" element={<ProtectedRoute element={<EditProfile />} allowedRoles={["student"]} />} />
          <Route path="/student/documents" element={<ProtectedRoute element={<StudentDocuments />} allowedRoles={["student"]} />} />
          <Route path="/student/recodes" element={<ProtectedRoute element={<StudentRecords />} allowedRoles={["student"]} />} />
          <Route path="/student/track" element={<ProtectedRoute element={<Track/>} allowedRoles={["student"]} />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
