// pages/[id]/index.js
"use client"
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'

import Header from "../../Header";
import Footer from "../../Footer";
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.css';
// import { useRouter } from 'next/router';

const TvSeriesDetails = () => {
  // const router = useRouter();
  //  const { pathname } = router.asPath;
  // const id = pathname.split('/').pop();
  // const id = usePathname().split('/').pop();
  const searchParams = useSearchParams()
 
  const id = searchParams.get('id')
  console.log("id is",id)
  // router = router.split('/')[2]
  const [tvSeries, setTvSeries] = useState(null);
const fetchTvSeriesDetails = async () => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=6b99f46cc249aa0e4664f52a5c266bb4`); // Replace with your API endpoint
    const data = await response.json();
    setTvSeries(data);
  } catch (error) {
    console.error('Error fetching TV series details:', error);
  }
};
useEffect(() => {
  if (id) {
    fetchTvSeriesDetails();
  }
}, [id]);
console.log("data",tvSeries)
  if (!tvSeries) {
    return <div>Loading...</div>;
  }

  // Render TV series details, seasons, and episodes here

  return (

    <>
<Header />
<div className="container">
        <div className="row py-5 my-5">
          <div className="col-12 text-center mt-2 mb-4 fs-1 fw-bold text-decoration-underline text-white">
            TV Series seasons and episodes
          </div>
      <h1 className='text-white'>{tvSeries.name}
      </h1>
      <img style={{ maxWidth: "300px" }} src={"https://image.tmdb.org/t/p/w300/"+tvSeries.poster_path} />
      <h5 className='text-primary'>genre:
      <i className='text-white'>
      {tvSeries.genres.map((val)=>
      <> ({val.name}) </> 
      )}
      </i>
      </h5>
      <i className='text-white'>{tvSeries.tagline}</i>
      <p className='text-white'>Overview: {tvSeries.overview} </p>
      {/* Render TV series details */}
      <h2 className='text-white'>Seasons</h2>
  <p className='text-white'>{tvSeries.number_of_seasons}</p>
  <div className='d-flex flex-wrap gap-1'>
  {tvSeries.seasons.map((val,i) => {
return(
  <button className="btn btn-outline-primary" key={i}>{val.name} </button>
);
  }
  ) }
  </div>

  {/* {tvSeries.seasons[0].name} */}
  <h2 className='text-white'>Episodes</h2>
  <p className='text-white'>{tvSeries.number_of_episodes}</p>
  </div>
  </div>
  <Footer />
 </>
)
};

export default TvSeriesDetails;
