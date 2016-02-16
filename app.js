var keys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'a#', 'c#', 'd#', 'f#', 'g#'];
var synth = new AudioSynth;
var piano = synth.createInstrument('piano');

// create key object that does the following:
// have a note property.
// have an event listener.
// future: create new circle body with note property attached.

function Key(note, keyEl) {
  this.note = note;
  this.keyEl = keyEl;
  var that = this;
  this.addListener = function() {
    this.keyEl.addEventListener("click", function(event) {
      event.preventDefault();
      piano.play(that.note, 4, 2);
    });
  }
}

// interate over the keys, create key objects.

for (var i = 0; i < keys.length; i++) {
  var key = new Key(keys[i].toUpperCase(), document.getElementById(keys[i] + 'Key'));
  key.addListener();
};
