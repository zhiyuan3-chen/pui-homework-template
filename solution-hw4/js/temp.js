import rolls from './rollsData.js';

function redirectToDetailPage(param, value) {
  const url = new URL(window.location.href);
  url.searchParams.set(param, value);
  url.pathname = "/solution-hw4/Detail.html";
  window.location.href = url;
}

const productLinks = document.querySelectorAll('a[dataValue]');
for (let i = 0; i < productLinks.length; i++) {
productLinks[i].addEventListener('click', function(event) {
  event.preventDefault();
  const product = this.getAttribute('dataValue');
  redirectToDetailPage('roll', product);
});
}

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');


function updateProductDetails(product) {
  const imageContainer = document.querySelector('.image-container img');
  const basePriceElement = document.querySelector('#base-price');
  const headingTitle = document.querySelector('.heading-title'); // Updated selector

  imageContainer.src = rolls[product].imageFile;
  basePriceElement.innerText = `$ ${rolls[product].basePrice}`;
  headingTitle.innerText = product + ' cinnamon roll';
}

updateProductDetails(rollType);