let chance;
let branchCount = 0;

const TRUNK_LENGTH = 70; //standard is 70
let randomt = 50; //make make randomt a threshold for amount of light needed to make things prosper

class StemCell extends Cell {
  constructor(i, j, val = STEM) {
    super(val, i, j);
  }

  update(grid, newGrid) {
    if (randomt > 0) {
      randomt--;
    }
    // if (randomt === 0) {
    //   console.log("activated");
    // }
    //Y*IPPEEEEEEEE
    let chance = random();

    const above = grid.top(this.i, this.j);
    const left = grid.left(this.i, this.j);
    const right = grid.right(this.i, this.j);
    const dRight = grid.dRight(this.i, this.j);
    const dLeft = grid.dLeft(this.i, this.j);

    if (this.life === 1 && above?.val === NOTHING) {
      //create stem


      if (this.j > grid.rows - TRUNK_LENGTH) {
        // If stem hasn't grown 20 cells yet (still near the bottom)
        newGrid.set(this.i, this.j - 1, new StemCell(this.i, this.j - 1));
      } else {
        // Otherwise, apply normal random behavior
        if (chance < 0.9699939999) {
          newGrid.set(this.i, this.j - 1, new StemCell(this.i, this.j - 1));
        } else {
          newGrid.set(this.i, this.j - 1, new Leaf(this.i, this.j - 1));
          let leaf = newGrid.at(this.i, this.j - 1);
          if (leaf) {
            leaf.freeze();
          }
        }
      }

      if (randomt === 0 && this.life === 1) {
        if (this.j % 5 === 0) {
          //if the remainder is zero (therefore, an even number) then proceed with the statement
          if (right?.val === NOTHING && random() < 0.5) {
            newGrid.set(this.i + 1, this.j, new BranchCell(this.i + 1, this.j));
            branchCount++;
          } else if (left?.val === NOTHING) {
            newGrid.set(this.i - 1, this.j, new BranchCell(this.i - 1, this.j));
            branchCount++;
          }
        }
      }

    }

    //push the new object of StemCell here in update! it updates within it's own class
  }
}
