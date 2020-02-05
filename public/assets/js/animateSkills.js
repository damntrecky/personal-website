import Canvas from './BaseCanvas.js';
import Shape from './Shape.js';

// add window event listener to instantiate our canvas
window.addEventListener('load', function() {
  // pass in the id of the canvas we want to target
  let canvas = new Canvas('skills');
  let newShape = new Shape({
    canvas: canvas.canvas,
    ctx: canvas.ctx,
    x: 100,
    y: 100
  });

  newShape.createShape();

  console.log(canvas);
});