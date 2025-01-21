import { useAuth } from "../context/useAuth";

export default function NavigationBar() {
  const { user, logout } = useAuth();
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-row items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              PSU Registrar System
            </span>
          </a>
          <div className="items-center justify-between" id="navbar-user">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {user && user.role == "student" && (
                <li>
                  <a
                    href="/student/dashboard"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    {/* Student Dashboard */}
                    Dashboard
                  </a>
                </li>
              )}
              {user && user.role == "teacher" && (
                <li>
                  <a
                    href="/teacher/dashboard/"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    {/* Teacher Dashboard */}
                    Teacher
                  </a>
                </li>
              )}
            </ul>
          </div>
          {user ? (
            <div className="text-white">
              Login as:{" "}
              <span className="hover:underline">
                <a onClick={logout}> {user.email} </a>
              </span>
            </div>
          ) : (
            <div className="px-5 py-1 bg-white rounded-full font-semibold ">
              <a className="" href="/login">
                Sign in
              </a>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

<div className="flex flex-col">
  <div className="flex flex-row"></div>
</div>;
