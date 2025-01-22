import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavigationBar from "./components/NavBar";
import Student from "./pages/Student";
import StudentDashboard from "./pages/StudentDashboard";
import Teacher from "./pages/Teacher";
import TeacherDashboard from "./pages/TeacherDashboard";
import SignIn from "./pages/SignIn";
import { AuthProvider } from "./context/useAuth";
import { ProtectedStudentRoute } from "./context/ProtectedStudentRoute";
import { ProtectedTeacherRoute } from "./context/ProtectedTeacherRoute";
import { useEffect } from "react";

function App() {
  return (
    <>
      <AuthProvider>
        <NavigationBar />
        <Routes element={<NavigationBar />}>
          <Route path="/" element={<Home />} />

          {/* <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"> */}
          {/* Student */}
          <Route
            path="/student"
            element={
              <ProtectedStudentRoute>
                <Student />
              </ProtectedStudentRoute>
            }
          />
          <Route
            path="/student/dashboard"
            element={
              <ProtectedStudentRoute>
                <StudentDashboard />
              </ProtectedStudentRoute>
            }
          />

          {/* Teacher */}
          <Route
            path="/teacher"
            element={
              <ProtectedTeacherRoute>
                <Teacher />
              </ProtectedTeacherRoute>
            }
          />
          <Route
            path="/teacher/dashboard"
            element={
              <ProtectedTeacherRoute>
                <TeacherDashboard />
              </ProtectedTeacherRoute>
            }
          />

          {/* SignIn */}
          <Route path="/login" element={<SignIn />} />
          {/* </div> */}
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
