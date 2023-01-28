/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <>
      <nav className="bg-blue-500 shadow dark:bg-gray-800">
        <div
          className="
      container
      px-6
      py-3
      mx-auto
      md:flex md:justify-between md:items-center
    "
        >
          <div className="flex items-center justify-between">
            <div>
              <a
                className="
            text-xl
            font-bold
            text-white
            dark:text-white
            md:text-2xl
            hover:text-gray-900
            dark:hover:text-gray-300
          "
                href="#"
              >
                Teacher Attendance
              </a>
            </div>
          </div>

          <div className="items-center md:flex">
            <div className="flex flex-col md:flex-row md:mx-6">
              <Link
                className="
            my-1
            text-white
            dark:text-gray-200
            hover:text-indigo-900
            dark:hover:text-indigo-400
            md:mx-4 md:my-0
          "
                to="/"
              >
                Home
              </Link>

              <Link
                className="
            my-1
            text-white
            dark:text-gray-200
            hover:text-indigo-900
            dark:hover:text-indigo-400
            md:mx-4 md:my-0
          "
                to="/teachers"
              >
                Teacher
              </Link>
              <Link
                className="
            my-1
            text-white
            dark:text-gray-200
            hover:text-indigo-900
            dark:hover:text-indigo-400
            md:mx-4 md:my-0
          "
                to="/classroom-records"
              >
                Classroom Attendance
              </Link>
              <Link
                className="
            my-1
            text-white
            dark:text-gray-200
            hover:text-indigo-900
            dark:hover:text-indigo-400
            md:mx-4 md:my-0
          "
                to="/class-records"
              >
                Classes
              </Link>
              <Link
                className="
            my-1
            text-white
            dark:text-gray-200
            hover:text-indigo-900
            dark:hover:text-indigo-400
            md:mx-4 md:my-0
          "
                to="/settings"
              >
                Settings
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
