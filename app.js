/**
 * PhysicsJS by Jasper Palfree <wellcaffeinated.net>
 * http://wellcaffeinated.net/PhysicsJS
 *
 * Simple "Hello world" example
 */

(function(){console.log("this ran");}())

Physics(function(world){

// This is the canvas size
// TODO: Make responsive instead of hardcoding (Thomas)
  var viewWidth = 300;
  var viewHeight = 300;

  var renderer = Physics.renderer('canvas', {
    el: 'viewport',
    width: viewWidth,
    height: viewHeight,
    meta: false // don't display meta data
    ,styles: {
        // set colors for the ball bodies
        'circle' : {
            strokeStyle: 'blue',
            lineWidth: 1,
            fillStyle: 'red',
            angleIndicator: 'white'
        }
    }
  });

  // add the renderer
  world.add(renderer);
  // render on each step
  world.subscribe('step', function(){
    world.render();
  });

  // bounds of the window
  var viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);
  // var rect1 = Physics.aabb(0, 100, 300, 200);
  // var rect2 = Physics.aabb(100, 0, 200, 300);
  // var viewportBounds = Physics.aabb.union(rect1, rect2, true);

  // constrain objects to these bounds
  world.add(Physics.behavior('edge-collision-detection', {
      aabb: viewportBounds,
      restitution: 0.99,
      cof: 0.00
  }));

  var smallBall = Physics.body('circle', {
    x: 1,
    y: 1,
    vx: 0.2,
    vy: 0.01,
    radius: 2.0,
    treatment: 'dynamic'
  })

  var bigBall = Physics.body('circle', {
    x: 60,
    y: 150,
    vx: 0.5,
    vy: 0.01,
    radius: 10
  })

  // add the ball(s)
  world.add(smallBall);
  world.add(bigBall);

  // Add behaviors
  world.add([
    // Make objects bounce off canvas bounds
    Physics.behavior('body-impulse-response'),
    // Add Gravity to pull objects downward
    Physics.behavior('constant-acceleration'),
    // Make bodies bounce off each other
    Physics.behavior('body-collision-detection'),
    Physics.behavior('sweep-prune')
  ]);

  // subscribe to ticker to advance the simulation
  Physics.util.ticker.subscribe(function( time, dt ){

      world.step( time );
  });

  // start the ticker
  Physics.util.ticker.start();

});
