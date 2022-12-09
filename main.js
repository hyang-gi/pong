const b = {
		x:400,
		y:200,
		w:40,
		h:40,
		dx:1,
		dy:1,
		speed:5,
		ani:{}
	}

  function mover(){
    b.x += b.dx * b.speed;
    b.y += b.dy * b.speed;
  
    // console.log("moving");
    
    $("#ball").css({left: `${b.x}px`});
    $("#ball").css({top: `${b.y}px`});
  
    if(b.x > 840-b.w || b.x < 0){
      b.dx *= -1;
    }
  
    if(b.y > 480 - b.h || b.y < 0){
      b.dy *= -1;
    }
  
    b.ani = window.requestAnimationFrame(mover);
    
  }

// canvas and ball is fixed entity of the game, hence no class is used for the same
// class to create paddles

class Paddle {

  constructor(x, y, size, speed, colour, index) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.dx = 1;
    this.dy = 1;
    this.colour = colour;
    this.index = index;
  }
}

$(document).ready(function () {
  console.log("It works!");
  $("#ball").css("left", `${b.x}px`);
  $("#ball").css("top", `${b.y}px`);

  $(document).on('click', 'button', function(event){
		event.preventDefault();
		b.ani = window.requestAnimationFrame(mover);	
	});

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