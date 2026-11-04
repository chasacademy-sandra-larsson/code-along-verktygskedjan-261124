// Del 2: Dataladdaren, utan verktyg
import { searchShows } from './api.js';
import { renderShow } from './render.js';

const form = document.querySelector('#search-form');
const status = document.querySelector('#status');
const results = document.querySelector('#results');

async function load(query) {
  status.textContent = 'Laddar …';
  results.replaceChildren();
  try {
    const shows = await searchShows(query);
    status.textContent = shows.length ? `${shows.length} serier` : 'Inga träffar';
    results.append(...shows.map(renderShow));
  } catch (error) {
    status.textContent = error.message;
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  load(form.query.value);
});

load(form.query.value);

// 1. Appen fungerar med Live Server. Kolla att du ser sökresultatet.

// 2. Premiärdatumet visas som 2013-03-12. Vi vill ha "12 mars 2013".
//    Det finns ett bibliotek för det: date-fns.
// TODO: öppna terminalen i 2-dataladdare och kör:
//         npm init -y
//         npm install date-fns
//       Titta i package.json och i mappen node_modules. Vad har hänt?

// 3. TODO: lägg till överst i render.js:
//         import { format } from 'date-fns';
//       Ladda om sidan. Vilket fel får du i konsolen, och varför?
//       Webbläsaren vet inte var 'date-fns' finns. Det är det problemet en bundler som Vite löser.
