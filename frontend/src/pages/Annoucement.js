import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HrLine from "../components/HrLine";
import EditableTable from "../components/EditableTable";
import ax from "../conf/ax";
import { useAuth } from "../context/useAuth";
import Loading from "../components/Loading";

export default function Annoucement() {
  const { user, isLoginPending } = useAuth();
  const { annoucementId } = useParams();
  const navigate = useNavigate();

  const [maxScore, setMaxScore] = useState(100);
  const [annoucement, setAnnoucement] = useState(null);
  const [scores, setScores] = useState(null);
  const [edit, setEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
  useEffect(() => console.log(scores), [scores]);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await ax.get(
        `/announcements?populate=scores&filters[Teacher][username]=${user.username}&filters[id]=${annoucementId}`
      );
      setAnnoucement(res.data.data[0]);
      setScores(res.data.data[0].scores);
      setMaxScore(res.data.data[0].max_score);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [isLoginPending]);

  const uploadScore = async (scores) => {
    try {
      await Promise.all(
        scores.map(async (score) => {
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

  const updateAnnoucement = async (announcement) => {
    try {
      await ax.put(`/announcements/${announcement.documentId}`, {
        data: announcement.data,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const scoresData = scores.map((score) => ({
      status: score.status,
      documentId: score.documentId || null,
      data: {
        score: score.score,
        username: score.username,
        name: score.name,
        announcement: {
          connect: { id: annoucement.id },
        },
      },
    }));

    const announcementData = {
      documentId: annoucement.documentId,
      data: {
        Title: annoucement.Title,
        subject_name: annoucement.subject_name,
        max_score: annoucement.max_score,
        Teacher: { connect: { id: user.id } },
      },
    };

    try {
      setIsLoading(true);
      await updateAnnoucement(announcementData);
      await uploadScore(scoresData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      fetchData();
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="flex flex-col w-full mt-3">
        <div className="flex flex-row justify-between ">
          <div className="flex flex-row justify-start gap-6">
            <button className="" onClick={() => navigate("/teacher/dashboard")}>
              <ArrowLeftIcon className="size-8" />
            </button>
            <p className="text-3xl">{annoucement && annoucement.Title}</p>
          </div>
          <label class="inline-flex items-center cursor-pointer gap-4">
            <span class="ms-3 text-sm font-medium text-gray-900">
              Edit Annoucement
            </span>
            <input
              type="checkbox"
              value={edit}
              onChange={(e) => setEdit(!edit)}
              class="sr-only peer"
            />
            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600 "></div>
          </label>
        </div>
        <HrLine />

        <form onSubmit={(e) => handleSave(e)} class="flex flex-col ">
          <div className="flex flex-row mb-5 justify-center items-center ">
            <input
              disabled={!edit}
              type="text"
              id="title"
              value={annoucement.Title}
              onChange={(e) =>
                setAnnoucement((prev) => ({
                  ...prev,
                  Title: e.target.value,
                }))
              }
              class=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Title"
              required
            />
          </div>
          <div className="flex flex-row gap-4 w-full">
            <div className="w-1/2">
              <input
                disabled={!edit}
                type="text"
                id="subject name"
                value={annoucement.subject_name}
                onChange={(e) =>
                  setAnnoucement((prev) => ({
                    ...prev,
                    subject_name: e.target.value,
                  }))
                }
                class=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Subject name"
                required
              />
            </div>
            <div class="w-1/2 flex flex-row mb-5 justify-center items-center ">
              <input
                disabled={!edit}
                type="number"
                id="maxScore"
                class=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="MaxScore"
                value={annoucement.max_score}
                onChange={(e) =>
                  setAnnoucement((prev) => ({
                    ...prev,
                    max_score: e.target.value,
                  }))
                }
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
            <button class="text-red-500 font-semibold border-red-500 border-2  focus:ring-4 focus:outline-none   rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  ">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
