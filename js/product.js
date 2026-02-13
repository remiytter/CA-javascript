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
                <p><strong>${game.price} usd</strong></p>
                <button id="addToCart">Add to cart</button>
            </article>
            `;

        const button =document.getElementById("addToCart");

        button.addEventListener("click", () => {
            addToCart(game);
        })
    } catch (error) {
        statusProduct.textContent = "Something went wrong.";
        console.error(error);
    }
}

fetchGameById(id);

function addToCart(game) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        id: game.id,
        title: game.title,
        price: game.price,
        image: game.image.url
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart!")
}