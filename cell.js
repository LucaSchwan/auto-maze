function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  //            top  right bottom left
  this.walls = [true, true, true, true]
  this.visited = false;

  this.checkNeighbors = function() {
    var neighbors = [];

    var top    = grid[index(i, j - 1)];
    var right  = grid[index(i + 1, j)];
    var bottom = grid[index(i, j + 1)];
    var left   = grid[index(i - 1, j)];

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      var r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }

  }
  this.highlight = function() {
    var x = this.i * w;
    var y = this.j * w;
    noStroke();
    fill(0, 255, 0);
    rect(x, y, w, w);
  }

  this.show = function(a) {
    var x = this.i * w;
    var y = this.j * w;
    stroke(255);
    if (this.walls[0]) {
      line(x    , y    , x + w, y);
    }
    if (this.walls[1]) {
      line(x + w, y    , x + w, y + w);
    }
    if (this.walls[2]) {
      line(x + w, y + w, x    , y + w);
    }
    if (this.walls[3]) {
      line(x    , y + w, x    , y);
    }

    if (this.visited && a) {
      noStroke();
      fill(0, 0, 255)
      rect(x, y, w, w);
    }

    if (this.visited && !a) {
      noStroke();
      fill(51)
      rect(x, y, w, w);
    }
    
  }

}

function heuristic(a, b) {
  var d = abs(a.i-a.b) + abs(a.j-b.j)
  return d;
}