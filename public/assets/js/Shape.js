import Canvas from './BaseCanvas.js';

class Shape {
  constructor({canvas, ctx, x, y}) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.startXPos = x;
    this.startYPos = y;
    this.xPos = x;
    this.yPos = y;
  }
  
  createShape() {
    this.ctx.fillStyle = 'green';
    this.ctx.fillRect(10, 10, 150, 100);
    console.log('In CreateShape', this)
  }

  /**
   * @description Update the x/y position of the
   * objects.
   */
  updatePosition() {
    // if we are out of bounds reset
    if (this.xPos < -150) this.xPos = this.startXPos;
    
    this.xPos = this.generateMovement(this.xPos);
  }

  /**
   * @description Generate a random interval number
   * and return that updated position.
   * @param {*} position 
   */
  generateMovement(position) {
    const MAX_BOUND = 10;

    return position + Math.floor(Math.random() * MAX_BOUND);
  }
}

export default Shape