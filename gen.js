var lnWt = 1; //line weight
var res = 3; //number of pixels to skip

// Get a reference to the image you want the pixels of and its dimensions
var srcImg = document.getElementById("srcImg");
var w = srcImg.width,
  h = srcImg.height;

// Create a Canvas element
var canvas = document.createElement("canvas");

// Size the canvas to the element
canvas.width = w;
canvas.height = h;

// Draw image onto the canvas
var ctx = canvas.getContext("2d");
ctx.drawImage(srcImg, 0, 0);

// Finally, get the image data
// ('data' is an array of RGBA pixel values for each pixel)
// here data.data[(y*srcImg.width + x)*4] is the red value
// of pixel (x, y), followed by green, blue and alpha
var data = ctx.getImageData(0, 0, w, h).data;

// create the svg element
const out = document.createElementNS("http://www.w3.org/2000/svg", "svg");

// set width and height
out.setAttribute("width", w);
out.setAttribute("height", h);

var isoPx_x = [];
var isoPx_y = [];

for (let x = 0; x < w; x += res) {
  for (let y = 0; y < h; y += res) {
    if (
      data[(y * srcImg.width + x) * 4 + 3] > 0 &&
      ((x/res % 4 == 2 && y/res % 2 == 0) || (x/res % 4 == 0 && y/res % 2 != 0))
    ) {
      isoPx_x.push(x);
      isoPx_y.push(y);
    }
  }
}

for (let x = 0; x < w; x += res) {
  for (let y = 0; y < h; y += res) {
    if (
      data[(y * srcImg.width + x) * 4 + 3] > 0 &&
      ((x/res % 4 == 2 && y/res % 2 == 0) || (x/res % 4 == 0 && y/res % 2 != 0))
    ) {
      var newLine = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      newLine.setAttribute("x1", x);
      newLine.setAttribute("y1", y);
      /* if (
        data[(y * srcImg.width + x) * 4 + 3] >
        data[(y * srcImg.width + x + 1) * 4 + 3]
      ) {
        newLine.setAttribute("x2", x + genRand(-50, 0));
      } else if (
        data[(y * srcImg.width + x) * 4 + 3] >
        data[(y * srcImg.width + x - 1) * 4 + 3]
      ) {
        newLine.setAttribute("x2", x + genRand(0, 50));
      } else {
        newLine.setAttribute("x2", x + genRand(-50, 50));
      }
      if (
        data[(y * srcImg.width + x) * 4 + 3] >
        data[((y + 1) * srcImg.width + x) * 4 + 3]
      ) {
        newLine.setAttribute("y2", y + genRand(-50, 0));
      } else if (
        data[(y * srcImg.width + x) * 4 + 3] >
        data[((y - 1) * srcImg.width + x) * 4 + 3]
      ) {
        newLine.setAttribute("y2", y + genRand(0, 50));
      } else {
        newLine.setAttribute("y2", y + genRand(-50, 50));
      } */
      newLine.setAttribute("x1", x);
      newLine.setAttribute("y1", y);
      var rnd = genRand(1, isoPx_x.length);
      newLine.setAttribute("x2", isoPx_x[rnd]);
      newLine.setAttribute("y2", isoPx_y[rnd]);
      var hex =
        "#" +
        (
          "000000" +
          rgbToHex(
            data[(y * srcImg.width + x) * 4],
            data[(y * srcImg.width + x) * 4 + 1],
            data[(y * srcImg.width + x) * 4 + 2]
          )
        ).slice(-6);
      newLine.setAttribute("stroke", hex);
      newLine.setAttribute("stroke-width", Math.random());
      out.appendChild(newLine);
    }
  }
}

function rgbToHex(r, g, b) {
  if (r > 255 || g > 255 || b > 255) throw "Invalid color component";
  return ((r << 16) | (g << 8) | b).toString(16);
}

function genRand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

// attach container to document
document.getElementById("out").appendChild(out);
