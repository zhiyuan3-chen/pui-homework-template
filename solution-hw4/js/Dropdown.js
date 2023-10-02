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


// Prices for different glazing options
const glazingPrices = {
    'Keep original': 0,
    'Sugar milk': 0,
    'Vanilla milk': 0.5,
    'Double chocolate': 1.5
  };
  
  const packSizePrices = {
    '1':1,
    '3':3,
    '6':5,
    '12':10
  }
  
  
  const basePrice = 2.49; // Base product price
  let selectedGlazing = 'keep-original';
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





  
  
  