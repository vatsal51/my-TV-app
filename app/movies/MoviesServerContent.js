import CardLayout from "../CardLayout";
import Pagination from "../pagination";
import Genre from "../Genre";

export default function MoviesServerContent({
  items,
  page,
  type,
  selectedGenres,
}) {
  return (
    <>
      <div className="container">
        <div className="row py-5 my-5">
          <div className="col-12 text-center mt-2 mb-4 fs-1 fw-bold text-decoration-underline text-white">
            Movies
          </div>
          <Genre
            genres={[]}
            setGenre={() => {}}
            setPage={() => {}}
            type="movie"
            selectedGenres={selectedGenres}
            updateSelectedGenres={() => {}}
          />
          <CardLayout state={items} href="/details" type="movie" />
          <Pagination page={page} setPage={() => {}} />
        </div>
      </div>
    </>
  );
}
