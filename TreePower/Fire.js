class Fire extends Cell {
  constructor(i, j, val = FIRE) {
    super(val, i, j);
  }

  update(grid, newGrid) {
    let ring = grid.ring(this.i, this.j);
    let cross = grid.cross(this.i, this.j);
    let left = grid.left(this.i, this.j);
    let right = grid.right(this.i, this.j);
    let dleft = grid.dLeft(this.i, this.j);
    let dright = grid.dRight(this.i, this.j);

    // Spread sideways if neighbors exist and are not NOTHING or Fire
    if (left && left.val !== NOTHING && !(left instanceof Fire)) {
      newGrid.set(this.i, this.j, new Fire(this.i, this.j));
    }
    if (right && right.val !== NOTHING && !(right instanceof Fire)) {
      newGrid.set(this.i, this.j, new Fire(this.i, this.j));
    }
    if (dleft && dleft.val !== NOTHING && !(dleft instanceof Fire)) {
      newGrid.set(this.i, this.j, new Fire(this.i, this.j));
    }
    if (dright && dright.val !== NOTHING && !(dright instanceof Fire)) {
      newGrid.set(this.i, this.j, new Fire(this.i, this.j));
    }


    // Spread vertically and diagonally
    for (let cell of [...cross, ...ring]) {
      if (
        cell &&
        cell.val !== NOTHING &&
        !(cell instanceof Fire) &&
        grid.inBounds(cell.i, cell.j)

      ) {
        newGrid.set(cell.i, cell.j, new Fire(cell.i, cell.j));
      }
    }
  }
}
