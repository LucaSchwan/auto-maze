var cols, rows;
var w = 40;
var grid = [];
var mazeDone = false;
var count = 1;

var openSet = [];
var closedSet = [];
var start;
var end;
var path = [];

var current;

var stack = [];

function setup() { 
  createCanvas(400, 400);
  cols = floor(width / w);
  rows = floor(height / w);
  frameRate(100);

  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  start = grid[0];
  end = grid[(cols * rows) - 1];

  openSet.push(start);

  current = grid[0];

}

function draw() {
  background(0);
  for (var i = 0; i < grid.length; i++) {
    grid[i].show(false);
  }


  if (!mazeDone) {
    if (!current) {
      current = start;  
    }
    current.visited = true;
    current.highlight();
    var next = current.checkNeighbors();
    if (next) {
      next.visited = true;
      
      stack.push(current);

      removeWalls(current, next);

      current = next;

      count++;
    } else if (stack.length > 0) {
      current = stack.pop();
    }
    if (count === cols * rows) {
      mazeDone = true;
    }
  } else if(mazeDone) {
    Astar();
  }
}

function index (i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return - 1;
  }
  return i + j * cols;
}

function removeWalls(a, b) {
  var x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }

  var y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

function Neighbors(a) {
  var neighbors = [];
  if (!a.walls[0]) {
    neighbors.push(grid[index(a.i, a.j - 1)]);
  }
  if (!a.walls[1]) {
    neighbors.push(grid[index(a.i + 1, a.j)]);
  }
  if (!a.walls[2]) {
    neighbors.push(grid[index(a.i, a.j + 1)]);
  }
  if (!a.walls[3]) {
    neighbors.push(grid[index(a.i - 1, a.j)]);
  }
  return neighbors;
}

function Astar () {
  if (openSet.length > 0) {
    
    var winner = 0;
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }
    var current = openSet[winner];

    if (openSet[winner] === end) {
      noLoop();
      console.log("Done!")
    }

    removeFromArray(openSet, current);
    closedSet.push(current);

    var neighbors = Neighbors(current);
    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];
      if (!closedSet.includes(neighbor)) {

        var tempG = current.g + 1;

        var newPath = false;
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }
        } else {
            neighbor.g = tempG;
            newPath = true;
            openSet.push(neighbor);
        }
    
        if (newPath) {
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
      }
    } 
  } else {
    console.log('No Solution!')
    noLoop();
    return;
  }


  path = [];
    var temp = current;
    path.push(temp);
    while (temp.previous) {
      path.push(temp.previous);
      temp = temp.previous;
    }

  for (var i = 0; i < path.length; i++) {
    path[i].show(true)
  }
}

function removeFromArray(arr, elt) {
  for (var i = arr.length -1; i >= 0; i--) {
    if (arr[i] == elt) {
      arr.splice(i, 1);
    }
  }
}


