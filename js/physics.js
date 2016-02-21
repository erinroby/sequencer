// Matter.js boilerplate
var Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite,
  Composites = Matter.Composites;

// boilerplate: create a Matter.js engine
// var canvasEl = document.getElementById('viewport');
// document.body = canvasEl;

var engine = Engine.create(document.body, {
  render: {
    options: {
      wireframes: false,
      showAngleIndicator: false
    }
  }
});

var world = engine.world;

// boilerplate: gravity init
engine.world.gravity.x = 0;
engine.world.gravity.y = 0;

// add boundaries
var side = 0;
var scale = 200;
var stackBoundry = Composites.stack(100, 100, 1, 4, 0, 0, function(x, y) {
  var body;
  switch(side) {
    case 0:
      body = Bodies.rectangle(x, y, 2 * scale, 5, {
        isStatic: true
      });
      break;
    case 1:
      body = Bodies.rectangle(x + 2 * scale - 5, y, 5, 2 * scale, {
        isStatic: true
      });
      break;
    case 2:
      body = Bodies.rectangle(x, y, 2 * scale, 5, {
        isStatic: true
      });
      break;
    case 3:
      body = Bodies.rectangle(x, y - 2 * scale - 5, 5, 2 * scale, {
        isStatic: true
      });
      break;
  }
  side++;
  return body;
});

World.add(world, stackBoundry);

//add beach balls -- moved to keyboard event listener
function newCircle() {
   World.add(world, Bodies.circle(300, 300, 10, {
     restitution: 1,
     friction: 0,
     frictionAir: 0,
     frictionStatic: 0,
     force: { x: 0.01, y: 0.01}
   }));
}

//add boundry rotation, basic animation timer boilerplate
var angle = 0.01;
window.setInterval(function() {
  Composite.rotate(stackBoundry, angle, { x: 300, y: 300 });
}, 100);

// run the engine
Engine.run(engine);
