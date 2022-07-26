// import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

// ----------------------------
export const Registeration = () => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const url = "http://localhost:4000/users";
  const onSubmit = (data) => {
    console.log(data);
    axios.post(url, data).then((res) => {
      console.log(res.data);
      alert("signup Successfull");
      history.push("/login");
    });
  };

  // const [person, setPerson] = useState({
  //   username: "",
  //   password: "",
  //   email: "",
  // });
  // const handleChange = (e) => {
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   setPerson({ ...person, [name]: value });
  // };

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   if (person.username && person.password && person.email) {
  //     await axios.post(url, person).then((res) => {
  //       console.log(res.data);
  //       alert("signup Successfull");
  //       history.push("/login");
  //     });
  //     setPerson({
  //       username: "",
  //       password: "",
  //       email: "",
  //     });
  //   } else {
  //     alert("fill all field");
  //   }
  // }

  return (
    <>
      <div className="border bg-white rounded-md mx-auto my-10  w-[40%] h-[82%]">
        <div className="flex justify-center items-center text-black m-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Icon_Atom.svg/615px-Icon_Atom.svg.png"
            alt=""
            className="h-4 w-4"
          />
          <p className="px-2 text-lg">UCourses</p>
          <p className="border-l border-black px-2 text-sm">
            Now learn from anywhere
          </p>
        </div>
        <div className="flex justify-center text-black">
          <p className="text-[30px]">Sign Up</p>
        </div>
        {/* --------------------------form-start-------------------------------------- */}
        <div className="p-5 flex flex-col h-[80%] shadow-lg">
          <form className="h-[80%]" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col my-4">
              <label htmlFor="username">Username *</label>
              <input
                type="text"
                maxLength={10}
                name="username"
                id="username"
                {...register("username", {
                  required: true,
                  minLength: 8,
                  maxLength: 15,
                })}
                className="p-2 border border-black rounded-md"
              />
              {errors.username && (
                <p className="text-[red]">
                  username must be 8 to 15 character long*
                </p>
              )}
            </div>
            <div className="flex flex-col my-4">
              <label htmlFor="email">email *</label>
              <input
                type="email"
                name="email"
                id="email"
                className="p-2 border border-black rounded-md"
                {...register("email", {
                  required: true,
                  pattern: /\S+@\S+\.\S+/,
                })}
              />
              {errors.email && <p className="text-[red]">email not valid*</p>}
            </div>
            <div className="flex flex-col my-4">
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                name="password"
                id="password"
                className="p-2 border border-black rounded-md"
                {...register("password", {
                  required: true,
                  minLength: 10,
                  maxLength: 20,
                })}
              />
              {errors.password && (
                <p className="text-[red]">
                  password should be more than 10 to 20 character long*
                </p>
              )}
            </div>
            <div className="flex flex-col items-center mt-10">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-300 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
        {/* --------------------------------form-end------------------------ */}
      </div>
    </>
  );
};
