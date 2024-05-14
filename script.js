let pokemonByLetter = {};

document.addEventListener('DOMContentLoaded', async () => {
    await loadAllPokemon();
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => key.addEventListener('transitionend', removeTransition));
    window.addEventListener('keydown', playSound);
});

async function loadAllPokemon() {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=1200'; // Adjust limit according to the total number of Pokémon in the API
    const response = await fetch(url);
    const data = await response.json();
    organizePokemonByLetter(data.results);
}

function organizePokemonByLetter(pokemonList) {
    pokemonList.forEach(pokemon => {
        let firstLetter = pokemon.name[0].toUpperCase();
        if (!pokemonByLetter[firstLetter]) {
            pokemonByLetter[firstLetter] = [];
        }
        pokemonByLetter[firstLetter].push(pokemon.name);
    });
}

function playSound(event) {
    const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${event.keyCode}"]`);
    if (!audio) return; // If there's no audio for the key, exit the function.
    audio.currentTime = 0; // Rewind to the start.
    audio.play();
    key.classList.add('playing'); // Add playing class for visual effects.

    const letter = event.key.toUpperCase();
    if (pokemonByLetter[letter] && pokemonByLetter[letter].length > 0) {
        displayRandomPokemon(letter);
    }
}

function displayRandomPokemon(letter) {
    const pokemonNames = pokemonByLetter[letter];
    const randomPokemonName = pokemonNames[Math.floor(Math.random() * pokemonNames.length)];
    fetchPokemonDetails(randomPokemonName);
}

async function fetchPokemonDetails(pokemonName) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;
    const response = await fetch(url);
    const data = await response.json();
    const pokemonImage = document.getElementById('pokemon-image');
    pokemonImage.src = data.sprites.other['official-artwork'].front_default;
}

function removeTransition(event) {
    if (event.propertyName !== 'transform') return; // Skip if it's not the transform property.
    this.classList.remove('playing'); // Remove the playing class.
}




/* document.addEventListener('DOMContentLoaded', () => {
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => key.addEventListener('transitionend', removeTransition));
    window.addEventListener('keydown', playSound);
});

function playSound(event) {
    const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${event.keyCode}"]`);
    if (!audio) return; // If there's no audio for the key, exit the function.
    audio.currentTime = 0; // Rewind to the start.
    audio.play();
    key.classList.add('playing'); // Add playing class for visual effects.

    const letter = key.querySelector('kbd').textContent.toLowerCase();
    displayRandomPokemon(letter); // Assume this function handles displaying a Pokémon.
}

function removeTransition(event) {
    if (event.propertyName !== 'transform') return; // Skip if it's not the transform property.
    this.classList.remove('playing'); // Remove the playing class.
}

function displayRandomPokemon(letter) {
    const pokemonIndex = Math.floor(Math.random() * 151) + 1;  // Random index for demonstration
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const pokemonImage = document.getElementById('pokemon-image');
            // Use the 'official-artwork' for higher resolution images
            pokemonImage.src = data.sprites.other['official-artwork'].front_default;
        })
        .catch(error => console.error('Failed to fetch Pokemon:', error));
}
*/