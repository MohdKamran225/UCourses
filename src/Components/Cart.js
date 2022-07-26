import React, { useEffect, useState } from "react";
import axios from "axios";
export const Cart = () => {
  const [allCart, setAllCart] = useState([]);
  const [userCart, setUserCart] = useState([]);
  const [user, setUser] = useState({});
  const cartUrl = "http://localhost:4000/cart";

  useEffect(() => {
    const getUser = JSON.parse(localStorage.getItem("USER"));
    setUser(getUser);
  }, []);

  useEffect(() => {
    axios
      .get(cartUrl)
      .then((res) => {
        setAllCart(res.data);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [cartUrl]);

  useEffect(() => {
    const filterCart = allCart.filter((res) => {
      return res.user.email === user.email;
    });
    setUserCart(filterCart);
  }, [allCart, user.email]);

  const removeCourses = (e) => {
    e.preventDefault();
    const deleteUrl = `http://localhost:4000/cart/${e.target.value}`;
    axios.delete(deleteUrl);
  };

  return (
    <>
      <div className="mx-auto my-4 w-[95%] p-5 border border-[#22394d25] rounded-md">
        <p className="font-bold text-4xl  text-[#22394d] p-4 border border-b-[#22394d42]">
          Shopping Cart
        </p>
        <div className="flex p-4">
          <div className="w-[60%] border border-r-[#22394d42]">
            {userCart.map((res) => {
              return (
                <div
                  key={res.id}
                  className="flex justify-start gap-3 p-4 border border-b-[#22394d42]"
                >
                  <img
                    src={res.course.img}
                    alt={res.course.title}
                    className="rounded-md w-1/4"
                  />
                  <div className="flex justify-between items-baseline gap-3">
                    <div>
                      <p className="text-sm font-medium text-[#22394d]">
                        {res.course.title}
                      </p>
                      <p className="text-sm font-medium  text-[#00B777]">
                        ${res.course.price}
                      </p>
                    </div>
                    <div>
                      <button
                        className="rounded-xl text-orange-600 hover:text-orange-300"
                        value={res.id}
                        onClick={removeCourses}
                      >
                        remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-[40%] ">
            <div className="flex justify-center item-center">
              <div className="w-[100%] p-4 flex flex-col gap-2">
                <p className="font-medium text-[#22394d]">Order Summary</p>
                <div className="flex justify-between">
                  <p className="font-light">Subtotal</p>
                  <p className=" text-[#00B777]">$ 200</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-light">taxes</p>
                  <p className=" text-[#00B777]">$ 200</p>
                </div>
                <div className="flex justify-between">
                  <p>Order total</p>
                  <p className=" text-[#00B777]">$ 400</p>
                </div>
                <button className="w-[100%]  bg-orange-600 hover:bg-orange-300 rounded-md text-white p-2">
                  CheckOut
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
