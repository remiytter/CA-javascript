'use strict';

const status = document.getElementById("status");
const productList = document.getElementById("productList");



async function fetchGames() {
    try {
        status.textContent = "Loading...";

        const response = await fetch("https://v2.api.noroff.dev/gamehub");
            headers: {
                Authorization: ""
            }

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const games = await response.json();

        status.textContent = "";
        console.log(games); //temporary


    } catch (error) {
        status.textContent = "Something went wrong.";
        console.error(error);
    }
}

fetchGames();