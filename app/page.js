"use client"
import {useState} from "react"
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.css';
import Search from "./search/page";
import Trending from './Trending';
import Movie from "./movies/page";
import TV from "./tv/page";
export default function Home() {
  const [navstate,setNavstate] = useState(1);
  let contentComponent;

  switch (navstate) {
    case 1:
      contentComponent = <Trending />
    case 2:
      contentComponent = <Movie />;
      break;
    case 3:
      contentComponent = <TV />;
      break;
    case 4:
      contentComponent = <Search />;
      break;
    default:
      contentComponent = <Trending />;
  }

  return (
    <>
      {contentComponent} 
  </>
  )
}
