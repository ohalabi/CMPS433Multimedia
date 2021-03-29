let playButton;
let canvas;
let context;
let video;
let canPlay;

function init() {
    playButton = document.getElementById('PlayButton');
    canvas = document.getElementById('Canvas');
    context = canvas.getContext('2d');
    video = document.getElementById('SourceVideo');

    video.muted = false;

    video.addEventListener("canplay", function () {
        // Set the canvas the same width and height of the video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        canPlay = true;
    });

    playButton.addEventListener("click", function () {
        if (!canPlay) return;
        // Play video
        video.play();

       drawFrame(video);
    });
}

function drawFrame(video) {
    context.drawImage(video, 0, 0);
    // add your effects
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    // grayScale(imageData.data);
    invertColors(imageData.data);

    context.putImageData(imageData, 0, 0);

    setTimeout(function () {
        drawFrame(video);
    }, 10);

}

function  grayScale(data) {
    for (let i = 0; i < data.length; i+= 4) {
        let avg = (data[i] + data[i+1] + data[i+2]) / 3;
        data[i] = data[i+1] = data[i+2] = avg; // Invert Blue
    }
}

function  invertColors(data) {
    for (let i = 0; i < data.length; i+= 4) {
        data[i] = data[i] ^ 255; // Invert Red
        data[i+1] = data[i+1] ^ 255; // Invert Green
        data[i+2] = data[i+2] ^ 255; // Invert Blue
    }
}

window.addEventListener('load', init);