import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import HrLine from "../components/HrLine";
import { useNavigate } from "react-router-dom";
import EditableTable from "../components/EditableTable";
import { useState } from "react";
import ax from "../conf/ax";
import { useAuth } from "../context/useAuth";

export default function TeacherAnnoucement() {
  const { user, isLoginPending } = useAuth();

  const [title, setTitle] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [maxScore, setMaxScore] = useState(null);
  const [edit, setEdit] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [scores, setScores] = useState([]);
  const handleChange = (id, field, value) => {
    setScores((prevData) =>
      prevData.map((row) =>
        row.id === id
          ? {
              ...row,
              [field]: value,
            }
          : row
      )
    );
  };

  const handleAddRow = (count = 1) => {
    const newRows = Array.from({ length: count }, (_, i) => {
      const newId =
        scores.length > 0 ? scores[scores.length - 1].id + i + 1 : i + 1;
      return {
        id: newId,
        username: "",
        name: "",
        score: "0",
      };
    });
    setScores((prevData) => [...prevData, ...newRows]);
  };
  const handleDeleteRow = (e, id) => {
    e.preventDefault();
    setScores((prevData) =>
      prevData.map((row) =>
        row.id === id
          ? { ...row, status: row.status === "delete" ? "active" : "delete" }
          : row
      )
    );
  };
  const uploadScore = async (scores, annoucementId) => {
    const scoresData = scores.map((score) => ({
      status: score.status,
      documentId: score.documentId || null,
      data: {
        score: score.score,
        username: score.username,
        name: score.name,
        announcement: {
          connect: { id: annoucementId },
        },
      },
    }));
    try {
      await Promise.all(
        scoresData.map(async (score) => {
          if (score.status === "delete") {
            await ax.delete(`/scores/${score.documentId}`);
          } else if (score.documentId) {
            await ax.put(`/scores/${score.documentId}`, { data: score.data });
          } else {
            await ax.post(`/scores/`, { data: score.data });
          }
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  const createAnnouncement = async (announcement) => {
    try {
      const responese = await ax.post(`/announcements`, {
        data: announcement.data,
      });
      return responese;
    } catch (e) {
      console.log(e);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const announcementData = {
      data: {
        Title: title,
        subject_name: subjectName,
        max_score: maxScore,
        Teacher: { connect: { id: user.id } },
      },
    };

    try {
      setIsLoading(true);
      const responese = await createAnnouncement(announcementData);
      console.log(responese.data);
      const annoucementId = responese.data.data.id;
      await uploadScore(scores, annoucementId);
      navigate(`/teacher/annoucement/${annoucementId}`);
      alert("announcement created successfully");
    } catch (error) {
      console.error("Error creating announcement:", error);
      alert("Error creating announcement:" + error.message);
    } finally {
      setIsLoading(false);
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

        <form className="flex flex-col " onSubmit={handleSave}>
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
            <EditableTable
              scores={scores}
              maxScore={maxScore}
              edit={edit}
              handleChange={handleChange}
              handleAddRow={handleAddRow}
              handleDeleteRow={handleDeleteRow}
            />
          </div>
          <div className="flex flex-row justify-end gap-3 mt-5">
            <button
              type="submit"
              class="text-white font-semibold bg-primarydark  focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  "
            >
              Save change
            </button>
            <button
              type="button"
              onClick={() => navigate("/teacher/dashboard")}
              class="text-red-500 font-semibold border-red-500 border-2  focus:ring-4 focus:outline-none   rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  "
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
