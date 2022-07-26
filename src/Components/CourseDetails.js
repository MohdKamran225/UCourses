import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const Course = ({ match }) => {
  const history = useHistory();

  const [course, setCourse] = useState({});
  const url = `http://localhost:4000/courses/${match.params.id}`;
  const cartUrl = "http://localhost:4000/cart";

  useEffect(() => {
    axios.get(url).then((res) => {
      setCourse(res.data);
    });
  }, [url]);

  const setCart = () => {
    console.log("hello");
    const user = JSON.parse(localStorage.getItem("USER"));
    console.log(user);
    const cart = {
      course,
      user,
    };
    console.log(cart);
    axios
      .post(cartUrl, cart)
      .then((res) => {
        console.log(res);
        history.push("/cart");
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  return (
    <div>
      <div
        key={course.id}
        className="flex justify-around w-[80%] mx-auto my-10 "
      >
        <section className="w-[50%] border-r border-[#22394D] pr-5">
          <img
            src={course.img}
            alt={course.title}
            className="rounded-md w-2/3"
          />
          <p className="text-xl my-4">Description :</p>
          <p className="font-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
            aperiam cupiditate fuga corrupti odio provident rem, placeat quam
            necessitatibus aliquid nemo asperiores voluptas voluptates fugiat
            expedita libero accusamus esse molestias repudiandae magnam. Nulla,
            provident vero.
          </p>
        </section>
        <section className="w-[50%] border-l border-[#22394D] pl-5">
          <div className="flex justify-between">
            <p className="text-lg font-medium text-white bg-[#00B777]  hover:bg-[#7ddfbc] w-1/6 p-3 rounded-md">
              &#x20B9;{course.price}
            </p>
            <button
              className="text-lg font-medium text-white bg-[#7325A3] hover:bg-[#85629b] w-1/6 p-3 rounded-md"
              onClick={setCart}
            >
              + Cart
            </button>
          </div>
          <div className="flex items-center mt-4">
            {[...Array(course.rating)].map((_res, index) => {
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
          <div className="mt-4  ">
            <h3 className="text-xl font-medium text-[#22394D]">
              <span aria-hidden="true" className="" />
              {course.title}
            </h3>
            <p className="text-sm text-[#22394D]">{course.author}</p>
          </div>
          <p className="text-xl">Features :</p>
          <ul className="font-light">
            <li>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione
              sit nostrum numquam eligendi quae, nemo cum, minus reprehenderit
              illum dicta consequatur error eius quo dolor non in repellendus
              repellat animi.
            </li>
            <li>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione
              sit nostrum numquam eligendi quae, nemo cum, minus reprehenderit
              illum dicta consequatur error eius quo dolor non in repellendus
              repellat animi.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};
