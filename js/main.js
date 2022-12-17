const ball = {
  x: 400,
  y: 200,
  w: 40,
  h: 40,
  dx: 1,
  dy: 1,
  speed: 4,
  ani: {},
  radius: 20,
}

const net = {
  x: 420,
  y: 0,
}

let computer_score = user_score = initial_score = 10;
let highscore, user_wins = computer_wins = 0;
let startTime, endTime;

//assigning number of wins in local storage

window.localStorage.setItem('Computer Wins', computer_wins);
window.localStorage.setItem('User Wins', user_wins);

// canvas and ball are fixed entities of the game, hence class is used only for Paddles

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
    $("#canvas").append(`<div id=${this.id}></div>`);

    $(`#${this.id}`).css("left", `${this.x}px`);
    $(`#${this.id}`).css("top", `${this.y}px`);
    $(`#${this.id}`).css("width", `${this.paddleWidth}px`);
    $(`#${this.id}`).css("height", `${this.paddleHeight}px`);
    $(`#${this.id}`).css("background", `${this.colour}`);
    $(`#${this.id}`).css("position", "absolute");
  }

  move = () => {
    //console.log("computer generated paddle mover function");
    this.y += this.dy * 5;

    //to move the paddle with new coordinates
    $(`#${this.id}`).css({ top: `${this.y}px` });

    if (this.y > 480 - this.paddleHeight || this.y < 0) {
      this.dy *= -1;
    }
    this.ani = window.requestAnimationFrame(this.move);
  };

  reset = () => {
    // console.log("Reset paddle position");
    cancelAnimationFrame(this.ani);
    this.setPaddlePosition();
  }

  pause = () => {
    //console.log("Pause paddle movement");
    cancelAnimationFrame(this.ani);
  }

  setPaddlePosition() {
    //console.log("Set paddle position to initial values");
    $(`#${this.id}`).css("top", `160px`);
  }

  handleKeydown(key) {
    /* console.log("User controlled paddle movement"); 
       console.log(`${key} key is pressed`); */
    if (key === "ArrowUp" && !(this.y < 0)) {
      this.y -= this.dy * 20;
      if (this.y < 0) {
        this.y = 0;
      }
      $(`#${this.id}`).css({ top: `${this.y}px` });
    } else if (key === "ArrowDown" && !(this.y > 480 - this.paddleHeight)) {
      this.y += this.dy * 20;
      if (this.y > 480 - this.paddleHeight) {
        this.y = 360;
      }
      $(`#${this.id}`).css({ top: `${this.y}px` });
    }
  }

  pauseKeydown() {
    $(document).off('keydown');
  }
}

/* ------------------
   helper functions
   ------------------ */

function randomDirection() {
  //console.log("generates random direction from array list");
  const direction = [-1, 1, 1, -1];
  return direction[Math.floor(Math.random() * direction.length)];
}

function randomHelper(min, max) {
  //console.log("gives random values within a range", min+"-"+max);
  return Math.floor(Math.random() * max) + min;
}

function getColour() {
  //console.log("generates random rgb colors, 155-255 to display bright colors only");
  return `rgb(${randomHelper(155, 255)}, ${randomHelper(155, 255)}, ${randomHelper(1, 255)})`;
}

function playSound(id) {
  const audio = $(`#${id}`)[0];
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
}

function stopSound(id) {
  const audio = $(`#${id}`)[0];
  if (!audio) return;
  audio.pause();
  audio.currentTime = 0;
}
/*throttle and debounce in js, throttle -> 
basically it listens to the first call until the delay
*/

const throttle = (func, delay) => {
  let toThrottle = false; //checks whether the duration has passed or not
  return function (...args) { //second func returned by throttle
    if (!toThrottle) {
      toThrottle = true;
      func.apply(this, args);
      setTimeout(() => {
        toThrottle = false;
      }, delay);
    }
  };
};

const changeBallDirection = throttle(() => {
  ball.dx *= -1;
}, 500 / ball.speed); //ball speed is dynamic, to decrease the delay as the speed increases

function collisionDetection(paddle, ball) {
  //console.log("Checks for collision detection between the paddle and ball");
  let paddleLeftOfBall = paddle.x + paddle.paddleWidth <= ball.x;
  let paddleRightOfBall = paddle.x >= ball.x + ball.w;
  let paddleAboveBall = paddle.y + paddle.paddleHeight <= ball.y;
  let paddleBelowBall = paddle.y >= ball.y + ball.h;

  return !(paddleLeftOfBall || paddleRightOfBall || paddleAboveBall || paddleBelowBall);
}

/* ------------------
   reset/postioning functions
   ------------------ */

function setBallPosition() {
  //console.log("sets ball to the initial position");
  $("#ball").css("left", `400px`);
  $("#ball").css("top", `200px`);
}

function ballReset() {
  //console.log("reset ball movement");
  cancelAnimationFrame(ball.ani);
  setBallPosition();
}

function ballPause() {
  //console.log("pauses ball movement");
  cancelAnimationFrame(ball.ani);
}

function displayHighscore() {
  let existing_highscore = JSON.parse(window.localStorage.getItem('Highscore'));
  if (existing_highscore != undefined) {
    $("#highscore").html(`Highscore: ${existing_highscore}`);
  } else {
    $("#highscore").html("Highscore: 0");
  }
}

function displayScores() {
  //console.log("reset the score values");
  computer_score = user_score = initial_score;
  $("#computer_score").text(`${computer_score}`);
  $("#user_score").text(`${user_score}`);
  displayHighscore();
}

function displayWins() {
  //console.log("displays the no of wins on canvas");
  $("#computer_wins").text(`Computer: ${computer_wins}`);
  $("#user_wins").text(`User: ${user_wins}`);
}

function startScoreTracking() {
  startTime = new Date();
  //console.log(startTime);
};

function endScoreTracking() {
  endTime = new Date();
  var timeDiff = endTime - startTime;
  timeDiff /= 1000;
  var seconds = Math.round(timeDiff);
  //console.log({seconds});
  highscore = seconds;
  let existing_highscore = JSON.parse(window.localStorage.getItem('Highscore'))
  if (existing_highscore != undefined) {
    if (existing_highscore > highscore) {
      $("#highscore").html(`Highscore: ${existing_highscore}`);
    } else {
      window.localStorage.setItem('Highscore', highscore);
      $("#highscore").html(`Highscore: ${highscore}`);
    }
  } else {
    window.localStorage.setItem('Highscore', highscore);
    $("#highscore").html(`Highscore: ${highscore}`);
  }
}

$(document).ready(function () {
  console.log("It works!");

  setBallPosition();
  displayScores();
  displayWins();

  $("#net").css("left", `${net.x}px`);
  $("#net").css("top", `${net.y}px`);

  const paddle1 = new Paddle(10, 160, 16, 200, getColour(), "paddle1");
  paddle1.show();

  const paddle2 = new Paddle(814, 160, 16, 120, getColour(), "paddle2");
  paddle2.show();

  function mover() {
    //console.log("mover function");
    ball.x += ball.dx * ball.speed;
    ball.y += ball.dy * ball.speed;

    //to move the ball with new coordinates
    $("#ball").css({ left: `${ball.x}px` });
    $("#ball").css({ top: `${ball.y}px` });

    if (ball.x > 840 - ball.w) {
      //console.log("user missed ball");
      if (user_score > 0) {
        user_score -= 1;
        $("#user_score").text(`${user_score}`);
      }
      ball.x = 400;
      ball.y = randomHelper(48, 360);
      ball.speed = 4;
      ball.dx = randomDirection();
    }

    if (ball.x < 0) {
      //console.log("computer missed ball");
      if (computer_score > 0) {
        computer_score -= 1;
        $("#computer_score").text(`${computer_score}`);
      }
      ball.x = 400;
      ball.y = randomHelper(48, 360);
      ball.speed = 4;
      ball.dx = randomDirection();
    }

    if (ball.y > 480 - ball.h || ball.y < 0) {
      ball.dy *= -1;
    }

    let collision1 = collisionDetection(paddle1, ball);
    let collision2 = collisionDetection(paddle2, ball);

    if (collision1 || collision2) {
      //console.log("collision between paddle-ball detected");
      playSound("collision_audio");
      ball.speed += 1;
      changeBallDirection();
    }
    // condition to check to end game and declare winner
    if (user_score === 0) {
      //console.log("computer wins!");
      $("#winner_declaration").text("Computer Wins!");
      computer_wins = JSON.parse(window.localStorage.getItem('Computer Wins')) + 1;
      window.localStorage.setItem('Computer Wins', computer_wins);
      $("#computer_wins").text(`Computer: ${computer_wins}`);
      gameOver();
      return;
    } else if (computer_score === 0) {
      //console.log("user wins!");
      $("#winner_declaration").text("User Wins!");
      user_wins = JSON.parse(window.localStorage.getItem('User Wins')) + 1;
      window.localStorage.setItem('User Wins', user_wins);
      $("#user_wins").text(`User: ${user_wins}`);
      gameOver();
      return;
    }
    ball.ani = window.requestAnimationFrame(mover);
  }

  function startGame() {
    //console.log("start game function");
    stopSound("game_over_audio");
    playSound("game_start_audio");
    startScoreTracking();
    ball.ani = window.requestAnimationFrame(mover);
    paddle1.move();
    activateKeyDown();
  }

  function gameOver() {
    //console.log("game over!");
    endScoreTracking();
    playSound("game_over_audio");
    ballPause();
    paddle1.pause();
    paddle2.pauseKeydown();
    $("#reset").addClass("hidden");
    $("#play_again").removeClass("hidden");
    $("#game_over_wrapper").removeClass("hidden");
  }

  function refreshGame() {
    //console.log("refresh game function");
    ballReset();
    paddle1.reset();
    activateKeyDown();
    displayScores();
  }

  $(document).on("click", "#start", function (event) {
    //console.log("start game button clicked");
    event.preventDefault();
    $("#welcome_wrapper").addClass("hidden");
    setTimeout(function () {
      //console.log("delay before game starts");
      $("#start").addClass("hidden");
      $("#play_again").addClass("hidden");
      $("#reset").removeClass("hidden");
      startGame();
    }, 200);
  });

  $(document).on("click", "#reset", function (event) {
    //console.log("reset game button clicked");
    setTimeout(function () {
      $("#reset").addClass("hidden");
      $("#play_again").addClass("hidden");
      $("#start").removeClass("hidden");
      refreshGame();
    }, 200);
    event.preventDefault();
  });

  $(document).on("click", "#play_again", function (event) {
    //console.log("reset game button clicked");
    $("#game_over_wrapper").addClass("hidden");
    $("#play_again").addClass("hidden");
    $("#start").addClass("hidden");
    $("#reset").removeClass("hidden");
    event.preventDefault();
    refreshGame();
    startGame();
  });

  function activateKeyDown() {
    $(document).keydown(function (e) {
      //console.log("user controlled key event listener", e)
      paddle2.handleKeydown(e.key);
    });
  }

});