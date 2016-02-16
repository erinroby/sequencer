var Synth = new AudioSynth;
var piano = Synth.createInstrument('piano');
var cKey = document.getElementById('cKey');

cKey.addEventListener("click", function(event) {
  event.preventDefault();
  piano.play('C', 4, 2);
});
