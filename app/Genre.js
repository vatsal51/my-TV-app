import React, { useEffect, useState } from "react";

const Genre = ({ genres, setGenre, setPage, type, updateSelectedGenres }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await fetch(
          `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
        );
        const { genres: fetchedGenres } = await data.json();
        setGenre(fetchedGenres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, [type, setGenre]);

  const handleGenreClick = (clickedGenre) => {
    setSelectedGenres((prevGenres) => {
      const isSelected = prevGenres.some((g) => g.id === clickedGenre.id);

      return isSelected
        ? prevGenres.filter((g) => g.id !== clickedGenre.id)
        : [...prevGenres, clickedGenre];
    });

    setPage(1);

    updateSelectedGenres((prevSelectedGenres) => {
      const isSelected = prevSelectedGenres.some(
        (g) => g.id === clickedGenre.id
      );

      return isSelected
        ? prevSelectedGenres.filter((g) => g.id !== clickedGenre.id)
        : [...prevSelectedGenres, clickedGenre];
    });
  };

  return (
    <div className="container-fluid">
      <div className="row mb-3">
        <div className="col-12 d-flex flex-wrap">
          {genres &&
            genres.length > 0 &&
            genres.map((genre) => (
              <div className="m-2" key={genre.id}>
                <button
                  className={`bg-dark text-white px-4 py-2 text-center button ${
                    selectedGenres &&
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
  );
};

export default Genre;
