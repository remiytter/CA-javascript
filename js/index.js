'use strict';

const statusProduct = document.getElementById("statusProduct");
const productList = document.getElementById("productList");
const genreFilter = document.getElementById("genreFilter");

let allGames = [];

// Fetch the games from the API
async function fetchGames() {
    try {
        statusProduct.textContent = "Loading...";
        const response = await fetch("https://v2.api.noroff.dev/gamehub");


        if (!response.ok) {
            throw new Error("Network response not ok");
        }

        const result = await response.json();
        const games = result.data;
        allGames = games;

        statusProduct.textContent = "";

        renderGames(games);
        populateFilter(games);

    } catch (error) {
        statusProduct.textContent = "Something went wrong.";
        console.error(error);
    }
}

// Adds the games fetched from the API to the HTML
function renderGames(games) {
    productList.innerHTML = "";

    games.forEach((game) => {
        productList.innerHTML += `
      <article class="product-card">
        <a href="product.html?id=${game.id}">
          <img src="${game.image?.url ?? game.image}" alt="${game.title}" />
          <h2>${game.title}</h2>
        </a>
        <p>${game.price} kr</p>
      </article>
    `;
    });
}

function populateFilter(games) {
    const genres = games.map(game => game.genre);
    const uniqueGenres = [...new Set(genres)];

    uniqueGenres.forEach(genre => {
        const option = document.createElement("option");
        option.value = genre.toLowerCase();
        option.textContent = genre;
        genreFilter.appendChild(option);
    });
}

genreFilter.addEventListener("change", function() {
    const selectedGenre = genreFilter.value;

    if (selectedGenre === "all") {
        renderGames(allGames);
        return;
    }

    const filteredGames = allGames.filter(game =>
        game.genre.toLowerCase() === selectedGenre
    );

    renderGames(filteredGames);
})

fetchGames();