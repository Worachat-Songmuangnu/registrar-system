import { useNavigate } from "react-router-dom";
import TeacherScoreCard from "../components/TeacherScoreCard";
import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import HrLine from "../components/HrLine";
import ax from "../conf/ax";
import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import Loading from "../components/Loading";
export default function TeacherDashboard() {
  const { user, isLoginPending } = useAuth();
  const [annoucements, setAnnoucements] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await ax.get(
        `/announcements?populate=Teacher&populate=scores&populate=student&filters[Teacher][username]=${user.username}`
      );
      setAnnoucements(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [isLoginPending]);

  const updateAnnoucement = async (announcement) => {
    try {
      await ax.put(`/announcements/${announcement.documentId}`, {
        data: announcement.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
  const handleArchive = async (id) => {
    try {
      setIsLoading(true);

      const targetAnnouncement = annoucements.find(
        (announcement) => announcement.id === id
      );
      if (!targetAnnouncement) {
        throw new Error("Announcement not found");
      }

      const announcementData = {
        documentId: targetAnnouncement.documentId,
        data: {
          postStatus: "archive",
        },
      };

      await updateAnnoucement(announcementData);
    } catch (e) {
      console.error("Error archiving announcement:", e);
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="w-full flex flex-col mt-16">
      <div className="mb-12">
        <p className=" text-4xl  text-center">Your Annoucement</p>
      </div>
      <div className="w-full flex flex-row justify-between h-10">
        <div className="flex flex-row w-2/3 gap-4">
          <input
            className="text-primarydark border-primarydark border-2 w-full px-4 focus:outline-none rounded-lg"
            placeholder="Search subject"
          />
          <button className="bg-primarydark px-4 rounded-md">
            <MagnifyingGlassIcon className="size-5 text-white" />
          </button>
        </div>
        <button
          onClick={() => navigate("/teacher/annoucement")}
          className="flex flex-row items-center gap-2 w-fit px-8 py-1.5 bg-primarydark text-white font-semibold rounded-lg"
        >
          <PlusCircleIcon className="size-5 " />
          Add Annoucement
        </button>
      </div>
      <HrLine />
      <div className="flex flex-col gap-5">
        {annoucements ? (
          annoucements
            .filter((announcement) => announcement.postStatus === "publish")
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            .map((announcement) => (
              <TeacherScoreCard
                key={announcement.id}
                id={announcement.id}
                title={announcement.Title}
                name={announcement.subject_name}
                subject_id={announcement.subject_id}
                publish={announcement.publishedAt}
                update={announcement.updatedAt}
                scores={announcement.scores.data}
                total={announcement.scores.length}
                max_score={announcement.max_score}
                status={announcement.postStatus}
                handleArchive={handleArchive}
              />
            ))
        ) : (
          <p className="text-center text-gray-500">No announcements found.</p>
        )}
      </div>
    </div>
  );
}
