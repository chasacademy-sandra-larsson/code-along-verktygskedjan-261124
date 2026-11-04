// Open-Meteo anger vädret som en WMO-kod. Den här tabellen översätter koden till text.
// Källa: https://open-meteo.com/en/docs (avsnittet "WMO Weather interpretation codes").
const CODES = {
  0: 'Klart',
  1: 'Mestadels klart',
  2: 'Halvklart',
  3: 'Mulet',
  45: 'Dimma',
  48: 'Dimma med rimfrost',
  51: 'Lätt duggregn',
  53: 'Duggregn',
  55: 'Kraftigt duggregn',
  56: 'Underkylt duggregn',
  57: 'Kraftigt underkylt duggregn',
  61: 'Lätt regn',
  63: 'Regn',
  65: 'Kraftigt regn',
  66: 'Underkylt regn',
  67: 'Kraftigt underkylt regn',
  71: 'Lätt snöfall',
  73: 'Snöfall',
  75: 'Kraftigt snöfall',
  77: 'Snökorn',
  80: 'Lätta regnskurar',
  81: 'Regnskurar',
  82: 'Kraftiga regnskurar',
  85: 'Snöbyar',
  86: 'Kraftiga snöbyar',
  95: 'Åska',
  96: 'Åska med hagel',
  99: 'Åska med kraftigt hagel',
};

export const describeWeather = (code) => CODES[code] ?? 'Okänt väder';
