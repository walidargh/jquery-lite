var counter = 0;

function Snake (board) {
  this.direction = "N";
  this.segments = [[12, 12]];
  this.board = board;
}

Snake.prototype.move  = function () {
  var head = this.segments[0];
  var tail = this.segments.pop();
  var newSeg;
  switch (this.direction) {
    case "N":
      newSeg = [head[0], head[1] - 1];
      break;
    case "S":
      newSeg = [head[0], head[1] + 1];
      break;
    case "W":
      newSeg = [head[0] - 1, head[1]];
      break;
    case "E":
      newSeg = [head[0] + 1, head[1]];
      break;
  }

  if (JSON.stringify(this.board.apple) === JSON.stringify(newSeg)) {
    counter += 5;
    this.board.resetApple();
  } else if (counter > 0) {
    this.eatApple(tail);
  }

  if (this.isCrashed(newSeg)) {
    return true;
  } else {
    this.segments.unshift(newSeg);
  }
};

Snake.prototype.isCrashed = function (pos) {
  var x = pos[0];
  var y = pos[1];
  if(x < 0 || x > 24 || y < 0 || y > 24 || this.segments.includes(pos)) {
    return true;
  } else {
    return false;
  }
};

Snake.prototype.eatApple = function (tail) {
  this.segments.push(tail);
  counter--;
};

Snake.prototype.turn = function (direction) {
  self.direction = direction;
};

var Board = function () {
  this.board = [];
  for (var i = 0; i < 25; i++) {
    this.board.push([]);
    for (var j = 0; j < 25; j++) {
      this.board[i].push(0);
    }
  }
  this.snake= new Snake(this);
  this.board[12][12] = 1;
  this.apple = this.generateApple();
  // this.board[this.apple[0], this.apple[1]] = -1;
};

Board.prototype.generateApple = function () {
  var appleX = Math.floor(Math.random() * 25);
  var appleY = Math.floor(Math.random() * 25);
  while (this.board[appleX][appleY] === 1) {
    appleX = Math.floor(Math.random() * 25);
    appleY = Math.floor(Math.random() * 25);
  }
  this.board[appleX][appleY] = -1; 
  return [appleX, appleY];
};

Board.prototype.resetApple = function () {
  this.apple = this.generateApple();
};
debugger;
module.exports = Board;
