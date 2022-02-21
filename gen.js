// Get a reference to the image you want the pixels of and its dimensions
var srcImg = document.getElementById('srcImg');
var w = srcImg.width, h = srcImg.height;

// Create a Canvas element
var canvas = document.createElement('canvas');

// Size the canvas to the element
canvas.width = w;
canvas.height = h;

// Draw image onto the canvas
var ctx = canvas.getContext('2d');
ctx.drawImage(srcImg, 0, 0);

// Finally, get the image data
// ('data' is an array of RGBA pixel values for each pixel)
var data = ctx.getImageData(0, 0, w, h);

function createTable(tableData) {
  var table = document.createElement('table');
  var row = {};
  var cell = {};

  tableData.forEach(function(rowData) {
    row = table.insertRow(-1);
    rowData.forEach(function(cellData) {
      cell = row.insertCell();
      cell.textContent = cellData;
    });
  });
  document.body.appendChild(table);
}
