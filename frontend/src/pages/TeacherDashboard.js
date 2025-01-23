import { useNavigate } from "react-router-dom";
import TeacherScoreCard from "../components/TeacherScoreCard";
import { MagnifyingGlassIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import HrLine from "../components/HrLine";
export default function TeacherDashboard() {
  const navigate = useNavigate();
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
        <TeacherScoreCard />
        <TeacherScoreCard />
        <TeacherScoreCard />
      </div>
    </div>
  );
}
