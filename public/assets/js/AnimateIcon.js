class AnimateIcon {
  constructor(domRef) {
    // grab reference to dom node
    this.icon = domRef;
    // initialize globals
    // global speed of icons yo
    this.GSPEED_OF_ICONS = 122;
    // Delta range of random offset (used as a multiplier)
    this.GX_OFFSET_RANGE = 5;
    this.GY_OFFSET_RANGE = 4;
    this.GY_STARTING_OFFSET = 2;
    // define a starting position for ALL icons
    this.startingPos = this.icon.getBoundingClientRect().right;
    // this.gXPos = this.startingPos + window.innerWidth;
    this.gXPos = 0;
    this.gYPos = 0;
    
    this.TOUCH_START = false;
    this.TOUCH_MOVING = false;
    this.mouseX = 0;

    // global regex used to grab number from transform value
    this.gTransformMatch = /\-?[0-9]*\.?[0-9]*px/gm;

    // garbage cleanup
    this.intervalId = null;
    this.rafId = null;

    // start animation cycle
    this.init();
  }


  // LIFECYCLE HOOKS
  // _______________

  /**
   * @description initialize the animation of the icon
   */
  init() {
    this.startAnimationInterval();
    console.log(this.icon);
    // add event listeners
    let mouseDownRef = this.icon.addEventListener('mousedown', this._handleMouseDown.bind(this));
    let mouseMoveRef = window.addEventListener('mousemove', this._handleMouseMove.bind(this));
    let mouseUpRef = window.addEventListener('mouseup', this._handleMouseUp.bind(this));
  }

  disconnectedCallback() {
    window.removeEventListener(this.mouseUpRef);
  }

  // PUBLIC METHODS
  // _______________

  /**
   * @description Set the interval to animate the icon
   */
  startAnimationInterval() {
    this.clearAnimationInterval();
    this.intervalId = setInterval(this._animateShapeAtRandom.bind(this),  this.GSPEED_OF_ICONS);
  }

  /**
   * @description Remove the interval for animating the icon
   */
  clearAnimationInterval() {
    clearInterval(this.intervalId);
  }

  /**
   * @description Initiate the transform of the icon
   * @param {*} x - new x position to translate to
   * @param {*} y - new y position to translate to
   */
  animateIcon(x,y) {
    // makes the painting much smoother and wont waste memory when the tab
    // isn't open if we use RAF
    cancelAnimationFrame(this.rafId);
    this.rafId = requestAnimationFrame(function() {
      this.icon.style.transform = `translate(${x}px,${y}px)`;
    }.bind(this));
  }


  // PRIVATE METHODS
  // _______________

  /**
   * @description Randomly animation the shape
   */
  _animateShapeAtRandom() {

    // grab an initial starting position
    this.gXPos -= Math.random();
    this.gYPos = (Math.random() * this.GY_STARTING_OFFSET);
    // go through icons to animate them

    // apply an offset to the current position and the 
    // global incremental position. The global incremental position
    // is used as a started point for the delta offset applied later
    let currentTransformVal = this.icon.style.transform;
    let currentTranslatedPosition = currentTransformVal.match(this.gTransformMatch);

    // generate horizontal random delta movement
    let localXPosOffset = this.gXPos - (Math.random() * this.GX_OFFSET_RANGE);
    this.gXPos = localXPosOffset;
    
    let boundingClient = this.icon.getBoundingClientRect();

    if (boundingClient.right < -200) {
      this.gXPos = window.innerWidth + this.startingPos;
      // this.icon.setAttribute('hidden', '');
    } 
    
    // try to hide icons as they animate back across
    // else if (boundingClient.x < window.innerWidth) {
    //   this.icon.removeAttribute('hidden');
    // }


    // generate v ertical random delta movement
    let localYPosOffset = (Math.random() * this.GY_OFFSET_RANGE) + this.gYPos;
    let localYPos = Math.random() ? -localYPosOffset : localYPosOffset;

    this.animateIcon(this.gXPos, localYPos);
  }


  // EVENT LISTENERS
  // _______________
  
  /**
   * @description Start initializing variables for 
   * mouse dragging and touch
   * @param {*} e - Native mousedown event object.
   */
  _handleMouseDown(e) {
    console.log('mousedown');
    this.TOUCH_START = true;
    this.mouseX = e.x;
    this.clearAnimationInterval();
  }

  /**
   * @description Animate the icon to follow mouse position.
   * @param {*} e 
   */
  _handleMouseMove(e) {
    if (this.TOUCH_START || this.TOUCH_MOVING) {
      this.TOUCH_MOVING = true;
      console.log('mousemove');
      let currentTranslatedPosition = this.icon.style.transform.match(this.gTransformMatch);
      let xVal = e.x - this.mouseX;
      let yPos = currentTranslatedPosition[1].split('px')[0];
      console.log(xVal, yPos);
      this.animateIcon(xVal, yPos);
    } 
  }

  /**
   * @description 
   * @param {*} e 
   */
  _handleMouseUp(e) {
    console.log('mouseup');
    this.TOUCH_START = false;
    this.TOUCH_MOVING = false;
    this.startAnimationInterval();
  }
}