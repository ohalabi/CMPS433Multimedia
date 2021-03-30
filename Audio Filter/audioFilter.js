
// instigate our audio context

const QUAL_MUL =30;

//create audio context for cross browsers
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx;
let isPlaying = false;

// load some sound
const audioElement = document.querySelector('audio');
let track;

const playButton = document.querySelector('#play_button');

// play pause audio
playButton.addEventListener('click', function() {
    if(!audioCtx) {
        init();
    }

    // check if context is in suspended state (autoplay policy)
    if (audioCtx.state == 'suspended') {
        audioCtx.resume();
    }

    if (!isPlaying) {
        audioElement.play();
        audioElement.loop = true;
        isPlaying = true;
        // if track is playing pause it
    } else if (isPlaying) {
        audioElement.pause();
        isPlaying = false;
    }
}, false);


function init() {
    audioCtx = new AudioContext();

    //create sound source which link to my audio file
    track = audioCtx.createMediaElementSource(audioElement);

    //creating lowpass filter
    var filter = audioCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 5000;

    document.querySelector('#frequency').addEventListener('input', function(e) {
        var minValue = 40;
        var maxValue = audioCtx.sampleRate / 2; //original audio
        // Logarithm (base 2) to compute how many octaves fall in the range.
        var numberOfOctaves = Math.log(maxValue / minValue) / Math.LN2;
        // Compute a multiplier from 0 to 1 based on an exponential scale.
        var multiplier = Math.pow(2, numberOfOctaves * (this.value - 1.0));
        // Get back to the frequency value between min and max.
        filter.frequency.value = maxValue * multiplier;
        // console.log(this.value);
    });

    document.querySelector('#quality').addEventListener('input', function(e) {
        filter.Q.value = this.value * QUAL_MUL;
        console.log(this.value);
    });

    // connect our graph
    track.connect(filter).connect(audioCtx.destination);
}

// Track credit: Outfoxing the Fox by Kevin MacLeod under Creative Commons
