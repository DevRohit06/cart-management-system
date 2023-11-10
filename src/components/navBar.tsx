"use client";
import { useState } from "react";
import CartButton from "./cart";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cartSlice";
import useAxios from "@/hook/useAxios";
export default function NavBar() {
  const {response } = useAxios("products");
  const items = response || [];
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  console.log(items);
  const searchItem = items.filter((item: any) => {
    return item.title.toLowerCase().includes(search.toLowerCase());
  });

  function toggleCart() {
    setOpen(!open);
  }
  return (
    <>
      <div className="relative z-20">
        <header className="header py-4 sticky top-0 bg-white shadow-md flex items-center justify-between px-8 py-02">
          <h1 className="w-3/12 text-2xl font-extrabold">
            <a href="">Test Store</a>
          </h1>

          <div className="w-3/12 flex items-center justify-end">
            <div className="">
              <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
                <div className="">
                  <div className="w-full px-2">
                    <div className="relative">
                      <div className="absolute text-gray-400 top-4 left-4 ">
                        <svg
                          viewBox="0 0 24 24"
                          height="1em"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                              stroke="#000000"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>{" "}
                          </g>
                        </svg>
                      </div>
                      <input
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        className="bg-white border-2 border-gray-300 h-12 w-full px-12 rounded-lg focus:outline-none hover:cursor-pointer"
                        placeholder="Search"
                        name=""
                      />
                      <span className="absolute top-4 right-5 border-l pl-4">
                        <i className="fa fa-microphone text-gray-500 hover:text-green-500 hover:cursor-pointer"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <CartButton />
          </div>
        </header>
        {search && (
          <div className="absolute  w-[305px] rounded-xl overflow-x-hidden bg-gray-200 right-20 h-96 overflow-scroll">
            {searchItem.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className="z-50 flex items-center justify-between px-4 py-2 border-b border-gray-700"
                >
                  <div className="flex items-center gap-4">
                    <img className="w-10 h-10" src={item.image} alt="" />
                    <div>
                      <h1 className="text-black font-semibold">{item.title}</h1>
                      <h1 className="text-gray-800">₹{item.price}</h1>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => dispatch(addToCart(item))}
                      className="text-white bg-indigo-600 px-3 py-2 rounded-md text-xl"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
