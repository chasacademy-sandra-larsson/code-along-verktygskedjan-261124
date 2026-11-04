# Verktygskedjan: Node, npm, Vite, ESLint och Prettier

Code-along i tre delar. Vi tar en app som redan fungerar, väderappen från workshoppen i v47, och flyttar in den i ett riktigt projekt: med npm för paketen, Vite som utvecklingsserver och bundler, ESLint som hittar fel och Prettier som formaterar. Det är samma uppsättning som ni använder i TypeScript-veckorna, i u06 och i projektet.

Du behöver Node.js 20.19 eller senare. Kolla med `node -v`.

## Del 1: Node.js

`1-node/hello.js`. Kör med `node hello.js` i terminalen.

1. JavaScript utan webbläsare.
2. Node har inte `document` eller `window`.
3. Node har `process`, som webbläsaren inte har.
4. `fetch` finns i båda.

## Del 2: Väderappen, utan verktyg

`2-dataladdare/`, väderappen mot Open-Meteo från workshoppen i v47. Du kan också använda din egen. Starta med Live Server.

1. Appen fungerar: ES-moduler, `fetch`, `async`/`await`, `Promise.allSettled` och `AbortController`.
2. Prognosen visar bara veckodagen. `npm init -y` och `npm install date-fns`. Vad hamnar i `package.json`, `package-lock.json` och `node_modules`?
3. `import { format } from 'date-fns'` i `render.js`, i webbläsaren. Varför fungerar det inte?

## Del 3: Samma app i Vite

Skapa projektet bredvid de andra delarna:

```bash
npm create vite@latest 3-vite
```

Välj **Vanilla** och **JavaScript**. Svara nej på frågan om att installera och starta direkt, så att du ser varje steg.

```bash
cd 3-vite
npm install
npm run dev
```

1. **Titta runt.** `index.html` ligger i roten, koden i `src/`. Vad står i `scripts` i `package.json`?
2. **Flytta in appen.** Kopiera `api.js`, `render.js`, `main.js` och `weather-codes.js` till `src/`, och CSS:en till `src/style.css`. Lägg `import './style.css';` överst i `main.js`, och byt `<body>` i `index.html` mot väderappens. Ta bort `counter.js` och det du inte behöver.
3. **date-fns, nu på riktigt.** `npm install date-fns` och `import { format } from 'date-fns'` i `render.js`. Fungerar det nu? Visa prognosens dagar som "torsdag 19 november" med `format(new Date(date), 'EEEE d MMMM', { locale: sv })` och `sv` från `date-fns/locale`.
4. **Bygg.** `npm run build` och sedan `npm run preview`. Vad finns i `dist/`, och vad har hänt med filnamnen?
5. **ESLint.**
   ```bash
   npm install -D eslint @eslint/js globals
   ```
   Skapa `eslint.config.js` (se nedan) och lägg till `"lint": "eslint ."` i `scripts`. Kör `npm run lint`. Lägg in en oanvänd variabel och en variabel som inte finns, och kör igen.
6. **Prettier.**
   ```bash
   npm install -D prettier eslint-config-prettier
   ```
   Skapa `.prettierrc` och lägg till `"format": "prettier --write ."` och `"format:check": "prettier --check ."`. Kör `npm run format`. Ställ in **Format on Save** i VS Code med tillägget Prettier.
7. **Ett skript för allt.** Lägg till `"check": "npm run lint && npm run format:check"`.
8. **Git.** Vad ska med i git och vad ska inte? Titta i `.gitignore`.

`eslint.config.js`:

```js
import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

export default [
  { ignores: ['dist'] },
  js.configs.recommended,
  { languageOptions: { globals: globals.browser } },
  prettier,
];
```

`.prettierrc`:

```json
{ "singleQuote": true }
```

## Begrepp

| Begrepp | Betyder |
|---|---|
| Node.js | En runtime som kör JavaScript utanför webbläsaren |
| npm | Pakethanteraren som följer med Node |
| `package.json` | Projektets beskrivning: namn, scripts och beroenden |
| `package-lock.json` | De exakta versionerna som installerades. Ska med i git |
| `node_modules` | De installerade paketen. Ska **inte** med i git |
| `dependencies` | Paket som appen behöver när den körs, som `date-fns` |
| `devDependencies` | Paket som bara behövs när du utvecklar, som Vite, ESLint och Prettier |
| Vite | Utvecklingsserver och bundler: löser `import` av paket och bygger till `dist/` |
| ESLint | Hittar fel och riskabel kod. Ett linter |
| Prettier | Formaterar koden likadant hos alla. En formatter |

## Efter passet

Gör om del 3 från början med en egen gammal app, till exempel din quiz-app från u03 eller ett eget litet projekt.
