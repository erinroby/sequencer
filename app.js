var keys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'a#', 'c#', 'd#', 'f#', 'g#'];
var synth = new AudioSynth;
var piano = synth.createInstrument('piano');
var world = Physics();
var contx = document.getElementById("viewport").getContext("2d");

function Polygon(x, y, radius, sides, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.sides = sides;
  this.color = color;
  this.draw = function() {
    var angle = (Math.PI * 2) / this.sides;
    contx.beginPath();
    contx.translate(this.x, this.y);
    for (var i = 0; i < this.sides; i++) {
      contx.lineTo(this.radius * Math.cos(angle * i), this.radius * Math.sin(angle * i));
    };
    contx.closePath();
    contx.strokeStyle = this.color;
    contx.lineWidth = 2;
    contx.stroke();
  };
}

function Ball(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.draw = function() {
    contx.beginPath();
    contx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
    contx.closePath();
    contx.fillStyle = this.color;
    contx.fill();
  };
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
      var circle = new Ball(0, 0, 5, 'blue');
      circle.draw();
      piano.play(that.note, 4, 2); // write an if statement for the octave 3 OR 4 here and refactor to ball object.
    });
  }
}

for (var i = 0; i < keys.length; i++) {
  var key = new Key(keys[i].toUpperCase(), document.getElementById(keys[i] + 'Key'));
  key.addListener();
};

var hexagon = new Polygon(250, 250, 100, 6, 'orange');
hexagon.draw();
