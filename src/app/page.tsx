"use client"
import Image from 'next/image'
import NavBar from '@/components/navBar'
import ProductList from '@/components/productList'
export default function Home() {
  return (
    <main>
      <NavBar/>
      <ProductList/>
    </main>
  )
}
