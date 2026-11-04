// Skapar element. Vet ingenting om API:t.
export function renderShow(show) {
  const li = document.createElement('li');

  if (show.image) {
    const img = document.createElement('img');
    img.src = show.image.medium;
    img.alt = '';
    li.append(img);
  }

  const text = document.createElement('div');
  const name = document.createElement('strong');
  name.textContent = show.name;
  const premiered = document.createElement('p');
  premiered.textContent = show.premiered ? `Premiär: ${show.premiered}` : 'Premiär: okänd';
  text.append(name, premiered);
  li.append(text);

  return li;
}
