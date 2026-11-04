// Hämtar data. Vet ingenting om DOM:en.
const BASE_URL = 'https://api.tvmaze.com';

export async function searchShows(query) {
  const response = await fetch(`${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error(`Något gick fel: ${response.status}`);
  }
  const data = await response.json();
  return data.map((result) => result.show);
}
