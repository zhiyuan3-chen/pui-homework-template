// Prices for different glazing options
const glazingPrices = {
  'keep-original': 0,
  'sugar-milk': 0,
  'vanilla-milk': 0.5,
  'double-chocolate': 1.5
};

const packSizePrices = {
  '1':1,
  '3':3,
  '6':5,
  '12':10
}


const basePrice = 2.49; // Base product price
let selectedGlazing = 'keep-original';
let quantity = 1;

// Function to update the total price 
function updateTotalPrice() {
  const glazingPrice = glazingPrices[selectedGlazing];
  const actualQuantity =packSizePrices[quantity];
  const totalPrice = (basePrice + glazingPrice) * actualQuantity;
  document.getElementById('total-price').innerText = `$${totalPrice.toFixed(2)}`;
}

// Event listener for glazing selection
const glazingSelect = document.querySelector('select[name="galzing"]');
function selectGlazing (event){
  selectedGlazing = event.target.value;
  updateTotalPrice();
}
glazingSelect.addEventListener('change', selectGlazing);


// Event listener for pack size selection
const packSizeSelect = document.querySelector('select[name = "pack-size"]');
function selectPackSize (event){
  quantity = parseInt (event.target.value, 10);
  updateTotalPrice();
}
packSizeSelect.addEventListener('change', selectPackSize);


