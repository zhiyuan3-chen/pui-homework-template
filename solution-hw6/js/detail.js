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

let cart = JSON.parse(localStorage.getItem('myCart')) || [];

class Roll {
  constructor(rollType, rollGlazing, packSize, basePrice) {
      this.rollType = rollType;
      this.rollGlazing = rollGlazing;
      this.packSize = packSize;
      this.basePrice = basePrice;
      this.totalPrice = (basePrice + glazingPrices[rollGlazing]) * packSizePrices[packSize];
  }
}

//populate the cart with what is selected in the dropdown
function newRolls() {
  const glazingIndex = glazingSelect.selectedIndex;
  const rollGlazing = glazingOptions[glazingIndex];
  
  const packSizeIndex = packSizeSelect.selectedIndex;
  const packSize = packSizeOptions[packSizeIndex];
  
  const basePrice = rolls[rollType].basePrice;
  
  const newRoll = new Roll(rollType, rollGlazing, packSize, basePrice);

  if (!Array.isArray(cart)) {
    cart = [];
  }

  cart.push(newRoll);
  localStorage.setItem('myCart', JSON.stringify(cart));
  alert('Item added to cart!');
  console.log(cart);
}

const addToCartButton = document.querySelector('.addtocart-button');
addToCartButton.addEventListener('click', newRolls);




