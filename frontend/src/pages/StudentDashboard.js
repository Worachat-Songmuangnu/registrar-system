// StudentDashboard.js
import React from "react";
import StudentCard from "../components/StudentCard"; // นำเข้า Component Card
import StudentSearch from "../components/StudentSearch"; // นำเข้า Component Search
import { useAuth } from "../context/useAuth";
import ax, { axData } from "../conf/ax";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const { user, isLoading } = useAuth();
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ax.get(
          `/scores?populate=announcement&populate=students&filters[students][username]=${user.username}`
        );
        console.log(res);
        setData(res.data.data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [isLoading]);

  return (
    <div className="flex flex-col h-screen w-screen p-20 gap-4">
      <div class="flex items-center gap-4">
        <div class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full ">
          <svg
            class="absolute w-12 h-12 text-gray-400 -left-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <div class="font-medium ">
          <div>Pongsaton Shusuwan</div>
          <div class="text-sm  ">6410110336</div>
        </div>
      </div>

      <h1 className="text-4xl font-bold text-center text-black">
        School-Record
      </h1>

      <StudentSearch />

      {data ? (
        data.map((score) => (
          <StudentCard
            SubjectId={score.announcement.subject_id}
            Subject={score.announcement.subject_name}
            Score={score.score}
            MaxScore={score.announcement.max_score}
            Status={
              score.score > score.announcement.max_score / 2 ? "Pass" : "Fail"
            }
            Date={score.updatedAt}
            Auditor="555"
          />
        ))
      ) : (
        <p className="text-center text-gray-500">No scores found.</p>
      )}

      {/*<StudentCard
        SubjectId="240-124"
        Subject="WEB DESIG & DEVELOPER MODULE"
        Score="60"
        MaxScore="100"
        Status="Pass"
        Date="22/01/2025"
        Auditor="Suton"
      />
      <StudentCard
        SubjectId="240-124"
        Subject="WEB DESIG & DEVELOPER MODULE"
        Score="60"
        MaxScore="100"
        Status="Pass"
        Date="22/01/2025"
        Auditor="Suton"
      />
      <StudentCard
        SubjectId="240-124"
        Subject="WEB DESIG & DEVELOPER MODULE"
        Score="60"
        MaxScore="100"
        Status="Pass"
        Date="22/01/2025"
        Auditor="Suton"
      />
      <StudentCard
        SubjectId="240-124"
        Subject="WEB DESIG & DEVELOPER MODULE"
        Score="60"
        MaxScore="100"
        Status="Pass"
        Date="22/01/2025"
        Auditor="Suton"
      />*/}
    </div>
  );
}
