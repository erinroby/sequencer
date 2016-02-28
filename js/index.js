var synth = new AudioSynth;
synth.setVolume(0.1337); // Recommended volume setting
var piano = synth.createInstrument('piano');
var raygun = synth.createInstrument('raygun');
var acoustic = synth.createInstrument('acoustic');
var organ = synth.createInstrument('organ');
var instruments = [piano, acoustic, organ, raygun];

var soundEls = ['pianoEl', 'acousticEl', 'organEl', 'raygunEl'];
var next = document.getElementById('nextEl');

function soundBtn(sound, btnEl) {
  this.sound = sound;
  this.btnEl = btnEl;
  var that = this;
  this.addListener = function() {
    this.btnEl.addEventListener("click", function(event) {
      event.preventDefault();
      that.sound.play('C', 4 ,2);
    });
  }
}

for (var i = 0; i < instruments.length; i++) {
  var tone = new soundBtn(instruments[i], document.getElementById(soundEls[i]));
  tone.addListener();
};

next.addEventListener('click', function(event) {
  var instrumentSelect = document.getElementById('instrumentEl');
  localStorage.setItem("tune", parseInt(instrumentSelect.value, 10)); // radixs
  location.assign("sequencer.html");
});
