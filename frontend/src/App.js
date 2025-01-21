import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavigationBar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import Student from "./pages/Student";
import StudentDashboard from "./pages/StudentDashboard";
import Teacher from "./pages/Teacher";
import TeacherDashboard from "./pages/TeacherDashboard";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <>
      <NavigationBar />
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Routes element={<NavigationBar />}>
          <Route path="/" element={<Home />} />

          {/* Student */}
          <Route path="/student" element={<Student />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />

          {/* Teacher */}
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />

          {/* SignIn */}
          <Route path="/teacher/dashboard" element={<SignIn />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
