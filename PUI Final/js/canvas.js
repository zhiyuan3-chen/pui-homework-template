// saveButton.addEventListener('click', function() {
//   // create a canvas
//   const canvas2 = document.createElement('canvas');
//   const context = canvas2.getContext('2d');

//   // set canvas size to the current window size
//   canvas2.width = window.innerWidth;
//   canvas2.height = window.innerHeight;

//   // use html2canvas library
//   html2canvas(document.body, { useCORS: true }).then(function(canvas2) {
//     // make canvas a picture of choice
//     const dataURL = canvas2.toDataURL("image/png");

//     // create a download link
//     const link = document.createElement('a');
//     link.href = dataURL;
//     link.download = 'Malevich.png'; 
//     link.click();
//   });
// });

document.addEventListener('DOMContentLoaded', function() {
  // Retrieve information about the previous page from session storage
  const previousPage = sessionStorage.getItem('previousPage');

  // Get the reference to the image button
  const backButton = document.getElementById('backButton');

  // Set click event for the image button
  if (backButton) {
    backButton.addEventListener('click', function() {
      // Navigate to the previous page
      window.location.href = previousPage;
    });
  }
});


saveButton.addEventListener('click', function () {
  // Create a clone of the document body
  const clonedBody = document.body.cloneNode(true);

  // Remove elements with the "buttontobeRemoved" class from the cloned body
  const elementsToRemove = clonedBody.getElementsByClassName('buttontobeRemoved');
  while (elementsToRemove.length > 0) {
    elementsToRemove[0].parentNode.removeChild(elementsToRemove[0]);
  }

  // Create a canvas for the cloned body
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  // Set canvas size to the current window size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Append the cloned body to a temporary div for html2canvas to capture
  const tempDiv = document.createElement('div');
  tempDiv.appendChild(clonedBody);

  // Append the tempDiv to the body temporarily for html2canvas to capture
  document.body.appendChild(tempDiv);

  // Use html2canvas to capture the tempDiv
  html2canvas(tempDiv, { useCORS: true }).then(function (canvas) {
    // Convert canvas to data URL
    const dataURL = canvas.toDataURL("image/png");

    // Remove the temporary div and cloned body from the document
    document.body.removeChild(tempDiv);

    // Create a download link
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'Malevich.png';
    link.click();
  });
});


const centerText = document.getElementById('instruction');

// Add a click event listener to the document
document.addEventListener('click', function() {
  // Hide the text when a click occurs
  centerText.style.display = 'none';
});



document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('myCanvas');
  canvas.width = window.innerWidth; // set the canvas width equal to window's width
  canvas.height = window.innerHeight; // set the canvas height equal to window's height
  const ctx = canvas.getContext('2d');
  const canvasRect = canvas.getBoundingClientRect(); 

  const body = document.querySelector('#canvas'); // you can only draw rectangle inside the canvas div

  const undoButton = document.getElementById('undoButton');
  const rectangles = []; // Array to store generated rectangles
  if (undoButton) {
    undoButton.addEventListener('click', function() {
      // Check if there are rectangles to undo
      if (rectangles.length > 0) {
        // Get the last rectangle from the array
        const lastRectangle = rectangles.pop();
        // Remove the last rectangle from the DOM
        lastRectangle.parentNode.removeChild(lastRectangle);
      }
    });
  }

  body.addEventListener('click', function(event) {
    const rect = document.createElement('div');
    rect.classList.add('textured-rectangle');  // Add the textured class
    rect.style.position = 'absolute';
    rect.style.zIndex = '1';
    let rectWidth = getRandomSize();
    let rectHeight = getRandomSize();
    if (rectWidth > 10) {
      rectHeight= Math.min(rectHeight, 400);  // if the width is too big, shrink the height so each individual rectangle is not too big
    }
    let left=event.clientX - rectWidth/2;
    let top=event.clientY - rectHeight/2;
    
    if (Math.random() > 0.5) {
      left += getRandomOffset();
      top += getRandomOffset();
    }
    console.log(event.clientX);
    console.log(event.clientY);
    console.log(rectHeight);
    console.log(rectHeight);
    console.log(left);
    console.log(event.clientX - rectHeight/2);
    console.log(event.clientY - rectHeight/2);
    console.log(top);
    rect.style.left = `${left}px`; // Use the mouse click position to determine the horizontal coordinate of the top-left corner of the rectangle
    rect.style.top = `${top}px`;  // Use the mouse click position to determine the vertical coordinate of the top-left corner of the rectangle
    // let width = getRandomSize();
    rect.style.width = `${rectWidth}px`;  // random width
    rect.style.height = `${rectHeight}px`;  // random height
    rect.style.backgroundColor = getRandomColor();  // call the color function to generate a random color from the color pallete
    rect.style.transformOrigin = 'center center'; // set the rotation
    rect.style.transform = `rotate(${getRandomRotation()}deg)`; // call the function to generate a random rotation angle
    if (Math.random() > 0.5) {
      rect.style.borderRadius = '3px';

    }
    else{
      rect.style.borderRadius = '1px';
    }
    rect.style.zIndex = '9999';  // send the generated rectangle to the front
    body.appendChild(rect);
    rectangles.push(rect);
    
  });

  function getRandomOffset() {
      // Adjust the value based on the level of randomness you want
      return Math.random() * 50 - 25; // Example: random offset between -10 and 10
    }

  // create a dictionary with colors that the artist use most frequently
  function getRandomColor() {
    const colors = [
      'rgb(73, 121, 53)',
      'rgb(220, 151, 0)',
      'rgb(38, 10, 76)',
      'rgb(26, 7, 5)',
      'rgb(172, 22, 1)',
      'rgb(217, 217, 217)',
      'rgb(42, 47, 45)',
      'rgb(222, 207, 184)',
      'rgb(151, 108, 64)',
      'rgb(37, 32, 96)',
      'rgb(241, 192, 0)',
      'rgb(188, 79, 25)',
      'rgb(217, 167, 170)',
      'rgb(64, 108, 179)'
    ];

    return colors[Math.floor(Math.random() * colors.length)];
  }

  function getRandomSize() {
    const randomNumber = Math.random();
  //   if (randomNumber < 0.2) {
  //     return Math.floor(Math.random() * 20) + 1; // generate a number from 1 to 20 as the dimension of the rect
  // } 
    if (randomNumber > 0.1 && randomNumber < 0.7 ) {
      return Math.floor(Math.random() * 180) + 20; // generate a number from 20 to 200 as the dimension of the rect
    } else {
      return Math.floor(Math.random() * 200) + 200; // generate a number from 200 to 400 as the dimension of the rect
    }
  }

  let previousRotation = null;

  function getRandomRotation() {
      const randomNumber = Math.random();
    
      if (previousRotation === null || randomNumber < 0.3) {
        // 30% chance or first rotation, or reset to one of 0, 90, 180, 270, 360
        const rotationOptions = [0, 90, 180, 270, 360];
        previousRotation = rotationOptions[Math.floor(Math.random() * rotationOptions.length)];
      } else {
        // 70% chance for random rotation other than previous rotation
        previousRotation = Math.floor(Math.random() * 360);
      }
    
      return previousRotation;
    }


});

