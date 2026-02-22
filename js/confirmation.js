'use strict';


const messageEl = document.getElementById("message");

localStorage.removeItem("cart");

messageEl.textContent = "Thank you! Your order is confirmed."; 