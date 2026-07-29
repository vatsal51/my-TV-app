import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import Genre from "../Genre";

export const revalidate = 300;

async function getTvSeries(page = 1) {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&include_adult=false&language=en-US&sort_by=popularity.desc&page=${page}`,
    {
      next: { revalidate: 300 },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch TV series");
  }

  const data = await response.json();
  return data.results || [];
}

export default async function TVPage() {
  const tvSeries = await getTvSeries(1);
  const genresResponse = await fetch(
    `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`,
    {
      next: { revalidate: 300 },
    },
  );
  const { genres = [] } = genresResponse.ok ? await genresResponse.json() : {};

  return (
    <div className="container">
      <div className="row py-5 my-5">
        <div className="col-12 text-center mt-2 mb-4 fs-1 fw-bold text-decoration-underline text-white">
          TV Series
        </div>
        <Genre
          type="tv"
          initialItems={tvSeries}
          initialGenres={genres}
          href="/details"
        />
      </div>
    </div>
  );
}
