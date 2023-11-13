"use client";
import useAxios from "@/hook/useAxios";
import { addToCart } from "@/redux/features/cartSlice";
import { useSelector, useDispatch } from "react-redux";
export default function ProductList() {
  const cartProducts = useSelector((state: any) => state.allCart.cart);
  const dispatch = useDispatch();
  const { response } = useAxios("products");

  const products: [] = response || [];
  function loading() {
    if (!response) {
      return (
        <>
            <div className="w-full h-96 flex justify-center items-center  ">
              <div className="loader"></div>
            </div>
        </>
      );
    } else {
      return (
        <>
          <div className="relative bg-white">
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-8 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Customers also purchased
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 h-full">
                {products.map((product: any, index: number) => {
                  function checkProduct() {
                    let result = cartProducts.some((item: any) => {
                      return item.id === product.id;
                    });
                    if (result) {
                      return (
                        <button
                          disabled
                          className="w-full mt-1 py-2 text-center font-semibold text-white bg-gray-900/80 rounded-xl"
                        >
                          <h1>Added to cart</h1>
                        </button>
                      );
                    } else {
                      return (
                        <button
                          onClick={() =>
                            dispatch(addToCart({ ...product, quantity: 1 }))
                          }
                          className="w-full mt-1 py-2 text-center font-semibold text-white bg-gray-900 rounded-xl"
                        >
                          <h1>Add to cart</h1>
                        </button>
                      );
                    }
                  }
                  return (
                    <div key={index} className=" flex flex-col justify-between">
                      <div key={product.id} className=" relative ">
                        <div className="w-auto flex justify-center overflow-hidden rounded-md  h-56">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="h-full "
                          />
                        </div>
                        <div className="mt-4 justify-between">
                          <div>
                            <h3 className="text-sm text-gray-700">
                              <a href="">
                                <span
                                  aria-hidden="true"
                                  className="absolute inset-0"
                                />
                                {product.title}
                              </a>
                            </h3>
                          </div>
                          <p className="text-xl  font-medium text-gray-900">
                            ₹ {product.price}
                          </p>
                        </div>
                      </div>

                      {checkProduct()}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      );
    }
  }
  return <>
  <div>
    {loading()}
  </div>
  </>;
}
