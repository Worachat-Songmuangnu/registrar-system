// StudentDashboard.js
import React from "react";
import StudentCard from "../components/StudentCard"; // นำเข้า Component StudentCard
import StudentSearch from "../components/StudentSearch"; // นำเข้า Component StudentSearch
import { useAuth } from "../context/useAuth";
import ax from "../conf/ax";
import { useEffect, useState } from "react";
import conf from "../conf/main";
import StudenInfoBox from "../components/StudentInfoBox";
import Loading from "../components/Loading";

export default function StudentDashboard() {
  const { user, isLoginPending } = useAuth();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await ax.get(
        conf.fetchStudentAnnouncementEndpoint(user.username)
      );
      setData(res.data.data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [isLoginPending]);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="flex flex-col h-screen w-screen gap-4 mt-12">
      <StudenInfoBox studentname={user.Name} studentid={user.username} />

      <h1 className="text-4xl font-bold text-center text-black mb-8">
        School-Record
      </h1>
      <StudentSearch />
      <div className="flex flex-col gap-5 overflow-y-scroll">
        {data ? (
          data
            .filter((score) => score.announcement?.postStatus === "publish")
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            .map((score) => (
              <StudentCard
                key={score.id}
                SubjectId={score.announcement.subject_id}
                Subject={score.announcement.subject_name}
                Score={score.score}
                MaxScore={score.announcement.max_score}
                Status={
                  score.score > score.announcement.max_score / 2
                    ? "Pass"
                    : "Fail"
                }
                Date={score.updatedAt}
                Auditor={score.announcement.Teacher?.[0]?.Name}
              />
            ))
        ) : (
          <p className="text-center text-gray-500">No scores found.</p>
        )}
      </div>
    </div>
  );
}
