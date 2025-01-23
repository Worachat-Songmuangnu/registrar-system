import { useNavigate } from "react-router";
import { useAuth } from "./useAuth";
import { useEffect } from "react";
import Loading from "../components/Loading";

export const ProtectedTeacherRoute = ({ children }) => {
  const { isLoading, user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate, isLoading]);
  if (!user || user.role !== "teacher") {
    return isLoading ? (
      <Loading />
    ) : (
      <>
        <div className="container mt-20 text-center ">
          <p className="text-4xl font-bold mb-5">You must Login as Teacher!</p>
          <a href="/student/dashboard" className=" text-xl underline">
            Go Back
          </a>
        </div>
      </>
    );
  }
  return <div className="max-w-screen-lg flex flex-wrap items-center justify-between mx-auto p-4">{children}</div>;
};
