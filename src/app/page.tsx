"use client";
import Banner from "@/components/announcement";
import Image from "next/image";
import NavBar from "@/components/navBar";
import ProductList from "@/components/productList";
import useAxios from "@/hook/useAxios";
export default function Home() {
  const { response } = useAxios("products");
  function loading() {
    if (!response) {
      return (
        <>
          <div className="flex  justify-center items-center  mt-64 w-[100%]">
            <div className="loader"></div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <Banner />
          <NavBar />
          <ProductList />
        </>
      );
    }
  }
  return (
    <>
      <main className="relative w-full h-full">
        {loading()}
      </main>
    </>
  );
}
