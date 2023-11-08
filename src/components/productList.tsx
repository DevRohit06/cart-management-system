"use client";
import { addToCart } from "@/redux/features/cartSlice";
import { useSelector, useDispatch } from "react-redux";
export default function ProductList() {
  const products = useSelector((state: any) => state.allCart.items);
  const cartProducts = useSelector((state: any) => state.allCart.cart);
  const dispatch = useDispatch();

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-8 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Customers also purchased
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product: any, index: number) => {
              function checkProduct() {
                let result = cartProducts.some((item: any) => {
                  return item.id === product.id;
                })
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
                      onClick={() => dispatch(addToCart(product))}
                      className="w-full mt-1 py-2 text-center font-semibold text-white bg-gray-900 rounded-xl"
                    >
                      <h1>Add to cart</h1>
                    </button>
                  );
                }
              }
              return (
                <div key={index}>
                  <div key={product.id} className="group relative">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <a href={product.href}>
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {product.name}
                          </a>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.color}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
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
