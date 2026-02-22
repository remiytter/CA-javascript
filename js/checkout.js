'use strict';


const cartItemsEl = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const checkoutButton = document.querySelector(".checkoutButton");

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function removeFromCart(id) {
    const cart = getCart();
    const item = cart.find(i => String(i.id) === String(id));

    if (!item) {
        return;
    }

    if (item.qty > 1) {
        item.qty -= 1;
    } else {
        const index = cart.findIndex(i => String(i.id) === String(id));
        cart.splice(index, 1);
    }

    saveCart(cart);
    displayCart();
}

function displayCart() {
    const cart = getCart();

    if(cart.length === 0) {
        cartItemsEl.innerHTML = "<p>Your cart is empty.</p>";
        cartTotalEl.textContent = "";

        checkoutButton.classList.add("is-disabled");
        return;
    }

    checkoutButton.classList.remove("is-disabled");
    cartItemsEl.innerHTML = "";

    cart.forEach(item => {
        cartItemsEl.innerHTML += `
            <article>
                <h2>${item.title}</h2>
                <p>${item.price} usd</p>
                <p>Qty: ${item.qty}</p>
                <button class="removeBtn" data-id="${item.id}">Remove</button>
            </article>
            `;
    });

    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    cartTotalEl.textContent = `Total: ${total} usd`;

    document.querySelectorAll(".removeBtn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            removeFromCart(e.target.dataset.id);
        });
    });
}

displayCart();