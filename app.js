/**
 * PhysicsJS by Jasper Palfree <wellcaffeinated.net>
 * http://wellcaffeinated.net/PhysicsJS
 *
 * Simple "Hello world" example
 */

Physics(function(world){
  // Define the canvas bounds
  var viewWidth = window.innerWidth;
  var viewHeight = window.innerHeight;

  // Define canvas
  var renderer = Physics.renderer('canvas', {
    el: 'viewport',
    width: viewWidth,
    height: viewHeight,
    meta: true // don't display meta data
    ,styles: {
        // set colors for the bodies
        'circle' : {
            strokeStyle: 'blue',
            lineWidth: 1,
            fillStyle: 'red',
            angleIndicator: 'white'
        },

        'rectangle' : {
          fillStyle: 'gray'
        }
    }
  });

  // Create Axis-Aligned Bounding Box (aabb)
  var viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight)
      ,edgeBounce
      ,renderer;

  // Recalculate the bounds when the window is resized
  window.addEventListener('resize', function() {
    viewportBounds = Physics.aabb(0, 0, renderer.width, renderer.height);
    edgeBounce.setAABB(viewportBounds);
  }, true);

  // add the renderer
  world.add(renderer);
  // render on each step
  world.on('step', function(){
    world.render();
  });

  // Create ball objects
  var smallBall = Physics.body('circle', {
    x: 71,
    y: 91,
    vx: 0.2,
    vy: 0.01,
    radius: 20,
    treatment: 'dynamic'
  })
  var bigBall = Physics.body('circle', {
    x: 60,
    y: 150,
    vx: 0.5,
    vy: 0.01,
    radius: 50,
    treatment: 'dynamic'
  })

  // Add the ball(s) to the world
  world.add([
    smallBall,
    bigBall,
  ]);

  // Create hexagon-shaped bounds.
  // TODO: Create it as a CompoundBody that has polygon children representing each quadrant of the hexagon-shaped bounds
  var hex1 = Physics.body('rectangle', {
    x: 400,
    y: 50,
    width: viewWidth*2,
    height: 100
    ,treatment: 'static'
  })
  var hex2 = Physics.body('rectangle', {
    x: 400,
    y: viewHeight,
    width: viewWidth*2,
    height: 100
    ,treatment: 'static'
  })
  var hex3 = Physics.body('rectangle', {
    x: 50,
    y: 100,
    width: 100,
    height: viewHeight*2
    ,treatment: 'static'
  })
  var hex4 = Physics.body('rectangle', {
    x: 1240,
    y: 100,
    width: 100,
    height: viewHeight*2
    ,treatment: 'static'
  })

  // var bigBound = Physics.body('compound', {
  //   // x: 300,
  //   // y: 300,
  //   children: [
  //               hex1,
  //               hex2,
  //               hex3,
  //               hex4
  //                   ]
  // });

  world.add(hex1);
  world.add(hex2);
  world.add(hex3);
  world.add(hex4);



  // Add behaviors to the world
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
  Physics.util.ticker.on(function( time, dt ){

      world.step( time );
  });

  // start the ticker
  Physics.util.ticker.start();

});
