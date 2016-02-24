var keys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'a#', 'c#', 'd#', 'f#', 'g#'];
var knobs = ['decrease', 'increase', 'instrument'];
var synth = new AudioSynth;
synth.setVolume(0.1337); // Recommended volume setting
var piano = synth.createInstrument('piano');
var raygun = synth.createInstrument('raygun');
var acoustic = synth.createInstrument('acoustic');
var organ = synth.createInstrument('organ');
var instruments = [piano, raygun, acoustic, organ];
var instrument = 0;

function Key(note, keyEl) {
  this.note = note;
  this.keyEl = keyEl;
  var that = this;
  this.addListener = function() {
    this.keyEl.addEventListener("click", function(event) {
      event.preventDefault();
      new newCircle(that.note);
    });
  }
}

for (var i = 0; i < keys.length; i++) {
  var key = new Key(keys[i].toUpperCase(), document.getElementById(keys[i] + 'Key'));
  key.addListener();
};

function Knob(knobEl) {
  this.status = status;
  this.knobEl = knobEl;
  this.addListener = function() {
    this.knobEl.addEventListener('click', function(event) {
      event.preventDefault();
      var knobClicked = event.target.id;
      switch (knobClicked) {
        // Increase counter-clockwise spin
        case 'knob1':
          angle-=0.05;
          break;
        // Increase clockwise spin
        case 'knob2':
          angle+=0.05;
          break;
        // Instrument changer
        case 'knob3':
          instrument = randNum(0,instruments.length);
          break;
        default:
      }
    });
  }
}

for (var i = 0; i < knobs.length; i++) {
  var knob = new Knob(document.getElementById('knob'+(i+1)));
  knob.addListener();
}

function randNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
