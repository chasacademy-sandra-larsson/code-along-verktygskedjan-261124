// main.js: hämtar elementen, kopplar ihop api.js och render.js, och håller reda på läget.
import { searchCities, getWeather } from './api.js';
import { setStatus, renderCities, renderWeather, renderFavorite, renderFavoriteError } from './render.js';

const form = document.querySelector('#search-form');
const input = document.querySelector('#search');
const searchStatus = document.querySelector('#search-status');
const cityList = document.querySelector('#cities');
const weatherSection = document.querySelector('#weather-section');
const weatherStatus = document.querySelector('#weather-status');
const weatherContainer = document.querySelector('#weather');
const favoriteList = document.querySelector('#favorites');

const FAVORITES = [
  { name: 'Stockholm', latitude: 59.33, longitude: 18.07 },
  { name: 'Göteborg', latitude: 57.71, longitude: 11.97 },
  { name: 'Malmö', latitude: 55.61, longitude: 13.0 },
];

// Steg 6: en ny sökning avbryter den förra
let searchController = null;

// Steg 3: sök
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = input.value.trim();
  if (!name) return;

  searchController?.abort();
  searchController = new AbortController();

  setStatus(searchStatus, 'Söker...');
  cityList.replaceChildren();
  try {
    const cities = await searchCities(name, searchController.signal);
    if (cities.length === 0) {
      setStatus(searchStatus, `Hittade ingen ort som heter ${name}.`);
      return;
    }
    setStatus(searchStatus, `${cities.length} träffar. Välj en ort.`);
    renderCities(cityList, cities, showWeather);
  } catch (error) {
    if (error.name === 'AbortError') return; // en nyare sökning har tagit över
    setStatus(searchStatus, 'Något gick fel, försök igen.', true);
  }
});

// Steg 4: visa vädret för en ort, med timeout (steg 6)
const showWeather = async (city) => {
  weatherSection.hidden = false;
  weatherContainer.replaceChildren();
  setStatus(weatherStatus, `Hämtar vädret för ${city.name}...`);
  try {
    const weather = await getWeather(city.latitude, city.longitude, AbortSignal.timeout(5000));
    setStatus(weatherStatus, '');
    renderWeather(weatherContainer, city, weather);
  } catch (error) {
    const message =
      error.name === 'TimeoutError' ? 'Vädertjänsten svarar inte just nu.' : 'Vädret kunde inte hämtas.';
    setStatus(weatherStatus, message, true);
  }
};

// Steg 5: favoriterna hämtas samtidigt. allSettled gör att en ort som inte svarar
// inte tar med sig de andra.
const loadFavorites = async () => {
  const results = await Promise.allSettled(
    FAVORITES.map((city) => getWeather(city.latitude, city.longitude, AbortSignal.timeout(5000))),
  );
  favoriteList.replaceChildren(
    ...results.map((result, i) =>
      result.status === 'fulfilled' ? renderFavorite(FAVORITES[i], result.value) : renderFavoriteError(FAVORITES[i]),
    ),
  );
};
loadFavorites();
