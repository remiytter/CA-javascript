'use strict';

const statusProduct = document.getElementById("statusProduct");
const productList = document.getElementById("productList");


async function fetchGames() {
    try {
        statusProduct.textContent = "Loading...";

        const response = await fetch("https://v2.api.noroff.dev/gamehub");


        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const result = await response.json();

        // v2 API returns data in "data"
        const games = result.data;

        statusProduct.textContent = "";

        renderGames(games);

    } catch (error) {
        statusProduct.textContent = "Something went wrong.";
        console.error(error);
    }
}


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

fetchGames();