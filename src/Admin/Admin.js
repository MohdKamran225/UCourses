import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const Admin = () => {
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

  const removeCourse = (e) => {
    axios.delete(`${url + "/" + e.target.value}`);
  };

  const editCourse = () => {};
  return (
    <>
      <div className="flex justify-between w-[80%]  mx-auto my-10">
        <p className="text-4xl">ADMIN DASHBOARD</p>
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
      <div className="flex justify-end w-[80%]  mx-auto my-10">
        <Link to={`/addCourse`}>
          <button className="border border-[#22394d42] p-3 rounded-lg text-white bg-[#22394D]">
            +Add Courses
          </button>
        </Link>
      </div>
      <div className="w-[80%] border border-[#22394d42] mx-auto my-10">
        {courses.map((res) => {
          return (
            <div
              key={res.id}
              className="flex w-[100%] gap-3 p-4 border border-b-[#22394d42]"
            >
              <img src={res.img} alt={res.title} className="rounded-md w-1/4" />
              <div className="flex justify-between w-[100%] gap-3">
                <div>
                  <p className="text-sm font-medium text-[#22394d]">
                    {res.title}
                  </p>
                  <p className="text-sm font-medium text-[#D65252]">
                    {res.category.toUpperCase()}
                  </p>
                  <p className="text-sm font-medium  text-[#00B777]">
                    ${res.price}
                  </p>
                  <div className="flex">
                    {[...Array(res.rating)].map((_res, index) => {
                      return (
                        <svg
                          key={index}
                          className="text-gray-900 hover:text-[#808080a9] h-5 w-5 flex-shrink-0"
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
                </div>
                <div className="flex gap-6">
                  <button
                    className="rounded-xl text-orange-600 hover:text-orange-300"
                    value={res.id}
                    onClick={removeCourse}
                  >
                    Delete
                  </button>
                  <button
                    className="rounded-xl text-orange-600 hover:text-orange-300"
                    value={res.id}
                    onClick={editCourse}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
