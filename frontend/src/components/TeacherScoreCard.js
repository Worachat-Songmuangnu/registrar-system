import { EyeIcon, PencilSquareIcon, ArchiveBoxArrowDownIcon } from "@heroicons/react/24/outline";

export default function TeacherScoreCard() {
  return (
    <div className="w-full shadow-primarydark border-2 h-fit rounded-lg flex flex-row p-5">
      <div className="flex flex-col w-full justify-between">
        <div>
          <p className="font-bold text-lg text-primarydark">
            240-124 <span className="font-bold text-lg text-primarydark ">Web Developer and Designer Module</span>
          </p>
          <p className=" text-lg text-primarydark">Midterm exam</p>
          <p className=" text-base text-primarydark">Section: 02</p>
          <p className=" text-base text-primarydark">Total: 30 Students</p>
        </div>
        <div className="flex flex-row gap-6 mt-2">
          <p className="text-sm font-thin text-primarydark">Post on: 28/1/2568</p>
          <p className="text-sm font-thin text-primarydark">Last updated: 29/1/2568</p>
        </div>
      </div>
      <div className="flex flex-col gap-3 text-white w-40 ">
        <button className="flex flex-row items-center justify-center gap-3 transition py-1.5 border-primarydark border-2 text-primarydark rounded-lg hover:bg-primarydark hover:text-white">
          <EyeIcon className="size-5" />
          <p>View</p>
        </button>
        <button className="flex flex-row items-center justify-center gap-3 transition py-1.5 border-primarydark border-2 text-primarydark rounded-lg hover:bg-primarydark hover:text-white">
          <PencilSquareIcon className="size-5" />
          Edit
        </button>
        <button className="flex flex-row items-center justify-center gap-3 transition py-1.5 border-red-800 border-2 text-red-800 rounded-lg hover:bg-red-800 hover:text-white">
          <ArchiveBoxArrowDownIcon className="size-5" />
          Archive
        </button>
      </div>
    </div>
  );
}
