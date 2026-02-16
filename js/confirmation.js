'use strict';


const messageEl = document.getElementById("message");


//Tøm handlekurven
localStorage.removeItem("cart");


// Vis melding
messageEl.textContent = "Thank you! Your order is confirmed."; 