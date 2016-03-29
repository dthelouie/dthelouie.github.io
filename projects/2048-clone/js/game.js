function Game(string){
  var fullArr = string.split("");
  for (var i = 0; i < fullArr.length; i++){
    fullArr[i] = parseInt(fullArr[i]);
  };
  this.boardSize = Math.sqrt(fullArr.length);//figure out error handling if boardSize is not an integer
  var boardArr = []
  for (var i = 0; i < fullArr.length; i += this.boardSize){
    boardArr.push(fullArr.slice(i, i+this.boardSize));
  }
  this.board = boardArr
  this.spawn()
  this.spawn()
}

Game.prototype.spawn = function(){
  var zero_arr = [];
  for (var y = 0; y < this.board.length; y++) {
    for (var x = 0; x < this.board[y].length; x++) {
      if (this.board[y][x] == 0) {zero_arr.push([y,x])}
    }
  };
  var coordinates = _.sample(zero_arr)
  var rand_num;
  if (Math.random() < 0.8){
    rand_num = 2;
  } else {
    rand_num = 4;
  }
  if (this.board[coordinates[0]][coordinates[1]] == 0){
    this.board[coordinates[0]][coordinates[1]] = rand_num;
  } else if (this.movable() == true){
    return true
  } else if (this.movable() == false){
    this.movable()
  } else {
    this.spawn();
  }
}

Game.prototype.left = function(){
  this.move();
}

Game.prototype.right = function(){
  for (var i=0; i<this.board.length; i++){
    this.board[i].reverse();
  }
  this.move();
  for (var i=0; i<this.board.length; i++){
    this.board[i].reverse();
  }
}

Game.prototype.up = function(){
  for (var i=0; i<this.board.length; i++){
    this.board[i].reverse()
  }
  this.board = _.zip(this.board[0], this.board[1], this.board[2], this.board[3])
  this.move();
  this.board = _.zip(this.board[0], this.board[1], this.board[2], this.board[3])
  for (var i=0; i<this.board.length; i++){
    this.board[i].reverse()
  }
}

Game.prototype.down = function(){
  this.board = _.zip(this.board[0], this.board[1], this.board[2], this.board[3])
  this.right();
  this.board = _.zip(this.board[0], this.board[1], this.board[2], this.board[3])
}

Game.prototype.move = function(){
  for (var i = 0; i < this.boardSize; i++){
    var new_row = _.compact(this.board[i])
    for (var j = 0; j < new_row.length; j++){
      if (new_row[j] == new_row[j+1]){
        new_row[j] = new_row[j] + new_row[j+1]
        new_row.splice(j+1,1);
      }
    }
    while (new_row.length < this.boardSize){
      new_row.push(0);
    }
    this.board[i] = new_row;
  }
  this.spawn();
  this.movable()
}

Game.prototype.output = function(){
  for (var i = 0; i < this.board.length; i++){
    console.log(this.board[i].join(' '));
  }
}

Game.prototype.movable = function(){
  for (var n = 0; n < this.board.length; n++) {
    if (_.find(this.board[n], function(num){ return num == 0})){
      return true;
    } else {
      for (var x = 1; x < this.boardSize; x ++){
        if (this.board[n][x] == this.board[n][x-1]){
          return true;
        }
      }
    }
  };
  return false;
}