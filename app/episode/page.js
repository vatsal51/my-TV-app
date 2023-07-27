"use client"
import React, { useState, useEffect } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.css';
import Footer from "../Footer";
import Header from "../Header";

const episode = () => {
    const [season, setSeason] = useState([])
    const [series, setSeries] = useState({});
    const [pageType, setPageType] = useState([])
    const fetchSeasons = async (page_type) => {
        var queryString = window.location.search;

        var urlParams = new URLSearchParams(queryString);

        var page_type = urlParams.get('seriesId')
        setPageType(page_type);

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Yjk5ZjQ2Y2MyNDlhYTBlNDY2NGY1MmE1YzI2NmJiNCIsInN1YiI6IjY0YjUwMTUxMGJiMDc2MDEwYzUxYjlkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qokngI47zKfAwOP8U09nsRiZ2BFrx_ywMIKZWh67wHA'
            }
        };

        fetch(`https://api.themoviedb.org/3/${media - type}/${page_type}`, options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setSeries(response)

            })
            .catch(err => console.error(err));

        //     const data = await fetch(`
        //     https://api.themoviedb.org/3/tv/${page_type}?api_key=6b99f46cc249aa0e4664f52a5c266bb4&include_adult=false&language=en-US`);
        // //     // https://api.themoviedb.org/3/discover/tv?api_key=3d820eab8fd533d2fd7e1514e86292ea&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreURL}`);
        // const dataJ = await data.json();
        // console.log(data)
        //     setSeason(dataJ);
    }
    useEffect(() => {
        fetchSeasons(pageType)
    }, [pageType]);
    console.log(series)

    return (
        <>
            <Header />
            <div className="container">
                <div className="row py-5 my-5">
                    <div className="col-12 text-center mt-2 mb-4 fs-1 fw-bold text-decoration-underline text-white">


                        <h1>SEASON
                            {series ? series.number_of_seasons : ""}
                        </h1>

                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}
export default episode;