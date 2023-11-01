"use client"
import {useState} from "react"
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.css';
import Header from './Header';
import Footer from './Footer';
import Trending from './Trending';

export default function Home() {
  const [navstate,setNavstate] = useState(1);
  return (
    <>
      <Header />
      <Trending />    
      <Footer navstate={navstate}  setNavstate={setNavstate} />
  </>
  )
}
