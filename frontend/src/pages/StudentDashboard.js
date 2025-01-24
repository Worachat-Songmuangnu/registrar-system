// StudentDashboard.js
import React from "react";
import StudentCard from "../components/StudentCard"; // นำเข้า Component StudentCard
import StudentSearch from "../components/StudentSearch"; // นำเข้า Component StudentSearch
import StudenInfoBox from "../components/StudentInfoBox"; // นำเข้า Component StudenInfoBox
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
          `/scores?populate=announcement&populate[announcement][populate][0]=Teacher&populate=students&filters[students][username]=${user.username}`
        );
        console.log(res);
        setData(res.data.data);
        console.log(data);
        console.log(user);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [isLoading]);

  return (
    <div className="flex flex-col h-screen w-screen p-20 gap-4">
      <StudenInfoBox studentname={user.Name} studentid={user.username} />

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
            Auditor={score.announcement.Teacher?.[0]?.Name}
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
