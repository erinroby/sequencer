var synth = new AudioSynth;
synth.setVolume(0.1337); // Recommended volume setting
var piano = synth.createInstrument('piano');
var raygun = synth.createInstrument('raygun');
var acoustic = synth.createInstrument('acoustic');
var organ = synth.createInstrument('organ');
var synths = [piano, raygun, acoustic, organ];
var soundEls = ['piano', 'raygun', 'acoustic', 'organ'];

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

for (var i = 0; i < synths.length; i++) {
  var tone = new soundBtn(synths[i], document.getElementById(soundEls[i]));
  tone.addListener();
};

// in class assignment data persistence for reference:
// if (!localStorage.getItem("name")) {
//   var name = prompt("what is your name");
//   var cocktail = prompt("What is your cocktail");
//   localStorage.setItem("name", name);
//   localStorage.setItem("cocktail", cocktail);
// }
//
// var name = localStorage.getItem("name");
// var cocktail = localStorage.getItem("cocktail");
// alert("Hello " + name + " here is your " + cocktail);
