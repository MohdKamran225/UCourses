import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// ---------------------------------
export const Home = () => {
  const [courses, setCourses] = useState([]);
  const [check, setCheck] = useState([]);
  const [categories, setCategories] = useState([]);

  const url = "http://localhost:4000/courses";

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setCourses(res.data);
        setCheck(res.data);
        const catArr = res.data.map((res) => {
          return res.category;
        });
        setCategories([...new Set(catArr)]);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, []);

  const changeHandle = (e) => {
    if (e.target.value === "all") {
      axios
        .get(url)
        .then((res) => {
          setCourses(res.data);
          const catArr = res.data.map((res) => {
            return res.category;
          });
          setCategories([...new Set(catArr)]);
        })
        .catch((error) => {
          console.warn(error);
        });
    }
    if (courses.length === check.length) {
      setCourses(
        courses.filter((res) => {
          return e.target.value === res.category;
        })
      );
    }
    if (courses.length !== check.length) {
      setCourses(
        check.filter((res) => {
          return e.target.value === res.category;
        })
      );
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between">
          <p className="text-2xl font-extrabold tracking-tight text-gray-900">
            Trending Courses
          </p>
          <div>
            <label htmlFor="category">Sort *</label>
            <select
              name="category"
              id="category"
              onChange={changeHandle}
              className="p-1 rounded-md"
            >
              <option value="all">all Courses</option>
              {categories.map((res, index) => {
                return (
                  <option key={index} value={res}>
                    {res}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {courses.map((course) => (
            <div key={course.id} className="group relative">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-2 rounded-md overflow-hidden group-hover:opacity-75 lg:h-40 lg:aspect-none">
                <img
                  src={course.img}
                  alt={course.title}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>

              <div className="flex items-center mt-2">
                {[...Array(course.rating)].map((res, index) => {
                  return (
                    <svg
                      key={index}
                      className="text-gray-900  h-5 w-5 flex-shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  );
                })}
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <Link to={`/courses/${course.id}`}>
                    <h3 className="text-lg font-medium text-[#22394D]">
                      <span aria-hidden="true" className="absolute inset-0 " />
                      {course.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-[#22394D]">{course.author}</p>
                </div>
                <p className="text-lg font-medium text-[#00B777]">
                  &#x20B9;{course.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
