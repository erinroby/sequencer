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
    this.keyEl.addEventListener('click', function(event) {
      event.preventDefault();
      new newCircle(that.note);
    });
  }
  this.keyBoard = function() {
    document.addEventListener('keydown', function(event) {
      event.preventDefault();
      console.log(event.target);
      switch (event.code) {
        case 'KeyA':
          console.log('test')
          new newCircle('F');
          break;
        case 'KeyS':
          console.log('test2')
          new newCircle('G');
          break;
        case 'KeyD':
          console.log('test3')
          new newCircle('A');
          break;
        case 'KeyF':
          console.log('test4')
          new newCircle('B');
          break;
        case 'KeyJ':
          console.log('test5')
          new newCircle('C');
          break;
        case 'KeyK':
          console.log('test6')
          new newCircle('D');
          break;
        case 'KeyL':
          console.log('test7')
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
          document.location.reload(true);
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
