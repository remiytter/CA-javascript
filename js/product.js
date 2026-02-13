'use strict';


const statusProduct = document.getElementById("statusProduct");
const productDetail = document.getElementById("productDetail");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");


async function fetchGameById(gameId) {
    try {
        statusProduct.textContent = "Loading...";

        if(!gameId) {
            throw new Error("Missing product id in URL");
        }

        const response = await fetch(`https://v2.api.noroff.dev/gamehub/${gameId}`);

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const result = await response.json();
        const game = result.data;

        statusProduct.textContent = "";

        productDetail.innerHTML = `
            <article>
                <h1>${game.title}</h1>
                <img src="${game.image.url}" alt="${game.title}">
                <p>${game.description ?? ""}</p>
                <p><strong>${game.price} kr</strong></p>
            </article>
            `;
    } catch (error) {
        statusProduct.textContent = "Something went wrong.";
        console.error(error);
    }
}

fetchGameById(id);