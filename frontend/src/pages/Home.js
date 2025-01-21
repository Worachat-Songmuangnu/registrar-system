import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col w-full bg-gradient-to-b from-blue-950 to-blue-400 ">
      <div className="flex flex-col justify-items-center items-center ">
        <p className="text-white text-4xl font-bold mt-48">Welcome to PSU Registrar System!</p>
        <p className="text-white text-2xl  mt-5 mb-20">
          This is website for grading system in Prince of Songkhla University
        </p>
        <button
          onClick={() => navigate("/login")}
          className="text-black font-bold  bg-white px-20 py-4 mb-5 rounded-full flex flex-row gap-0.5  "
        >
          <img src="./icons/login.svg" className="w-5" />
          <p className="">Login with Email</p>
        </button>
      </div>
    </div>
  );
}
