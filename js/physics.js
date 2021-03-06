var MAX_BALLS = 6;

// Matter.js boilerplate
var Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite,
  Composites = Matter.Composites,
  MouseConstraint = Matter.MouseConstraint,
  Events = Matter.Events;

// boilerplate: create a Matter.js engine
var engine = Engine.create({
  render: {
    canvas: document.getElementById('viewport'),
    options: {
      element: document.body,
      width: 600,
      height: 600,
      background: "ffffff",
      wireframes: false,
      showAngleIndicator: false
    }
  }
});

var world = engine.world;

// boilerplate: gravity init
engine.world.gravity.x = 0.1;
engine.world.gravity.y = 0.1;

// mouse-controlled constraint
var mouseConstraint = MouseConstraint.create(engine);
World.add(engine.world, mouseConstraint);

// add boundaries
var side = 0;
var scale = 200;
var stackBoundry = Composites.stack(100, 100, 1, 4, 0, 0, function(x, y) {
  var body;
  switch(side) {
    case 0:
      body = Bodies.rectangle(x, y, 2 * scale, 5, {
        isStatic: true,
        render: {
          fillStyle: 'orange',
          strokeStyle: 'orange',
          lineWidth: 0.5
        }
      });
      break;
    case 1:
      body = Bodies.rectangle(x + 2 * scale - 5, y, 5, 2 * scale, {
        isStatic: true,
        render: {
          fillStyle: 'orange',
          strokeStyle: 'orange',
          lineWidth: 0.5
        }
      });
      break;
    case 2:
      body = Bodies.rectangle(x, y, 2 * scale, 5, {
        isStatic: true,
        render: {
          fillStyle: 'orange',
          strokeStyle: 'orange',
          lineWidth: 0.5
        }
      });
      break;
    case 3:
      body = Bodies.rectangle(x, y - 2 * scale - 5, 5, 2 * scale, {
        isStatic: true,
        render: {
          fillStyle: 'orange',
          strokeStyle: 'orange',
          lineWidth: 0.5
        }
      });
      break;
  }
  side++;
  return body;
});

World.add(world, stackBoundry);

function removeSide() {
  var boundry = Composite.allBodies(stackBoundry);
  var explodeSide = boundry[0];
  Composite.remove(stackBoundry, explodeSide);
}

//add beach balls
// TODO: Make a Ball object elsewhere, and add it here (thomas)
function newCircle(note) {
  this.note = note;
  var ballsInScene = world.bodies;
  if(ballsInScene.length < MAX_BALLS){
    World.add(world, Bodies.circle(300, 300, 10, {
      restitution: 0.99,
      friction: 1,
      frictionAir: 0,
      frictionStatic: Infinity,
      force: { x: 0.01, y: 0.00},
      render: {
        fillStyle: 'blue',
        strokeStyle: 'blue',
        lineWidth: 0.5
      }
    }));
  }
  else {
    // World.add(world, ballsInScene.pop());
    // TODO: Figure out how to make the above line work (thomas)
    ballsInScene.pop(ballsInScene.length);
    World.add(world, Bodies.circle(300, 300, 10, {
      restitution: 0.99,
      friction: 1,
      frictionAir: 0,
      frictionStatic: Infinity,
      force: { x: 0.01, y: 0.00},
      render: {
        fillStyle: 'blue',
        strokeStyle: 'blue',
        lineWidth: 0.5
      }
    }));
  }
  var that = this;
  instrument = localStorage.getItem('tune');
  Events.on(engine, 'collisionStart', function(event) {
    instruments[instrument].play(that.note, 4, 2);
  });
}

//add boundry rotation, basic animation timer boilerplate
var angle = 0.03;
window.setInterval(function() {
  Composite.rotate(stackBoundry, angle, { x: 300, y: 300 });
}, 100);

function randNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// run the engine
Engine.run(engine);
