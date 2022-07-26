import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

export const AddCourse = () => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const url = "http://localhost:4000/courses";

  const onSubmit = (data) => {
    console.log(data);
    if (data) {
      axios
        .post(url, data)
        .then((res) => {
          console.log(res);
          alert("Course Added Successfull");
          history.push("/admin");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <div className="flex justify-center w-[60%] mx-auto my-5">
        <p className="text-4xl">ADD COURSES</p>
      </div>
      <div className="flex justify-end w-[60%] mx-auto my-5">
        <Link to="/admin">
          <p className="text-[#22394D]">back to all Courses &rarr;</p>
        </Link>
      </div>
      <div className="w-[60%] mx-auto my-5">
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6 ">
          {/* ----------------------------------title--------------------------- */}

          <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-6">
            <div>
              <label htmlFor="title" className="sr-only">
                Course Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                maxLength={50}
                {...register("title", {
                  required: true,
                  minLength: 10,
                })}
                className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Course Title"
              />
              {errors.title && (
                <p className="text-[red]">title must be more than 10 char*</p>
              )}
            </div>

            {/* ----------------------------------author--------------------------- */}
            <div>
              <label htmlFor="author" className="sr-only">
                Course Author
              </label>
              <input
                id="author"
                name="author"
                type="text"
                maxLength={20}
                {...register("author", {
                  required: true,
                  minLength: 10,
                })}
                className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Course Author"
              />
              {errors.author && (
                <p className="text-[red]">author must be more than 10 char*</p>
              )}
            </div>
            {/* ----------------------------------price--------------------------- */}
            <div>
              <label htmlFor="price" className="sr-only">
                Course Price
              </label>
              <input
                id="price"
                name="price"
                type="number"
                min={100}
                max={100000}
                {...register("price", {
                  required: true,
                  pattern: [0 - 5],
                })}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Course Price"
              />
              {errors.price && <p className="text-[red]">price is required*</p>}
            </div>

            {/* ----------------------------------rating--------------------------- */}
            <div>
              <label htmlFor="rating" className="sr-only">
                Course Default Rating
              </label>
              <input
                id="rating"
                name="rating"
                type="number"
                min="1"
                max="5"
                {...register("rating", {
                  required: true,
                  pattern: [1 - 5],
                })}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Course Default Rating"
              />
              {errors.rating && (
                <p className="text-[red]">rating is required*</p>
              )}
            </div>
            {/* ----------------------------------image--------------------------- */}
            <div>
              <label htmlFor="img" className="sr-only">
                Course Price
              </label>
              <input
                id="img"
                name="img"
                type="url"
                {...register("img", {
                  required: true,
                })}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Course Image"
              />
              {errors.img && (
                <p className="text-[red]">image url is required*</p>
              )}
            </div>
            {/* ----------------------------------category--------------------------- */}
            <div>
              <label htmlFor="category" className="sr-only">
                Course Category
              </label>
              <select
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Course Category"
                name="category"
                id="category"
                minLength={5}
                {...register("category", {
                  required: true,
                  minLength: 5,
                })}
              >
                <option value="">Course Category</option>
                <option value="development">development</option>
                <option value="design">design</option>
                <option value="business">business</option>
                <option value="it & software">it & software</option>
                <option value="music">music</option>
                <option value="music">music</option>
                <option value="music">music</option>
              </select>
              {errors.category && (
                <p className="text-[red]">please select a valid category*</p>
              )}
            </div>

            {/* -------------------------------------------------------------------------- */}
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-300 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              ADD Course
            </button>
          </div>
        </form>
      </div>
    </>
  );
  // <div>AddCourse</div>;
};
