const ball = {
  x: 400,
  y: 200,
  w: 40,
  h: 40,
  dx: 1,
  dy: 1,
  speed: 6,
  ani: {},
}

const net = {
  x: 420,
  y: 0,
}

function mover() {
  //console.log("mover function");
  ball.x += ball.dx * ball.speed;
  ball.y += ball.dy * ball.speed;

  //to move the ball with new coordinates
  $("#ball").css({ left: `${ball.x}px` });
  $("#ball").css({ top: `${ball.y}px` });

  if (ball.x > 840 - ball.w || ball.x < 0) {
    ball.dx *= -1;
  }

  if (ball.y > 480 - ball.h || ball.y < 0) {
    ball.dy *= -1;
  }

  ball.ani = window.requestAnimationFrame(mover);

}

// canvas and ball are fixed entities of the game, hence no class is used only for Paddles

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
    this.ani = {};
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
    this.y += this.dy * 3;
    //to move the paddle with new coordinates
    $("#paddle1").css({ top: `${this.y}px` });

    if (this.y > 480 - this.paddleHeight || this.y < 0) {
      this.dy *= -1;
    }
    this.ani = window.requestAnimationFrame(this.move);
  };

  reset = () => {
   // console.log("Reset paddle");
    cancelAnimationFrame(this.ani);
    this.setPaddlePosition();
  }

  setPaddlePosition() {
    $(`#${this.id}`).css("top", `160px`);
  }

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

/* ------------------
   reset/postioning functions
   ------------------ */

function setBallPosition() {
  $("#ball").css("left", `400px`);
  $("#ball").css("top", `200px`);
}

function ballReset() {
  cancelAnimationFrame(ball.ani);
  setBallPosition();
}


$(document).ready(function () {
  console.log("It works!");
  setBallPosition();

  $("#net").css("left", `${net.x}px`);
  $("#net").css("top", `${net.y}px`);

  const paddle1 = new Paddle(10, 160, 16, 120, getColour(), 'paddle1');
  paddle1.show();

  const paddle2 = new Paddle(814, 160, 16, 120, getColour(), 'paddle2');
  paddle2.show();

  $(document).on('click', '#start', function (event) {
    $("#start").addClass("hidden");
    $("#reset").removeClass("hidden");
    event.preventDefault();
    ball.ani = window.requestAnimationFrame(mover);
    paddle1.move();
  });

  $(document).on('click', '#reset', function (event) {
    $("#reset").addClass("hidden");
    $("#start").removeClass("hidden");
    event.preventDefault();
    ballReset();
    paddle1.reset();
    paddle2.reset();
  });

  $(document).keydown(function (e) {
    paddle2.handleKeydown(e.key);
  });

});