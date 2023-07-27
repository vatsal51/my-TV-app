"use client"
import Image from 'next/image'
import styles from './page.module.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.css';
import Header from './Header';
import Footer from './Footer';
import Trending from './Trending';
import { useEffect } from 'react';
export default function Home() {
  // useEffect(()=>{
  //   import("bootstrap/dist/js/bootstrap");
  // },[])
  return (
    <>
    {/* <BrowserRouter> */}
      <Header />
      <Trending />
            {/* <Routes>
        <Route path="/" element={<Trending />} exact />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv" element={<TV />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<Error />} />
      </Routes> */}
      <Footer />
    {/* </BrowserRouter> */}
  </>

  )
}
