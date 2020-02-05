// global speed of icons yo
var GSPEED_OF_ICONS_X = 50;
var GSPEED_OF_ICONS_Y = 350;
// Delta range of random offset (used as a multiplier)
var GX_OFFSET_RANGE = 3;
var GY_OFFSET_RANGE = 5;
var GY_STARTING_OFFSET = 2;

// this script will get all the icons and animate them
const iconsToAnimate = document.querySelectorAll('.icon');
// set interval for icon animation
let iconIntervalIdX = null;
let iconIntervalIdY = null;
// define a starting position for ALL icons
let gXPos = 0;
let gYPos = 0;
// global regex used to grab number from transform value
const gTransformMatch = /\-?[0-9]*\.?[0-9]*px/gm;

let changeYAxisTimeout = 0;

// loop through icons and animate them
iconIntervalIdX = setInterval(() => {

  // grab an initial starting position
  gXPos -= Math.random();
  gYPos = (Math.random() * GY_STARTING_OFFSET);
  // go through icons to animate them
  [...iconsToAnimate].forEach(icon => {
    // apply an offset to the current position and the 
    // global incremental position. The global incremental position
    // is used as a started point for the delta offset applied later
    let currentTransformVal = icon.style.transform;
    let currentTranslatedPosition = currentTransformVal.match(gTransformMatch);

    // generate horizontal random delta movement
    let localXPosOffset = gXPos - (Math.random() * GX_OFFSET_RANGE);

    // generate v ertical random delta movement
    let localYPosOffset = (Math.random() * GY_OFFSET_RANGE) + gYPos;
    let localYPos = Math.random() ? -localYPosOffset : localYPosOffset;

    // let newXPos = Number(currentTranslatedPosition[0]) - lo
    // console.log(currentTranslatedPosition)
    requestAnimationFrame(() => {
      icon.style.transform = `translate(${localXPosOffset}px,${localYPos}px)`;
    });
    changeYAxisTimeout++;
  })
}, GSPEED_OF_ICONS_X);

// friendly note to the users
console.log('%cWelcome to %cNick damntrecky\'s%c website', 'color:#777;font-size:12px;', 'color:#6772e5;font-size:14px;', 'color:#777;font-size:14px;');