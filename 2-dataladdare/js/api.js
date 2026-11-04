// api.js: allt som pratar med Open-Meteo. Ingen DOM här.

const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

export const fetchJson = async (url, options) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return await response.json();
};

// Hittas ingen ort saknas fältet results helt i svaret, därav ?? [].
export const searchCities = async (name, signal) => {
  const data = await fetchJson(`${GEO_URL}?name=${encodeURIComponent(name)}&count=8&language=sv`, { signal });
  return (data.results ?? []).map((place) => ({
    id: place.id,
    name: place.name,
    region: place.admin1 ?? '',
    country: place.country ?? '',
    latitude: place.latitude,
    longitude: place.longitude,
  }));
};

export const getWeather = async (latitude, longitude, signal) => {
  const url =
    `${WEATHER_URL}?latitude=${latitude}&longitude=${longitude}` +
    '&current=temperature_2m,wind_speed_10m,weather_code' +
    '&daily=weather_code,temperature_2m_max,temperature_2m_min' +
    '&timezone=Europe%2FStockholm&forecast_days=3';
  const data = await fetchJson(url, { signal });
  return {
    temperature: data.current.temperature_2m,
    wind: data.current.wind_speed_10m,
    code: data.current.weather_code,
    days: data.daily.time.map((date, i) => ({
      date,
      code: data.daily.weather_code[i],
      max: data.daily.temperature_2m_max[i],
      min: data.daily.temperature_2m_min[i],
    })),
  };
};
