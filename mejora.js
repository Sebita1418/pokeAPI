async function obtenerTipos() {
  const respuesta = await fetch('https://pokeapi.co/api/v2/type');
  const datos = await respuesta.json();
  const tipos = datos.results;

  const mejorasDiv = document.getElementById('mejoras');
  mejorasDiv.innerHTML = '';

  const titulo = document.createElement('h2');
  titulo.textContent = 'Tipos de Pokémon';
  mejorasDiv.appendChild(titulo);

  const ul = document.createElement('ul');
  tipos.forEach(tipo => {
    const li = document.createElement('li');
    li.textContent = tipo.name;
    li.style.cursor = 'pointer';
    li.onclick = () => mostrarPokemonesPorTipo(tipo);
    ul.appendChild(li);
  });
  mejorasDiv.appendChild(ul);

  const btnVolver = document.createElement('button');
  btnVolver.textContent = 'Volver al inicio';
  btnVolver.onclick = () => {
    mejorasDiv.innerHTML = '';
    obtenerTipos();
  };
  mejorasDiv.appendChild(btnVolver);
}

async function mostrarPokemonesPorTipo(tipo) {
  const respuesta = await fetch(tipo.url);
  const datos = await respuesta.json();
  const pokemones = datos.pokemon.slice(0, 20); // Mostramos solo los primeros 20 para no saturar

  const mejorasDiv = document.getElementById('mejoras');
  mejorasDiv.innerHTML = `<h2>Pokémon tipo ${tipo.name}</h2>`;

  const ul = document.createElement('ul');
  pokemones.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.pokemon.name;
    ul.appendChild(li);
  });
  mejorasDiv.appendChild(ul);

  const btnVolverTipos = document.createElement('button');
  btnVolverTipos.textContent = 'Volver a tipos';
  btnVolverTipos.onclick = obtenerTipos;
  mejorasDiv.appendChild(btnVolverTipos);
}

window.onload = obtenerTipos;
