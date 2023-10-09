// Define the Roll class
class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.rollType = rollType;
        this.rollGlazing = rollGlazing;
        this.packSize = packSize;
        this.basePrice = basePrice;
        this.totalPrice = (basePrice + glazingPrices[rollGlazing]) * packSizePrices[packSize];
    }
}

// Create a set to hold the items in the cart
const cart = new Set();


// Items to be added to the cart
const newItems = [
    new Roll('Original', 'Sugar milk', 1, rolls['Original'].basePrice),
    new Roll('Walnut', 'Vanilla milk', 12, rolls['Walnut'].basePrice),
    new Roll('Raisin', 'Sugar milk', 3, rolls['Raisin'].basePrice),
    new Roll('Apple', 'Keep original', 3, rolls['Apple'].basePrice)
];

// Add items to the cart
for (const item of newItems) {
    cart.add(item);
}

// Function to calculate the total price of all items in the cart
function calculateTotalPrice() {
    let totalCartPrice = 0;
    for (const item of cart) {
        totalCartPrice += item.totalPrice;
    }
    return totalCartPrice.toFixed(2);
}


// Function to remove a Roll instance from the cart and update the display
function removeFromCart(rollType) {
    for (const item of cart) {
        if (item.rollType === rollType) {
            cart.delete(item);
            break;  // Break the loop after removing the item
        }
    }

    // Update the display after removing the item
    displayCart();
}

// Function to display items in the cart on the shopping cart page
function displayCart() {
    const cartItemsContainer = document.querySelector('.cart-item');
    cartItemsContainer.innerHTML = '';

    for (const item of cart) {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item-info-container');

        itemDiv.innerHTML = `
            <div class="item-remove" onclick="removeFromCart('${item.rollType}')">
                <img alt="${item.rollType}-cinnamon-roll" src="${rolls[item.rollType].imageFile}">
                <div class="remove-button">
                    <p>Remove</p>
                </div>
            </div>

            <div class="item-detail">
                <p class="item-name">${item.rollType}</p>
                <p class="glazing">Glazing: ${item.rollGlazing}</p>
                <p class="size">Pack Size: ${item.packSize}</p>
            </div>
            <div class="item-price">$ ${item.totalPrice.toFixed(2)}</div>
        `;

        cartItemsContainer.appendChild(itemDiv);
    }

    // Update the total price
    const totalPriceElement = document.querySelector('.price-text p');
    const totalCartPrice = calculateTotalPrice();
    totalPriceElement.textContent = `$ ${totalCartPrice}`;
}

// Display items in the cart on the cart page
displayCart();

