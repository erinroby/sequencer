var keys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'a#', 'c#', 'd#', 'f#', 'g#'];
var synth = new AudioSynth;
var piano = synth.createInstrument('piano');
var world = Physics();

function Polygon(x, y, radius, sides) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.sides = sides;
  this.drawPolygon = function() {
    var contx = document.getElementById("viewport").getContext("2d");
    var angle = (Math.PI * 2) / this.sides;
    contx.beginPath();
    contx.translate(this.x, this.y);
    for (var i = 0; i < this.sides; i++) {
      contx.lineTo(this.radius * Math.cos(angle * i), this.radius * Math.sin(angle * i));
    };
    contx.closePath();
    contx.stroke();
  };
  this.rotate = function() {

  }
}

//Key object constructor that does the following:
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
      piano.play(that.note, 4, 2); // write an if statement for the octave 3 OR 4 here.
    });
  }
}

// interate over the keys, create key objects.

for (var i = 0; i < keys.length; i++) {
  var key = new Key(keys[i].toUpperCase(), document.getElementById(keys[i] + 'Key'));
  key.addListener();
};

//create hexagon and render.

var hexagon = new Polygon(200, 200, 100, 6);
hexagon.drawPolygon();
