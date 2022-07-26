/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
// -----------------------------------------
export const Nav = () => {
  const history = useHistory();
  const [logout, setLogout] = useState(false);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("USER"));
    if (user) {
      setLogout(true);
    } else {
      setLogout(false);
    }
  }, []);

  const logOutUser = () => {
    localStorage.removeItem("USER");
    history.push("/login");
    setLogout(false);
  };

  return (
    <div className="bg-[#22394D]">
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-3 lg:px-3">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Icon_Atom.svg/615px-Icon_Atom.svg.png"
              className="h-6 w-6"
              alt=""
            />
            <p className="ml-3 font-medium text-white truncate text-2xl">
              <Link to="/">UCourses</Link>
            </p>
            <p className="ml-3 text-white truncate font-light px-3 border-solid border-l-[1px] border-white">
              Now learn from anywhere
            </p>
          </div>
          <input
            type="text"
            placeholder="Search Courses"
            className="p-1 rounded-md"
          />
          <div className="flex items-center">
            {logout ? (
              <>
                <p
                  className="ml-3 font-normal text-white truncate"
                  onClick={logOutUser}
                >
                  LogOut
                </p>
              </>
            ) : (
              <>
                <p className="ml-3 font-normal text-white truncate">
                  <Link to="/login">Login</Link>
                </p>
                <p className="ml-3 font-normal text-white truncate">
                  <Link to="/signUp">SignUp</Link>
                </p>
              </>
            )}
            {/* ----------------------bellicon---------------- */}
            {logout ? (
              <>
                <Link to="/cart">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mx-2 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                </Link>
              </>
            ) : (
              ""
            )}
            {/* ----------------------------------- */}
          </div>
        </div>
      </div>
    </div>
  );
};
