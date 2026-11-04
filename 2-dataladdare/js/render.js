// render.js: skapar element. Ingen fetch här.
import { describeWeather } from './weather-codes.js';

export const setStatus = (element, text, isError = false) => {
  element.textContent = text;
  element.classList.toggle('error', isError);
};

const element = (tag, text, className) => {
  const el = document.createElement(tag);
  if (text !== undefined) el.textContent = text;
  if (className) el.className = className;
  return el;
};

const round = (value) => Math.round(value);

export const renderCities = (list, cities, onSelect) => {
  list.replaceChildren(
    ...cities.map((city) => {
      const li = document.createElement('li');
      const button = element('button', [city.name, city.region, city.country].filter(Boolean).join(', '));
      button.type = 'button';
      button.addEventListener('click', () => onSelect(city));
      li.append(button);
      return li;
    }),
  );
};

// Del 2, steg 2–3: prognosen visar bara veckodagen. Vi vill ha "torsdag 19 november".
// Det finns ett bibliotek för datum: date-fns.
// TODO: öppna terminalen i 2-dataladdare och kör:
//         npm init -y
//         npm install date-fns
//       Titta i package.json och i mappen node_modules. Vad har hänt?
// TODO: lägg till överst i filen:
//         import { format } from 'date-fns';
//         import { sv } from 'date-fns/locale';
//       och skriv om weekday till format(new Date(date), 'EEEE d MMMM', { locale: sv }).
//       Ladda om sidan. Vilket fel får du i konsolen, och varför?
const weekday = (date) => new Date(date).toLocaleDateString('sv-SE', { weekday: 'long' });

export const renderWeather = (container, city, weather) => {
  const card = element('div', undefined, 'card');
  const days = element('ul', undefined, 'days');
  days.append(
    ...weather.days.map((day) =>
      element('li', `${weekday(day.date)}: ${describeWeather(day.code)}, ${round(day.min)}–${round(day.max)} °C`),
    ),
  );
  card.append(
    element('h3', city.name),
    element('p', `${round(weather.temperature)} °C`, 'temp'),
    element('p', `${describeWeather(weather.code)}, vind ${round(weather.wind)} km/h`),
    days,
  );
  container.replaceChildren(card);
};

export const renderFavorite = (city, weather) => {
  const li = element('li', undefined, 'card');
  li.append(
    element('h3', city.name),
    element('p', `${round(weather.temperature)} °C`, 'temp'),
    element('p', describeWeather(weather.code)),
  );
  return li;
};

export const renderFavoriteError = (city) => {
  const li = element('li', undefined, 'card');
  li.append(element('h3', city.name), element('p', 'Vädret kunde inte hämtas.', 'status error'));
  return li;
};
