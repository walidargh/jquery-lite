var Board = require('./snake');

function View ($el) {
  this.$el = $el;
  this.grid = new Board();
}

View.prototype.bindKeys = function() {
    document.onkeydown = function (key) {
      switch (key.keyCode) {
        case 37:
          this.grid.turn("W");
          break;
        case 38:
          this.grid.turn("N");
          break;
        case 39:
          this.grid.turn("E");
          break;
        case 40:
          this.grid.turn("S");
          break;
      }
    };
};

View.prototype.render = function () {
  this.grid.board.forEach(function (row, rowIdx) {
    row.forEach(function (cell, colIdx){
      if (cell === 0) {

      }
    });
  });
};
