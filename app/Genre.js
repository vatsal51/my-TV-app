"use client";

import React, { useEffect, useMemo, useState } from "react";
import CardLayout from "./CardLayout";
import Pagination from "./pagination";

const Genre = ({ type, initialItems = [], href = "/details" }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(initialItems);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await fetch(
          `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`,
        );
        const { genres: fetchedGenres } = await data.json();
        setGenres(fetchedGenres || []);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, [type]);

  useEffect(() => {
    if (page === 1 && !selectedGenres.length && initialItems?.length) {
      setItems(initialItems);
      return;
    }

    let isActive = true;
    const controller = new AbortController();

    const fetchItems = async () => {
      setIsLoading(true);
      try {
        const genreParam = selectedGenres.length
          ? `&with_genres=${selectedGenres.map((genre) => genre.id).join(",")}`
          : "";

        const response = await fetch(
          `https://api.themoviedb.org/3/discover/${type}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&include_adult=false&language=en-US&sort_by=popularity.desc&page=${page}${genreParam}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch ${type} items`);
        }

        const data = await response.json();

        if (isActive) {
          setItems(data.results || []);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching items:", error);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    fetchItems();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [page, selectedGenres, type, initialItems]);

  const filteredItems = useMemo(() => {
    if (!selectedGenres.length) {
      return items;
    }

    return items.filter((item) =>
      selectedGenres.some((genre) => item.genre_ids?.includes(genre.id)),
    );
  }, [items, selectedGenres]);

  const handleGenreClick = (clickedGenre) => {
    setPage(1);

    setSelectedGenres((prevGenres) => {
      const isSelected = prevGenres.some((g) => g.id === clickedGenre.id);

      return isSelected
        ? prevGenres.filter((g) => g.id !== clickedGenre.id)
        : [...prevGenres, clickedGenre];
    });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row mb-3">
          <div className="col-12 d-flex flex-wrap">
            {genres &&
              genres.length > 0 &&
              genres.map((genre) => (
                <div className="m-2" key={genre.id}>
                  <button
                    className={`bg-dark text-white px-4 py-2 text-center button ${
                      selectedGenres.some((g) => g.id === genre.id)
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => handleGenreClick(genre)}
                  >
                    {genre.name}
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="text-white text-center my-3">Loading...</div>
      ) : filteredItems?.length > 0 ? (
        <div className="card-container row">
          <CardLayout state={filteredItems} href={href} type={type} />
        </div>
      ) : (
        <div className="text-white text-center my-3">
          No items match the selected genres.
        </div>
      )}

      <Pagination page={page} onPageChange={setPage} />
    </>
  );
};

export default Genre;
