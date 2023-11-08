"use client";
import { useEffect } from "react";
import { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { coupons } from "@/utils/products";
import {
  removeFromCart,
  getCartTotal,
  increaseQuantity,
  decreaseQuantity,
  applyCode,
} from "@/redux/features/cartSlice";
// CartButton component
export default function CartButton() {
  const [couponError, setCouponError] = useState(false);
  // State for storing the coupon code
  const [couponCode, setCouponCode] = useState("");

  // Select cart, totalQuantity, and totalPrice from the redux state
  const { cart, totalQuantity, totalPrice, discountedPrice } = useSelector(
    (state: any) => state.allCart
  );
  console.log(coupons.filter((coupon) => coupon.code === couponCode));
  // Function to apply a coupon

  const dispatch = useDispatch();
  function applyCoupon(couponCode: string) {
    const coupon = coupons.filter((coupon) => coupon.code === couponCode);
    console.log(coupon);
    // Check if the coupon code exists in the coupons array
    if (coupons.some((coupon) => coupon.code === couponCode)) {
      // If the coupon exists, dispatch the coupon to the redux state
      dispatch(applyCode(coupon));
    } else {
      // If the coupon doesn't exist, set the couponError state to true
      setCouponError(true);
    }
  }
  const [open, setOpen] = useState(false);
  function toggleOpen() {
    setOpen(!open);
  }
  useEffect(() => {
    dispatch(getCartTotal({}));
  }, [cart, dispatch]);
  return (
    <>
      <div onClick={toggleOpen} className="relative">
        <span className="absolute right-0 -top-2 bg-indigo-600 text-white px-1 text-[12px] rounded-full">
          {cart.length}
        </span>
        <svg
          className="h-8 p-1 hover:text-green-500 duration-200"
          aria-hidden="true"
          focusable="false"
          data-prefix="far"
          data-icon="shopping-cart"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
        >
          <path
            fill="currentColor"
            d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM208 472c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm256 0c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm23.438-200H184.98l-31.31-160h368.548l-34.78 160z"
            className=""
          ></path>
        </svg>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Shopping cart
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {cart.map((product: any) => {
                                if (!product) {
                                  return "Your cart is empty";
                                }
                                return (
                                  <li key={product.id} className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                      <img
                                        src={product.imageSrc}
                                        alt={product.imageAlt}
                                        className="h-full w-full object-cover object-center"
                                      />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                      <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                          <h3>
                                            <a href={product.href}>
                                              {product.name}
                                            </a>
                                          </h3>
                                          <p className="ml-4">
                                            ₹ {product.price}
                                          </p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">
                                          {product.color}
                                        </p>
                                      </div>
                                      <div className="flex flex-1 items-end justify-between text-sm">
                                        <p className="text-gray-500 flex gap-4 items-center">
                                          Qty :
                                          <div className="flex gap-1 items-center">
                                            <button
                                              onClick={() =>
                                                dispatch(
                                                  decreaseQuantity(product)
                                                )
                                              }
                                              className="px-2 py-1 bg-indigo-600 text-white font-extrabold rounded-md"
                                            >
                                              -
                                            </button>
                                            <div className="bg-gray-200 w-8 py-1 text-center rounded-md">
                                              {product.quantity}
                                            </div>

                                            <button
                                              onClick={() =>
                                                dispatch(
                                                  increaseQuantity(product)
                                                )
                                              }
                                              className="px-2 py-1 bg-indigo-600 text-white font-extrabold rounded-md"
                                            >
                                              +
                                            </button>
                                          </div>
                                        </p>

                                        <div className="flex">
                                          <button
                                            onClick={() =>
                                              dispatch(removeFromCart(product))
                                            }
                                            type="button"
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                          >
                                            Remove
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex gap-4 justify-between text-base font-medium text-gray-900">
                          <div className="flex flex-col w-full">
                            <input
                              onChange={(e) => setCouponCode(e.target.value)}
                              className="bg-gray-100 px-2 h-10 w-full mb-2 rounded-md border-2 border-gray-300 placeholder:text-center"
                              type="text"
                              placeholder="Coupon Code"
                            />
                            {couponError && (
                              <div className="flex justify-between items-center px-4 transition-opacity  w-full text-sm bg-red-400 rounded-md text-white text-center">
                                Invalid coupon code
                                <button
                                  type="button"
                                  className="relative -m-2 p-2 text-white hover:text-gray-500"
                                  onClick={() => setCouponError(false)}
                                >
                                  <span className="absolute -inset-0.5" />
                                  <span className="sr-only">Close panel</span>
                                  <XMarkIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                  />
                                </button>
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => applyCoupon(couponCode)}
                            className="h-10 px-5 text-white rounded-md py-2.5 bg-indigo-600"
                          >
                            Apply
                          </button>
                        </div>

                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>₹ {totalPrice}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <a
                            href="#"
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          >
                            Checkout
                          </a>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
