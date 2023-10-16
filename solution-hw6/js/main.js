// // Define the Roll class
// class Roll {
//     constructor(rollType, rollGlazing, packSize, basePrice) {
//       this.rollType = rollType;
//       this.rollGlazing = rollGlazing;
//       this.packSize = packSize;
//       this.basePrice = basePrice;
//       this.totalPrice = (basePrice + glazingPrices[rollGlazing]) * packSizePrices[packSize];
//     }
//   }
  
//   // Check if cart is already defined, if not, initialize it
//   const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
//   function addToCart() {
//     const selectedGlazing = document.querySelector('select[name="glazing"]').value;
//     const selectedPackSize = document.querySelector('select[name="pack-size"]').value;
  
//     const newItem = new Roll('Original', selectedGlazing, selectedPackSize, rolls['Original'].basePrice);
    
//     cart.push(newItem);
//     localStorage.setItem('cart', JSON.stringify(cart));
//     console.log('Cart in local storage:', JSON.parse(localStorage.getItem('cart')));
//   }
  
//   function removeFromCart(rollType) {
//     for (let i = 0; i < cart.length; i++) {
//       if (cart[i].rollType === rollType) {
//         cart.splice(i, 1);
//         break;
//       }
//     }
  
//     displayCart();
//     localStorage.setItem('cart', JSON.stringify(cart));
//   }
  
//   function displayCart() {
//     const cartItemsContainer = document.querySelector('.cart-item');
//     cartItemsContainer.innerHTML = '';
  
//     for (const item of cart) {
//       const itemDiv = document.createElement('div');
//       itemDiv.classList.add('item-info-container');
  
//       itemDiv.innerHTML = `
//         <div class="item-remove" onclick="removeFromCart('${item.rollType}')">
//             <img alt="${item.rollType}-cinnamon-roll" src="${rolls[item.rollType].imageFile}">
//             <div class="remove-button">
//                 <p>Remove</p>
//             </div>
//         </div>
  
//         <div class="item-detail">
//             <p class="item-name">${item.rollType}</p>
//             <p class="glazing">Glazing: ${item.rollGlazing}</p>
//             <p class="size">Pack Size: ${item.packSize}</p>
//         </div>
//         <div class="item-price">$ ${item.totalPrice.toFixed(2)}</div>
//       `;
  
//       cartItemsContainer.appendChild(itemDiv);
//     }
  
//     const totalPriceElement = document.querySelector('.price-text p');
//     const totalCartPrice = calculateTotalPrice();
//     totalPriceElement.textContent = `$ ${totalCartPrice}`;
//   }
  
//   function calculateTotalPrice() {
//     let totalCartPrice = 0;
//     for (const item of cart) {
//       totalCartPrice += item.totalPrice;
//     }
//     return totalCartPrice.toFixed(2);
//   }
  
//   displayCart();


// import rolls from './rollsData.js';

const glazingSelect = document.querySelector('select[name="glazing"]');
const packSizeSelect = document.querySelector('select[name="pack-size"]');

const glazingOptions = ['Keep original', 'Sugar milk', 'Vanilla milk', 'Double chocolate'];
const packSizeOptions = ['1', '3', '6', '12'];

// Function to populate the options for glazing
function populateGlazingOptions() {
  for (const optionValue of glazingOptions) {
    const option = document.createElement('option');
    option.textContent = optionValue;
    glazingSelect.appendChild(option);
  }
}

// Function to populate the options for pack size
function populatePackSizeOptions() {
  for (const optionValue of packSizeOptions) {
    const option = document.createElement('option');
    option.textContent = optionValue;
    packSizeSelect.appendChild(option);
  }
}

// Populate glazing and pack size options
populateGlazingOptions();
populatePackSizeOptions();



  
  //get rollsData.js
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const rollType = params.get('roll');

  const basePrice = rolls[rollType].basePrice;
  let selectedGlazing = 'Keep original';
  let actualQuantity = 1;
  
  // Function to update the total price 
  function updateTotalPrice() {
    const glazingPrice = glazingPrices[selectedGlazing];
    const chargedQuantity =packSizePrices[actualQuantity];
    const totalPrice = (basePrice + glazingPrice) * chargedQuantity;
    document.getElementById('base-price').innerText = `$${totalPrice.toFixed(2)}`;
  }
  
  // Event listener for glazing selection
  function selectGlazing (event){
    selectedGlazing = event.target.value;
    updateTotalPrice();
  }
  glazingSelect.addEventListener('change', selectGlazing);
  
  
  // Event listener for pack size selection
  function selectPackSize (event){
    actualQuantity = parseInt (event.target.value, 10);
    updateTotalPrice();
  }
  packSizeSelect.addEventListener('change', selectPackSize);


//update image
const imageContainer = document.querySelector('.image-container img');
imageContainer.src = rolls[rollType].imageFile;

//update price
const basePriceElement = document.querySelector('#base-price');
basePriceElement.innerText = `$${rolls[rollType].basePrice}`;

//update heading
const headingTitle = document.querySelector('.heading-title');
headingTitle.innerText = rollType + ' cinnamon roll';


const cart = new Set(JSON.parse(localStorage.getItem('cart')) || []);

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.rollType = rollType;
        this.rollGlazing = rollGlazing;
        this.packSize = packSize;
        this.basePrice = basePrice;
        this.totalPrice = (basePrice + glazingPrices[rollGlazing]) * packSizePrices[packSize];
    }
}

addToCartButton.addEventListener('click', () => {
    // Get the selected options and create a Roll instance
    const selectedGlazing = document.querySelector('select[name="glazing"]').value;
    const selectedPackSize = document.querySelector('select[name="pack-size"]').value;

    const newItem = new Roll('Original', selectedGlazing, selectedPackSize, rolls['Original'].basePrice);

    // Add the item to the cart
    cart.push(newItem);

    // Save the updated cart to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Print the current contents of the cart in local storage
    console.log('Cart in local storage:', JSON.parse(localStorage.getItem('cart')));
});




  