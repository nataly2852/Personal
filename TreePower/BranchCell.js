class BranchCell extends Cell {
  constructor(i, j, length = 0, val = BRANCH) {
    super(val, i, j);
    this.branchedL = false;
    this.branchedR = false;
    this.length = length;
    this.maxLength = floor(map(this.j, 0, grid.rows, 0, 25)); // max branch spread
  }

  update(grid, newGrid) {
    chance = random();

    //ALWAYS REMEMBER TO CALL NEWGRID AND GRID HERE
    //CONSTANTS CALLING FROM GRID
    const above = grid.top(this.i, this.j);
    const right = grid.right(this.i, this.j);
    const left = grid.left(this.i, this.j);
    const dRight = grid.dRight(this.i, this.j);
    const dLeft = grid.dLeft(this.i, this.j);

    ////RIGHT Branch EXTENSION
    if (
      this.life === 1 &&
      above?.val === NOTHING &&
      this.length < this.maxLength
    ) {
      if (right?.val === NOTHING && dRight?.val === NOTHING) {
        newGrid.set(
          this.i + 1,
          this.j,
          new BranchCell(this.i + 1, this.j, this.length + 1)
        );
        this.branchedR = true; //SET THIS BRANCH AS BRANCHED

        if (this.length + 1 >= this.maxLength) {
          if (chance < 0.9 && right?.val === NOTHING) {
            newGrid.set(this.i + 1, this.j, new Leaf(this.i + 1, this.j)); //SET LEAF END
          }
        }

        if (chance < 0.35) {
          newGrid.set(
            this.i,
            this.j - 1,
            new MiniBranch(this.i, this.j - 1, "right")
          ); //SET MINI BRANCH
        } else {
          //OTHERWISE SET NOTHING
          newGrid.set(
            this.i,
            this.j - 1,
            new Cell(NOTHING, this.i, this.j - 1)
          );
          let cell = newGrid.at(this.i, this.j - 1);
          if (cell) {
            cell.freeze();
          }
        }
      }
    }

    ////LEFT
    if (
      this.life === 1 &&
      this.length < this.maxLength
    ) {
      this.branchedL = true;
      if (left?.val === NOTHING && this.branchedL === true) {
        newGrid.set(
          this.i - 1,
          this.j,
          new BranchCell(this.i - 1, this.j, this.length + 1)
        ); //Branch Grow
      
      if(this.length + 1 >= this.maxLength){
          newGrid.set(this.i - 1, this.j, new Leaf(this.i - 1, this.j));
        } //SET End Leaf
      

        if (chance < 0.35 && dLeft?.val === NOTHING && above?.val === NOTHING) {
          newGrid.set(
            this.i - 1,
            this.j - 1,
            new MiniBranch(this.i - 1, this.j - 1, "left")
          ); //Set MINI BRANCHES
        } else {
          newGrid.set(
            this.i - 1,
            this.j - 1,
            new Cell(NOTHING, this.i - 1, this.j - 1)
          );
          let cell = newGrid.at(this.i - 1, this.j - 1);
          if (cell) {
            cell.freeze();
          }
        }
      }
      // } else if (this.life === 1) {
      //   newGrid.set(this.i, this.j);
      // }
    }


  }
}