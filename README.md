## [Pong Game Website Link](https://www.scss.tcd.ie/~mohsins/cw7025_december_2022)

The above linked game has been developed for the first semester final assignment for Programming for Digital Media module. Enjoy playing the game. :D

Below is a detailed description of the assignment criteria and the process followed.

## Assignment

- Have one computer-operated bat and one user-operated bat
- If the user or the computer misses a ball they get one point deducted - from their total (start with 10 each)
- First one to 0 loses
- Show/keep track of the number of times the player won and the number of - times the computer won 

## Additional Criteria

* Does it work? Are there no glitches?
* Structuring your solution properly: javascript files in the correct folder, css, images if needed. Is everything sourced properly in the HTML?
* Legibility of the code. Use correct indentation and spacing, is there lots of code commented out?
* The right amount of abstraction, containing the right variables and functions.
* Correctly naming variables and functions.
* Record how long it takes (seconds) before you win a game and store that as your high score.
* Use of jQuery.
* Correctly using classes.
* Creativity, what can you do to wow the gamer? Think sound effects, graphics, boosts (temporary larger paddle, bigger ball), other?

## Process Description

### Game Set Up

- The page is initialised with all the default values, the positioning of the paddle and ball is done accordingly. 
- The left paddle is controlled by the computer and the right is controlled by the user.
- There are three active buttons (Start, Reset and Play Again) on the screen which get displayed according to various stages of the game.
- Audio sounds have been provived for start game, collision, and game over points.

### Ball & Paddles

- To create the canvas and the ball, which are fixed entities of the game, divs in HTML are defined and corresponding CSS styling is done.
- For the paddles, a class has been created which contains multiple methods.
- For movement, the class has a move() method for computer generated padded and handleKeydown() method for user-controlled paddle. Once the paddle objects are created, respective paddles access the movement methods. This allows the users to interchange the left/computer-controlled and right/user-controlled paddles depending on their preference.
- Along with initialising the paddle position in a method, pause() and reset() methods exist to aid the game play. 
- Collision detection: Logic to detect collision has been set up in collisionDetection(), a delay mechanism is used to make sure multiple collisions on the same paddle-ball pair isn't detected. 
- On collision, the ball bounces back with an increased speed to increase the intensity of the game
- On missing the collision, the ball gets reset to the center and the speed decreases to basic level

### Scoring Criteria

- To capture the two scoring mechanisms (Highscore and No. of Wins), local storage concepts are utilised: setItem() and getItem() methods are used for both. 
- There's a slight variation between them, for Highscore, the code is designed to look for existing value and display it and if it doesn't exist, a 0 value is set. 
- For number of wins, each time the browser is reloaded, the previous values are lost and reinitialised to 0. However, the number of wins are retained and can be seen by resetting the game and playing again without page reload.

## What to expect in the future?

- [Plans](https://github.com/hyang-gi/pong/issues?q=is%3Aissue+is%3Aopen+label%3Afuture)

##### Note: Background images have been designed by Freepik.




