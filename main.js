$(document).ready(function () {
  console.log("It works!");

  let ballX = 300;
  let ballY = 200;

  $("#ball").css("left", `${ballX}px`);
  $("#ball").css("top", `${ballY}px`);

});

/*TODO 

Create paddles
Move the ball
Collision should bounce the ball back
Set up a counter
if ball goes behind paddles, decrease counter
add event listener to paddles
movement of one of the paddles is computer generated
event listener for start game, reset game

*/