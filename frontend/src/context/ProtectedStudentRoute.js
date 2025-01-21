import { useNavigate } from "react-router";
import { useAuth } from "./useAuth";
import { useEffect } from "react";

export const ProtectedStudentRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);
  if (!user || user.role != "student") {
    return (
      <>
        <div className="container mt-20 text-center ">
          <p className="text-4xl font-bold mb-5">You must Login as Student!</p>
          <a href="/teacher/dashboard" className=" text-xl underline">
            Go Back
          </a>
        </div>
      </>
    );
  }
  return <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">{children}</div>;
};
