import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import HrLine from "../components/HrLine";
import { useNavigate } from "react-router-dom";
import EditableTable from "../context/EditableTable";
import { useState } from "react";
import ax from "../conf/ax";
import { useAuth } from "../context/useAuth";

export default function TeacherAnnoucement() {
  const { user, isLoading } = useAuth();
  const [maxScore, setMaxScore] = useState(null);
  const [title, setTitle] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const announcementData = {
      data: {
      Title: title,            
      subject_name: subjectName,        
      max_score: maxScore,
      Teacher : user.id
    }};

    try {
      const res = await ax.post("/announcements", announcementData
      );
      alert("announcement created successfully"); 
    } catch (error) {
      console.error("Error creating announcement:", error);
      alert("Error creating announcement:"+  error.message); 
    }
  };

  
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col w-full mt-3">
        <div className="flex flex-row justify-start gap-6">
          <button className="" onClick={() => navigate("/teacher/dashboard")}>
            <ArrowLeftIcon className="size-8" />
          </button>
          <p className="text-3xl">Create New Annoucement</p>
        </div>
        <HrLine />

        <form className="flex flex-col " onSubmit={handleSubmit}>
          <div className="flex flex-row mb-5 justify-center items-center ">
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              class=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Title"
              required
            />
          </div>
          <div className="flex flex-row gap-4 w-full">
            <div className="w-1/2">
            <input
              type="text"
              id="subject name"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              class=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Subject name"
              required
            />
            </div>
            <div class="w-1/2 flex flex-row mb-5 justify-center items-center ">
              <input
                type="number"
                id="maxScore"
                class=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="MaxScore"
                value={maxScore}
                onChange={(e) => setMaxScore(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <EditableTable maxScore={maxScore} />
          </div>
          <div className="flex flex-row justify-end gap-3 mt-5">
            <button
              type="submit"
              class="text-white font-semibold bg-primarydark  focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  "
            >
              Create Annoucement
            </button>
            <button type="button" onClick={() => navigate("/teacher/dashboard")} 
            class="text-red-500 font-semibold border-red-500 border-2  focus:ring-4 focus:outline-none   rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  ">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
