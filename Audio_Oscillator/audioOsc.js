
// More general style to create context that is compatible with all browsers
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

//create audio context
// const audioContext = new AudioContext();

// create oscillator
const osc = audioContext.createOscillator();
osc.type = 'sine';
// osc.frequency.value = 440; //old style
osc.frequency.setValueAtTime(440, audioContext.currentTime); // value in hertz

const gainNode = audioContext.createGain();
gainNode.gain.value = 0;

osc.connect(gainNode);
gainNode.connect(audioContext.destination);

osc.start();

document.querySelector('#wave').addEventListener('change', (e) => {
    osc.type = e.target.value;
})

document.querySelector('#volume').addEventListener('input', (e) => {
    gainNode.gain.value = e.target.value * 0.01;
})

document.querySelector('#frequency').addEventListener('input', (e) => {
    // osc.frequency.value = e.target.value;
    osc.frequency.setValueAtTime(e.target.value, audioContext.currentTime);
    console.log(osc.frequency.value)
})



