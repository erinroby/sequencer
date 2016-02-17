/**
 * PhysicsJS by Jasper Palfree <wellcaffeinated.net>
 * http://wellcaffeinated.net/PhysicsJS
 *
 * Simple "Hello world" example
 */

Physics(function(world){
  // Define the canvas bounds
  var viewWidth = 300;
  var viewHeight = 300;

  // Define canvas
  var renderer = Physics.renderer('canvas', {
    el: 'viewport',
    width: viewWidth,
    height: viewHeight,
    meta: true // display meta data?
    ,styles: {
        // set colors for the bodies
        // 'circle' : {
        //     strokeStyle: 'blue',
        //     lineWidth: 1,
        //     fillStyle: 'red',
        //     angleIndicator: 'white'
        // },

        'rectangle' : {
          fillStyle: 'black'
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
  var ball1 = Physics.body('circle', {
    x: 71,
    y: 91,
    vx: 0.2,
    vy: 0.01,
    radius: 5,
    treatment: 'dynamic',
    strokeStyle: 'blue',
    lineWidth: 1,
    fillStyle: '#0xa42222',
    angleIndicator: 'white'
  })
  var ball2 = Physics.body('circle', {
    x: 60,
    y: 150,
    vx: 0.5,
    vy: 0.01,
    radius: 5,
    treatment: 'dynamic'
  })
  var ball3 = Physics.body('circle', {
    x: 100,
    y: 120,
    vx: 0.5,
    vy: 0.01,
    radius: 5,
    treatment: 'dynamic'
  })

  // Add the ball(s) to the world
  world.add([
    ball1,
    ball2,
    ball3
  ]);

  // Create hexagon-shaped bounds.
  // TODO: Create it as a CompoundBody that has polygon children representing each quadrant of the hexagon-shaped bounds
  var hex1 = Physics.body('rectangle', {
    x: 0,
    y: 0,
    width: viewWidth*2,
    height: 1,
    treatment: 'static'
  })
  var hex2 = Physics.body('rectangle', {
    x: 0,
    y: 300,
    width: viewWidth*2,
    height: 1,
    treatment: 'static'
  })
  var hex3 = Physics.body('rectangle', {
    x: 0,
    y: 0,
    width: 1,
    height: viewHeight*2,
    treatment: 'static'
  })
  var hex4 = Physics.body('rectangle', {
    x: 300,
    y: 0,
    width: 1,
    height: viewHeight*2,
    treatment: 'static'
  })

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
