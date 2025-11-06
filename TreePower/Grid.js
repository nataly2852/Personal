class Grid {
  constructor(cols, rows) {
    this.cols = floor(cols); // columns
    this.rows = floor(rows); // rows
    this.w = w; // w
    this.cells = [];
    for (let i = 0; i < this.cols; i++) {
      this.cells[i] = [];
      for (let j = 0; j < this.rows; j++) {
        this.cells[i][j] = new Cell(NOTHING, i, j, this);
      }
    }
  }

  at(i, j, val) {
    i = floor(i);
    j = floor(j);
    if (this.cells[i] === undefined || this.cells[i][j] === undefined)
      return undefined;
    if (val instanceof Cell) {
      this.cells[i][j] = val; //accounts for the extended classes
    } else if (val !== undefined) {
      this.cells[i][j].setVal(val); //accounts for all cells GLOBALLY
    }
    //puts the objects vaalue into the cell while also recognizing extended classes and their parameters

    return this.cells[i][j];
  }

  inBounds(i, j) {
    return i >= 0 && j >= 0 && i < this.cols && j < this.rows;
  }

  dLeft(i, j) {
    return this.at(i - 1, j - 1);
  }
  dRight(i, j) {
    return this.at(i + 1, j - 1);
  }
  top(i, j) {
    return this.at(i, j - 1);
  }
  bottom(i, j) {
    return this.at(i, j + 1);
  }
  left(i, j) {
    return this.at(i - 1, j);
  }
  right(i, j) {
    return this.at(i + 1, j);
  }
  cross(i, j) {
    return [
      this.top(i, j),
      this.right(i, j),
      this.left(i, j),
      this.bottom(i, j),
    ];
  }
  ex(i, j) {
    return [
      this.at(i - 1, j - 1),
      this.at(i - 1, j + 1),
      this.at(i + 1, j + 1),
      this.at(i + 1, j - 1),
    ];
  }
  ring(i, j) {
    return [...this.cross(i, j), ...this.ex(i, j)]; //... put all parameters of ex and cross inside of ring
  }

  forEach(func) {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        func(i, j);
      } //the function delivers i and j
    }
  }

  clone() {
    let clone = new Grid(this.cols, this.rows); //cloning the grid
    clone.forEach((i, j) => {
      let originalCell = this.at(i, j); // Get the original cell object
      if (originalCell instanceof Cell) {
        //if the original cell is an extention of the cell class -->
        let newCell = new originalCell.constructor(
          originalCell.val,
          originalCell.i,
          originalCell.j
        ); //THIS IS WHERE THE CLASS PROPERTIES ARE PUSHED AS AN OBJECT INTO THE NEW CLONE!!!!!!

        /**
        properties that should stay the same across grid exchange go here vvvv
        **/
        newCell.life = originalCell.life;
        newCell.activate = originalCell.activate;
        newCell.grid = clone;
        clone.at(i, j, newCell);
      }
    });
    return clone;
  }

  swap(i1, j1, i2, j2) {
    const cell1 = this.at(i1, j1);
    const cell2 = this.at(i2, j2);

    //you have to access the array position itself in the cell object function to swap objects
    this.cells[i1][j1] = cell2;
    this.cells[i2][j2] = cell1;

    //updatethe internal positions of each object in setPos
    if (cell1) cell1.setPos(i2, j2);
    if (cell2) cell2.setPos(i1, j1); //if writing an if statement without brackets, js will only recognize the first parameter
  }

  set(i, j, val) {
    if (val instanceof Cell) {
      this.cells[i][j] = val;
      val.life = 1;
    } else {
      const cell = new Cell(val, i, j, this);
      cell.life = 1;
      this.cells[i][j] = cell;
    }
  }

  freeze(i, j) {
    const cell = this.at(i, j);
    if (cell) {
      cell.freeze();
    }
  }

  unfreeze(i, j) {
    const cell = this.at(i, j);
    if (cell) {
      cell.unfreeze();
    }
  }

  show(cellSize) {
    this.forEach((i, j) => {
      this.at(i, j).show(cellSize);
    });
  }
}