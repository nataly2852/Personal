const LEAF_BEGIN_CHANCE = 0.7; //0.7 is  standard

class MiniBranch extends Cell {
  constructor(i, j, side, length = 0, val = MINIBRANCH) {
    super(val, i, j);
    this.side = side; // <-- "left" or "right"
    this.length = length; // how deep this branch is
    this.maxLength = floor(map(this.j, 0, grid.rows, 1, 3)); // max branch spread
  }

  update(grid, newGrid) {
    chance = random();

    const above = grid.top(this.i, this.j);
    const right = grid.right(this.i, this.j);
    const left = grid.left(this.i, this.j);
    const dRight = grid.dRight(this.i, this.j);
    const dLeft = grid.dLeft(this.i, this.j);

    // Spawn a leaf cell 25% of the time above or below the mini branch
    if (this.life === 1 && chance < 0.25) {
      // Check if above or below the mini branch is empty
      const spawnLeaf = random(); // Random chance to decide above or below
      
      if (spawnLeaf < LEAF_BEGIN_CHANCE) {
        if (this.side === "right") {
          if (dLeft?.val === NOTHING) {
            newGrid.set(this.i - 1, this.j - 1, new Leaf(this.i - 1, this.j - 1)); // Assuming you have a Leaf class
          }
          // Spawn leaf above mini branch
        }
      } 
    if (spawnLeaf < LEAF_BEGIN_CHANCE) {
        if (this.side === "left") {
          if (dRight?.val === NOTHING) {
            newGrid.set(this.i + 1, this.j - 1, new Leaf(this.i + 1, this.j - 1)); // Assuming you have a Leaf class
          }
          // Spawn leaf above mini branch
        }
      }

        if (this.life === 1 && this.length < this.maxLength) {
          if (this.side === "right") {
            // Only grow diagonally right upwards
            if (above?.val === NOTHING && dRight?.val === NOTHING) {
              newGrid.set(
                this.i + 1,
                this.j - 1,
                new MiniBranch(this.i + 1, this.j - 1, "right", this.length + 1)
              );
            }
          } else if (this.side === "left") {
            // Only grow diagonally left upwards
            if (above?.val === NOTHING && dLeft?.val === NOTHING) {
              newGrid.set(
                this.i - 1,
                this.j - 1,
                new MiniBranch(this.i - 1, this.j - 1, "left", this.length + 1)
              );
            }
          }
        }
      }
    }
}
