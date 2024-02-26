import React, { useEffect } from "react";

const Genre = ({ genre, setGenre, setPage, type, value, setValue }) => {
  const fetchGenre = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=6b99f46cc249aa0e4664f52a5c266bb4&language=en-US`
    );
    const { genres } = await data.json();

    setGenre(genres);
  };

  useEffect(() => {
    fetchGenre();
  }, []);

  //Adding a particular genre to the selected array
  const CategoryAdd = (genres) => {
    setValue([...value, genres]);
    //removing those genres from the non selected array that have been added to the selected array.
    setGenre(genre.filter((g) => g.id !== genres.id));
    setPage(1);
  };

  //removing a perticular genre from the selected array
  const CategoryRemove = (genres) => {
    setValue(value.filter((g) => g.id !== genres.id));
    setGenre([...genre, genres]);
    setPage(1);
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row mb-3">
          <div className="col-12 d-flex flex-wrap">
            {value && //if value exist
              value.map((Val) => {
                const { id, name } = Val;
                return (
                  <>
                    <div className="m-2" key={name}>
                      <button
                        className=" text-white px-4 py-2 text-center buttons"
                        onClick={() => CategoryRemove(Val)}
                      >
                        {name}
                      </button>
                    </div>
                  </>
                );
              })}

            {genre && //if genre exist
              genre.map((Gen) => {
                const { id, name } = Gen;
                return (
                  <div className="m-2" key={id}>
                    <button
                      className="bg-dark text-white px-4 py-2 text-center button"
                      onClick={() => CategoryAdd(Gen)}
                    >
                      {name}
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Genre;
