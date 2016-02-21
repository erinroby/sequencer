// pass id of note to circle body when key pressed: this.id = this.note;

var noteCircleMapping = {};
var keyPressed = '';

noteCircleMapping[newCircle.id] = keyPressed;

for (circle_id in noteCircleMapping) {
  if (objectInCollision === circle_id) {
    piano.play(noteCircleMapping[circle_id]);
  }
}
