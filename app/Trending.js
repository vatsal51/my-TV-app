import "bootstrap/dist/css/bootstrap.css";
import TrendingClient from "./TrendingClient";

async function getTrending(page = 1) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  if (!apiKey) {
    console.warn("TMDB API key is not configured.");
    return [];
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&page=${page}`,
      {
        next: { revalidate: 60 },
      },
    );

    if (!response.ok) {
      console.error("Failed to fetch trending items:", response.status);
      return [];
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching trending items:", error);
    return [];
  }
}

export default async function TrendingPage() {
  const trending = await getTrending(1);

  return <TrendingClient initialItems={trending} />;
}
