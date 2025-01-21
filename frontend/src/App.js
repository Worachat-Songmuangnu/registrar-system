import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavigationBar from "./components/NavBar";
import Student from "./pages/Student";
import StudentDashboard from "./pages/StudentDashboard";
import Teacher from "./pages/Teacher";
import TeacherDashboard from "./pages/TeacherDashboard";
import SignIn from "./pages/SignIn";
import { ProtectedRoute } from "./context/ProtectedRoute";
import { AuthProvider } from "./context/useAuth";

function App() {
  return (
    <>
      <AuthProvider>
        <NavigationBar />
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Routes element={<NavigationBar />}>
            <Route path="/" element={<Home />} />

            {/* Student */}
            <Route
              path="/student"
              element={
                <ProtectedRoute>
                  <Student />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/dashboard"
              element={
                <ProtectedRoute>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />

            {/* Teacher */}
            <Route
              path="/teacher"
              element={
                <ProtectedRoute>
                  <Teacher />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/dashboard"
              element={
                <ProtectedRoute>
                  <TeacherDashboard />
                </ProtectedRoute>
              }
            />

            {/* SignIn */}
            <Route path="/login" element={<SignIn />} />
          </Routes>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
