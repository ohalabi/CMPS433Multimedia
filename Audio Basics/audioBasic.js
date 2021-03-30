

// const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx;

// load some sound from external file
const audioElement = document.querySelector('audio');
let track;

const playButton = document.querySelector('#PlayButton');

// play pause audio
playButton.addEventListener('click', function() {
    if(!audioCtx) {
        init();
    }

    // check if context is in suspended state (autoplay policy)
    if (audioCtx.state == 'suspended') {
        audioCtx.resume();
    }

    if (this.dataset.playing == 'false') { //access variable in html
        audioElement.play();
        this.dataset.playing = 'true';
        // if track is playing pause it
    } else if (this.dataset.playing == 'true') {
        audioElement.pause();
        this.dataset.playing = 'false';
    }

}, false);


function init() {

    //create audio context
    audioCtx = new AudioContext();

    // load your external audio
    track = audioCtx.createMediaElementSource(audioElement);

    // create volume node
    const gainNode = audioCtx.createGain();

    const volumeControl = document.querySelector('#volume');
    volumeControl.addEventListener('input', function() {
        gainNode.gain.value = this.value;
    }, false);

    // panning
    // const pannerOptions = { pan: 0 };
    const panner = new StereoPannerNode(audioCtx);

    const pannerControl = document.querySelector('#panner');
    pannerControl.addEventListener('input', function() {
        panner.pan.value = this.value;
    }, false);

    // pannerControl.addEventListener('input', function(e) {
    //     panner.pan.value = this.value;
    // });

    // connect our graph
    track.connect(gainNode).connect(panner).connect(audioCtx.destination);
}

// Track credit: Outfoxing the Fox by Kevin MacLeod under Creative Commons
