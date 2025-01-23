import { useNavigate } from "react-router-dom";
import TeacherScoreCard from "../components/TeacherScoreCard";
import { MagnifyingGlassIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import HrLine from "../components/HrLine";
import ax, { axData } from "../conf/ax";
import { useEffect,useState } from "react";
import { useAuth } from "../context/useAuth";
export default function TeacherDashboard() {
  const { user,isLoading } = useAuth()
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await ax.get(`/announcements?populate=Teacher&populate=scores&populate=student&filters[Teacher][username]=${user.username}`)
        setData(res.data.data)
        console.log(data)
      }
      catch(err) {
        console.log(err)
      }

    }
    fetchData()
  },[isLoading])
  return (
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

      {data ? (
          data.map((announcement) => (
            <TeacherScoreCard
              key={announcement.id}
              title={announcement.Title}
              name={announcement.subject_name}
              id ={announcement.subject_id}
              publish={announcement.publishedAt}
              update={announcement.updatedAt}
              scores={announcement.scores.data}
              total={announcement.student.length}
              max_score={announcement.max_score}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No announcements found.</p>
        )}
      </div>
    </div>
  );
}
