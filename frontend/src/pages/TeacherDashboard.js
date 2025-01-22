import TeacherScoreCard from "../components/TeacherScoreCard";
export default function TeacherDashboard() {
  return (
    <div className="w-full flex flex-col mt-8">
      <div className="w-full flex flex-row justify-between">
        <div className="flex flex-row w-1/3 gap-4">
          <input
            className="text-primarydark border-primarydark border-2 w-full px-4 focus:outline-none rounded-lg"
            placeholder="Search subject"
          />
          <button className="bg-primarydark px-4 rounded-md">
            <img
              src="../icons/search.svg"
              className="w-5 fill-white text-white "
            />
          </button>
        </div>
        <button className="w-fit px-8 py-1.5 bg-primarydark text-white font-semibold rounded-lg">
          + Add Annoucement
        </button>
      </div>
      <hr class="h-px my-8 bg-primarydark border-0"></hr>
      <div className="flex flex-col gap-5">
        <TeacherScoreCard />
        <TeacherScoreCard />
        <TeacherScoreCard />
      </div>
    </div>
  );
}
