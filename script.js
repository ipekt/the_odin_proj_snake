/* Snake Game
 
Project: http://www.theodinproject.com/javascript-and-jquery/jquery-and-the-dom

create board
create food randomly on board
create snake array [20,20]
  movement
  restriction => board, eat itself
  growth
win/lose message
points 
speed up game each time food consumed
reset

*/

  
(function () {

  var snake = {},
    life = true,
    count = 1,
    movement = 1,
    positions = [],
    foodLocation;

  function _selection(x, y){
    var selection = '.row:nth-child(' + x + ') > .column:nth-child(' + y + ')';
    var selectionNode = document.querySelectorAll(selection);
    selectionNode[0].style.backgroundColor = "black";
  }

  function buildBoard() {
    var board, column = '',
      row = '',
      x = 40;

    for (var i = 0; i < 40; i++) {
      column += '<div class="column"></div>';
    }

    for (var j = 0; j < 40; j++) {
      row += '<div class="row">' + column + '</div>';
    }

    board = document.getElementById('board');
    board.innerHTML = row;

  }

  function createSnake() {
    snake.position = [20, 20];
    snake.direction = 'r';
    positions.push([ snake.position[0], snake.position[1] ]);
    
    _selection(positions[0][0], positions[0][1]);
  }

  function createFood() {
    foodLocation = [Math.floor(Math.random() * 40), Math.floor(Math.random() * 40)];

    _selection(foodLocation[0], foodLocation[1]);
  }

  

  /*
    food appears randomly
    if snake crosses through food loc, grows.
    food dissappears
    food appears in another location

  */

  function snakeDirection(key) {
    if (key.keyCode === 37) {
      console.log('left');
      snake.direction = 'l';
    } else if (key.keyCode === 38) {
      console.log('up');
      snake.direction = 'u';
    } else if (key.keyCode === 39) {
      console.log('right');
      snake.direction = 'r';
    } else if (key.keyCode === 40) {
      console.log('down');
      snake.direction = 'd';
    }
  }


  function moveSnake() {

    // move snake
    if (snake.direction == 'l') {
      snake.position[1] -= 1;
    } else if (snake.direction == 'u') {
      snake.position[0] -= 1;
    } else if (snake.direction == 'r') {
      snake.position[1] += 1;
    } else if (snake.direction == 'd') {
      snake.position[0] += 1;
    }

   // end game if borders crossed
    if (snake.position[0] === 0 || snake.position[0] === 41) {
      life = false;
      return;
    } else if (snake.position[1] === 0 || snake.position[1] === 41) {
      life = false;
      return;
    }

    positions.push([ snake.position[0], snake.position[1] ]);

    var previousLocation = '.row:nth-child(' + positions[count-1][0] + ') > .column:nth-child(' + positions[count-1][1] + ')';
    var snakePerLocation = document.querySelectorAll(previousLocation);
    snakePerLocation[0].style.backgroundColor = "white";


    _selection(positions[count][0], positions[count][1]);
    

    if ( positions[count][0] === foodLocation[0] && positions[count][1] === foodLocation[1] ) {
        createFood();
    }

    count += 1;
  }




  // Listen arrow keys 
  document.addEventListener('keydown', snakeDirection);

  // Create synchronous time loop
  function timeout() {
    setTimeout(function () {
      if (life) {
        moveSnake();
        timeout();
      } else {
        var message = document.createElement('div');
        message.className = 'gameover';
        message.innerHTML = 'Game Over';
        var body = document.getElementsByTagName('body');
        document.body.appendChild(message);
      }
    }, 100);
  }



  buildBoard();
  createSnake();
  timeout();
  createFood();


})();