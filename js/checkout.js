'use strict';


const cartItemsEl = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const checkoutButton = document.querySelector(".checkoutButton");

// Get the cart from localstorage. Return an empty array if it does not exist.
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save cart array to localstorage as JSON string.
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to remove items with same id then save new cart and refresh display.
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

// Get cart from storage and check if empty.
function displayCart() {
    const cart = getCart();

// If it's empty then show message and stop the function
    if(cart.length === 0) {
        cartItemsEl.innerHTML = "<p>Your cart is empty.</p>";
        cartTotalEl.textContent = "";

        checkoutButton.classList.add("is-disabled");
        return;
    }

    checkoutButton.classList.remove("is-disabled");
    cartItemsEl.innerHTML = "";

// Loop each item in the cart and display.
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

// Calculate total price of items in the cart.
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    cartTotalEl.textContent = `Total: ${total} usd`;

// Click event to remove buttons.
    document.querySelectorAll(".removeBtn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            removeFromCart(e.target.dataset.id);
        });
    });
}

displayCart();