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
    directions = [],
    foodLocation;

  var start = document.getElementById('start'),
    message = document.getElementsByClassName('gameover');


  function _selection(x, y, color) {
    var selection,
      selectionNode;

    selection = '.row:nth-child(' + x + ') > .column:nth-child(' + y + ')';
    selectionNode = document.querySelectorAll(selection);
    selectionNode[0].style.backgroundColor = color;
  }

  function buildBoard() {
    var board, column = '',
      row = '';

    for (var i = 1; i < 21; i++) {
      column += '<div class="column"></div>';
    }

    for (var j = 1; j < 21; j++) {
      row += '<div class="row">' + column + '</div>';
    }

    board = document.getElementById('board');
    board.innerHTML = row;

  }

  function createSnake() {
    snake.position = [10, 10];
    snake.direction = 'r';
    snake.length = 3;
    directions.push(snake.direction);
    positions.push([snake.position[0], snake.position[1]]);

    _selection(positions[0][0], positions[0][1], 'black');
  }

  function createFood() {
    foodLocation = [Math.ceil(Math.random() * 20), Math.ceil(Math.random() * 20)];

    _selection(foodLocation[0], foodLocation[1], 'black');
  }

  function snakeDirection(key) {
    // if user pushes l-r ,r-l, u-d, d-u dont change direction
    switch (key.keyCode) {
    case 37:
      snake.direction = 'l';
      if (directions[0] === 'r') {
        snake.direction = 'r';
      }
      break;

    case 38:

      snake.direction = 'u';
      if (directions[0] === 'd') {
        snake.direction = 'd';
      }
      break;

    case 39:

      snake.direction = 'r';
      if (directions[0] === 'l') {
        snake.direction = 'l';
      }
      break;
    case 40:
      snake.direction = 'd';
      if (directions[0] === 'u') {
        snake.direction = 'u';
      }
      break;
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

    directions[0] = snake.direction;

    // end game if borders crossed
    if (snake.position[0] === 0 || snake.position[0] === 21) {
      life = false;
      return;
    } else if (snake.position[1] === 0 || snake.position[1] === 21) {
      life = false;
      return;
    }

    //push as many as length
    positions.push([snake.position[0], snake.position[1]]);

    if (count >= snake.length) {
      _selection(positions[count - snake.length][0], positions[count - snake.length][1], 'rgba(255, 255, 255, 0.50)');
      // end game if snake eat itself
      var lastPos = positions.length - 1;
      for (var i = 1; i < snake.length; i++) {
        if (positions[lastPos - i][0] === snake.position[0] && positions[lastPos - i][1] === snake.position[1]) {
          life = false;
          return;
        }
      }
    }

    _selection(positions[count][0], positions[count][1], 'black');

    if (positions[count][0] === foodLocation[0] && positions[count][1] === foodLocation[1]) {
      snake.length += 1;
      createFood();
    }

    count += 1;
  }

  // Create synchronous time loop
  function timeout() {
    setTimeout(function () {
      if (life) {
        moveSnake();
        timeout();
      } else {
        message[0].classList.remove('hide');
      }
    }, 100);
  }

  function reset() {
    count = 1;
    movement = 1;
    positions = [];
    directions = [];

    message[0].classList.add('hide');
    life = true;
    buildBoard();
    createSnake();
    createFood();
    timeout();
    console.log('reset ');
  }

  function init() {
    start.innerHTML = 'New Game';
    createSnake();
    createFood();
    timeout();
    console.log('init');
  }

  start.addEventListener('click', function () {
    if (life) {
      init();
    } else {
      reset();
    }
  });

  buildBoard();



  // Listen arrow keys 
  document.addEventListener('keydown', snakeDirection);
})();