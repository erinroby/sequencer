var keys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'a#', 'c#', 'd#', 'f#', 'g#'];
var knobs = ['rotation', 'repulsion', 'gravity'];
var synth = new AudioSynth;
synth.setVolume(0.1337); // Recommended volume setting
var piano = synth.createInstrument('raygun');

function Key(note, keyEl) {
  this.note = note;
  this.keyEl = keyEl;
  var that = this;
  this.addListener = function() {
    this.keyEl.addEventListener("click", function(event) {
      event.preventDefault();
      newCircle(that.note);
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
      console.log(event.target);
      var knobClicked = event.target.id;
      switch (knobClicked) {
        // Reverse Rotation Knob
        case 'knob1':
        angle = -angle;
          break;

        // Repulsion Control Knob
        case 'knob2':
        angle+=.1;
          break;

        // Gravity Changer Knob
        case 'knob3':
        // engine.world.gravity = -engine.world.gravity;
        angle-=.1;
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

function randNum() {
  var MAX=1;
  var MIN=-1;
  return Math.floor(Math.random() * (MAX - MIN)) + MIN;
}
