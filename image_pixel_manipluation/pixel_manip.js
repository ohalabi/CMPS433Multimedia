let img = new Image();
img.src ="./assets/Brill_windmill.jpg";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

img.onload = function () {
    ctx.drawImage(img, 0, 0);
};

let original = function () {
    ctx.drawImage(img, 0, 0);
};

let white = function () {
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i++) {
        data[i] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
};

let grayscale = function () {
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i+=4) { //every pixel has 4 bytes

        let r = data[i];
        let g = data[i+1];
        let b = data[i + 2];

        let avg = (r + g + b) /3;

        data[i] = data[i+1] = data[i + 2] = avg;
    }
    ctx.putImageData(imageData, 0, 0);
};

let invert = function () {
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i+=4) { //every pixel has 4 bytes

        data[i] = 255 - data[i] ;
        data[i+1] = 255 - data[i+1];
        data[i + 2] = 255 - data[i + 2] ;
    }
    ctx.putImageData(imageData, 0, 0);
};

let binary = function () {
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const threshold = 255 / 2;

    for (let i = 0; i < data.length; i+=4) { //every pixel has 4 bytes

        let r = data[i];
        let g = data[i+1];
        let b = data[i + 2];
        let alpha = data [i+3]; //alpha channel

        let avg = (r + g + b) /3;

        if (threshold < avg) {
            data[i] = data[i + 1] = data[i + 2] = 255;
        } else {
            data[i] = data[i + 1] = data[i + 2] = 0;
        }
    }
    ctx.putImageData(imageData, 0, 0);
};

let originalButton = document.getElementById("original");
originalButton.addEventListener("change", original);

let whiteButton = document.getElementById("white");
whiteButton.addEventListener("change", white);

let grayscaleButton = document.getElementById("grayscale");
grayscaleButton.addEventListener("change", grayscale);

let invertButton = document.getElementById("invert");
invertButton.addEventListener("change", invert);

let binaryButton = document.getElementById("threshold");
binaryButton.addEventListener("change", binary);