class Shape {
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

    // global regex used to grab number from transform value
    this.gTransformMatch = /\-?[0-9]*\.?[0-9]*px/gm;

    // garbage cleanup
    this.intervalId = null;
    this.rafId = null;

    // start animation cycle
    this.init();
  }

  /**
   * @description initialize the animation of the icon
   */
  init() {

    // console.log(this)
    // this.intervalId = setInterval(this.animateShape.bind(this),  this.GSPEED_OF_ICONS);
  }

  animateShape() {

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


    // makes the painting much smoother and wont waste memory when the tab
    // isn't open
    cancelAnimationFrame(this.rafId);
    this.rafId = requestAnimationFrame(function() {
      this.icon.style.transform = `translate(${localXPosOffset}px,${localYPos}px)`;
    }.bind(this));
  
  }
}