import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import HrLine from "../components/HrLine";
import { useNavigate } from "react-router-dom";
import EditableTable from "../context/EditableTable";
import { useState } from "react";

export default function TeacherAnnoucement() {
  const [maxScore, setMaxScore] = useState(100);

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

        <form class="flex flex-col ">
          <div class="flex flex-row mb-5 justify-center items-center ">
            <input
              type="text"
              id="title"
              class=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Title"
              required
            />
          </div>
          <div className="flex flex-row gap-4 w-full">
            <div className="w-1/2">
              <select
                id="subject"
                className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "
                required
              >
                <option selected>Select Subject</option>
                <option value="240122">240-122 Basic Software Labaratory</option>
                <option value="240123">240-123 Data Structure and Algorithm</option>
                <option value="240124">240-124 Web Developer Module</option>
                <option value="240125">240-125 Something</option>
              </select>
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
            <button class="text-red-500 font-semibold border-red-500 border-2  focus:ring-4 focus:outline-none   rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  ">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
