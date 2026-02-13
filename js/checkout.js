'use strict';


const cartItemsEl = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function removeFromCart(id) {
    const cart = getCart().filter(item => String(item.id) !== String(id));
    saveCart(cart);
    renderCart();
}

function renderCart() {
    const cart = getCart();

    if(cart.length === 0) {
        cartItemsEl.innerHTML = "<p>Your cart is empty.</p>";
        cartTotalEl.textContent = "";
        return;
    }

    cartItemsEl.innerHTML = "";

    cart.forEach(item => {
        cartItemsEl.innerHTML += `
            <article>
                <h2>${item.title}</h2>
                <p>${item.price} kr</p>
                <button class="removeBtn" data-id="${item.id}">Remove</button>
            </article>
            `;
    });

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotalEl.textContent = `Total: ${total} kr`;

    document.querySelectorAll(".removeBtn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            removeFromCart(e.target.dataset.id);
        });
    });
}

renderCart();