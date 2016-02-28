var keys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'a#', 'c#', 'd#', 'f#', 'g#'];
var knobs = ['decrease', 'increase', 'instrument', 'refresh'];
var synth = new AudioSynth;
synth.setVolume(0.1337); // Recommended volume setting
var piano = synth.createInstrument('piano');
var raygun = synth.createInstrument('raygun');
var acoustic = synth.createInstrument('acoustic');
var organ = synth.createInstrument('organ');
var instruments = [piano, acoustic, organ, raygun];
var instrument = 0;

function Key(note, keyEl) {
  this.note = note;
  this.keyEl = keyEl;
  var that = this;
  this.addListener = function() {
    this.keyEl.addEventListener('click', function(event) {
      event.preventDefault();
      new newCircle(that.note);
    });
  }
  this.keyBoard = function() {
    document.addEventListener('keydown', function(event) {
      event.preventDefault();
      switch (event.code) {
        case 'KeyA':
          new newCircle('F');
          break;
        case 'KeyS':
          new newCircle('G');
          break;
        case 'KeyD':
          new newCircle('A');
          break;
        case 'KeyF':
          new newCircle('B');
          break;
        case 'KeyJ':
          new newCircle('C');
          break;
        case 'KeyK':
          new newCircle('D');
          break;
        case 'KeyL':
          new newCircle('E');
          break;
        case 'KeyW':
          new newCircle('F#');
          break;
        case 'KeyE':
          new newCircle('G#');
          break;
        case 'KeyR':
          new newCircle('A#');
          break;
        case 'KeyI':
          new newCircle('C#');
          break;
        case 'KeyO':
          new newCircle('D#');
          break;
        default:
      }
    });
  }
}

for (var i = 0; i < keys.length; i++) {
  var key = new Key(keys[i].toUpperCase(), document.getElementById(keys[i] + 'Key'));
  key.addListener();
};
key.keyBoard();

function Knob(knobEl) {
  this.status = status;
  this.knobEl = knobEl;
  this.addListener = function() {
    this.knobEl.addEventListener('click', function(event) {
      event.preventDefault();
      var knobClicked = event.target.id;
      switch (knobClicked) {
        // Reverse spin direction
        case 'knob1':
          angle*=-1;
          break;
        // Remove side of square.
        case 'knob2':
          removeSide();
          break;
        // Instrument changer
        case 'knob3':
          instrument = randNum(0,instruments.length);
          break;
        // Reset
        case 'knob4':
          window.location.reload();
          break;
      }
    });
  }
}

for (var i = 0; i < knobs.length; i++) {
  var knob = new Knob(document.getElementById('knob'+(i+1)));
  knob.addListener();
}

function randNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
