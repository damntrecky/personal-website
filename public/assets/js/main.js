window.addEventListener('load', () => {
  // friendly note to the users
  console.log('%cWelcome to %cNick damntrecky\'s%c website', 'color:#777;font-size:12px;', 'color:#6772e5;font-size:14px;', 'color:#777;font-size:14px;');

  // this script will get all the icons and animate them
  const iconsToAnimate = document.querySelectorAll('.icon');
  const classIcons = [];
  [...iconsToAnimate].forEach(icon => {
    classIcons.push(new AnimateIcon(icon));
  });

  setInterval(function() {
    classIcons.forEach(shape => {
      shape.animateShape();
    })
  }, 200);

});
