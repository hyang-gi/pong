const b = {
  x: 400,
  y: 200,
  w: 40,
  h: 40,
  dx: 1,
  dy: 1,
  speed: 6,
  ani: {}
}

function mover() {
  //console.log("mover function");
  b.x += b.dx * b.speed;
  b.y += b.dy * b.speed;

  //to move the ball with new coordinates
  $("#ball").css({ left: `${b.x}px` });
  $("#ball").css({ top: `${b.y}px` });

  if (b.x > 840 - b.w || b.x < 0) {
    b.dx *= -1;
  }

  if (b.y > 480 - b.h || b.y < 0) {
    b.dy *= -1;
  }

  b.ani = window.requestAnimationFrame(mover);

}

// canvas and ball is fixed entity of the game, hence no class is used for the same
// class to create paddles

class Paddle {

  constructor(x, y, paddleWidth, paddleHeight, colour, id) {
    this.x = x;
    this.y = y;
    this.paddleWidth = paddleWidth;
    this.paddleHeight = paddleHeight;
    this.dx = 1;
    this.dy = 1;
    this.colour = colour;
    this.id = id;
  }

  show() {
    // console.log("paddle show");
    $('#canvas').append(`<div id=${this.id}></div>`);

    $(`#${this.id}`).css('left', `${this.x}px`);
    $(`#${this.id}`).css('top', `${this.y}px`);
    $(`#${this.id}`).css('width', `${this.paddleWidth}px`);
    $(`#${this.id}`).css('height', `${this.paddleHeight}px`);
    $(`#${this.id}`).css('background', `${this.colour}`);
    $(`#${this.id}`).css('position', "absolute");
  }

  move = () => {
    //console.log("paddle mover function");
    console.log("PADDLE MOVER", this.y)
    this.y += this.dy * 3;
    //to move the ball with new coordinates
    $("#paddle1").css({ top: `${this.y}px` });

    if (this.y > 480 - this.paddleHeight || this.y < 0) {
      this.dy *= -1;
    }
    window.requestAnimationFrame(this.move);
  };

  handleKeydown(key) {
    //  console.log(`${key} key is pressed`);
    if (key === "ArrowUp" && !(this.y < 0)) {
      this.y -= this.dy * 6;
      $(`#${this.id}`).css({ top: `${this.y}px` });
    } else if (key === "ArrowDown" && !(this.y > 480 - this.paddleHeight)) {
      this.y += this.dy * 6;
      $(`#${this.id}`).css({ top: `${this.y}px` });
    }
  }
}


/* ------------------
   helper functions
   ------------------ */

function randomHelper(min, max) {
  return Math.floor(Math.random() * max) + min;
}

function getColour() {
  return `rgb(${randomHelper(155, 255)}, ${randomHelper(155, 255)}, ${randomHelper(1, 255)})`;
}


$(document).ready(function () {
  console.log("It works!");
  $("#ball").css("left", `${b.x}px`);
  $("#ball").css("top", `${b.y}px`);

  const paddle1 = new Paddle(10, 160, 25, 100, getColour(), 'paddle1');
  paddle1.show();

  const paddle2 = new Paddle(805, 160, 25, 100, getColour(), 'paddle2');
  paddle2.show();

  $(document).on('click', 'button', function (event) {
    event.preventDefault();
    b.ani = window.requestAnimationFrame(mover);
    paddle1.move();
  });

  $(document).keydown(function (e) {
    paddle2.handleKeydown(e.key);
  });

});