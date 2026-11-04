// Del 1: Node.js
// Kör filen i terminalen: node hello.js

// 1. JavaScript utan webbläsare
console.log('Hej från Node!');
// TODO: kör filen. Var hamnar utskriften, i terminalen eller i en konsol i webbläsaren?

// 2. Node har inte webbläsarens API:er
// TODO: avkommentera raden nedan och kör igen. Vilket fel får du, och varför?
// console.log(document.title);

// 3. Men Node har saker som webbläsaren inte har
// TODO: logga process.version och process.platform. Vad är process?

// 4. fetch finns i båda
// TODO: hämta vädret i Stockholm från Open-Meteo med fetch och await och logga temperaturen:
//       https://api.open-meteo.com/v1/forecast?latitude=59.33&longitude=18.07&current=temperature_2m Fungerar await direkt i en modul?
//       Tips: döp om filen till hello.mjs, eller läs vidare om "type": "module" i del 3.
