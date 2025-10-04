let urlActual = 'https://pokeapi.co/api/v2/pokemon';

// Función principal para cargar la lista de pokémones
async function obtenerPokemones(url = urlActual) {
  const respuesta = await fetch(url);
  const datos = await respuesta.json();
  const resultados = datos.results;
  urlActual = url;

  const app = document.getElementById('app');
  app.innerHTML = '';

  // Campo de búsqueda
  const form = document.createElement('form');
  form.innerHTML = `
    <input type="text" id="busqueda" placeholder="Buscar por nombre" autocomplete="off" />
    <button type="submit">Buscar</button>
  `;
  form.onsubmit = async e => {
    e.preventDefault();
    const nombre = document.getElementById('busqueda').value.trim().toLowerCase();
    if (nombre) {
      mostrarDetallePorNombre(nombre);
    }
  };
  app.appendChild(form);

  const ul = document.createElement('ul');
  resultados.forEach(pokemon => {
    const li = document.createElement('li');
    li.textContent = pokemon.name;
    li.style.cursor = 'pointer';
    li.onclick = async () => mostrarDetallePorNombre(pokemon.name);
    ul.appendChild(li);
  });

  app.appendChild(ul);

  // Botones de navegación
  const nav = document.createElement('div');
  nav.style.marginTop = '10px';
  if (datos.previous) {
    const btnPrev = document.createElement('button');
    btnPrev.textContent = 'Anterior';
    btnPrev.onclick = () => obtenerPokemones(datos.previous);
    nav.appendChild(btnPrev);
  }
  if (datos.next) {
    const btnNext = document.createElement('button');
    btnNext.textContent = 'Siguiente';
    btnNext.onclick = () => obtenerPokemones(datos.next);
    nav.appendChild(btnNext);
  }
  app.appendChild(nav);
}

// Función para mostrar detalle de pokémon por nombre
async function mostrarDetallePorNombre(nombre) {
  try {
    const respuestaDetalle = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
    if (!respuestaDetalle.ok) throw new Error('No encontrado');
    const detalle = await respuestaDetalle.json();

    const app = document.getElementById('app');
    app.innerHTML = `
      <button id="volver">Volver</button>
      <h2>${detalle.name}</h2>
      <img src="${detalle.sprites.front_default}" alt="${detalle.name}">
      <p>Altura: ${detalle.height}</p>
      <p>Peso: ${detalle.weight}</p>
    `;

    document.getElementById('volver').onclick = () => obtenerPokemones(urlActual);
  } catch {
    alert('Pokémon no encontrado');
  }
}

obtenerPokemones();
