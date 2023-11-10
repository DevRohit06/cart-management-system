"use client"
import Banner from '@/components/announcement'
import Image from 'next/image'
import NavBar from '@/components/navBar'
import ProductList from '@/components/productList'
import useAxios from '@/hook/useAxios'
export default function Home() {
  const { response } = useAxios("products");
  if(!response) return <div>Loading...</div>
  return (
    <main>
      <Banner/>
      <NavBar/>
      <ProductList/>
    </main>
  )
}
