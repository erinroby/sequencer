var keys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'a#', 'c#', 'd#', 'f#', 'g#'];
var synth = new AudioSynth;
var piano = synth.createInstrument('piano');

function Key(note, keyEl) {
  this.note = note;
  this.keyEl = keyEl;
  var that = this;
  this.addListener = function() {
    this.keyEl.addEventListener("click", function(event) {
      event.preventDefault();
      World.add(world, Bodies.circle(300, 300, 10, {
        restitution: 1,
        friction: 0,
        frictionAir: 0,
        frictionStatic: 0,
        force: { x: 0.01, y: 0.01}
      }));
      piano.play(that.note, 4, 2); // write an if statement for the octave 3 OR 4 here and refactor to ball object. How to pass to new ball?
    });
  }
}

for (var i = 0; i < keys.length; i++) {
  var key = new Key(keys[i].toUpperCase(), document.getElementById(keys[i] + 'Key'));
  key.addListener();
};

// var aNewBodyElement = document.createElement("body");
