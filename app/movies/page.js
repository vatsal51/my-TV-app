import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import Genre from "../Genre";

async function getMovies(page = 1) {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&include_adult=false&language=en-US&sort_by=popularity.desc&page=${page}`,
    {
      next: { revalidate: 60 },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await response.json();
  return data.results || [];
}

export default async function MoviePage() {
  const movies = await getMovies(1);

  return (
    <div className="container">
      <div className="row py-5 my-5">
        <div className="col-12 text-center mt-2 mb-4 fs-1 fw-bold text-decoration-underline text-white">
          Movies
        </div>
        <Genre type="movie" initialItems={movies} href="/details" />
      </div>
    </div>
  );
}
