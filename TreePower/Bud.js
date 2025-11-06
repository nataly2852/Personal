

class Bud extends Cell {
  constructor(i, j, val = BUD) {
    super(val, i, j);
  }

  update(grid, newGrid) {
    // console.log(this.start);
    let cross = grid.cross(this.i, this.j);
    let ring = grid.ring(this.i, this.j);
    let left = grid.left(this.i, this.j);
    let right = grid.right(this.i, this.j);
    if (this.life === 1) {
      activate = true;
      if (activate === true && flower_Hand=== true && start === 0 && left?.val === LEAF) {
        newGrid.set(this.i, this.j + 1, new Flower1(this.i, this.j + 1));
        newGrid.set(this.i, this.j - 1, new Flower1(this.i, this.j - 1));
        newGrid.set(this.i - 1, this.j, new Flower1(this.i - 1, this.j));
        newGrid.set(this.i + 1, this.j, new Flower1(this.i + 1, this.j));
      }
      if (activate === true && flower_Hand=== true && start === 0 && right?.val === LEAF) {
        newGrid.set(this.i, this.j + 1, new Flower1(this.i, this.j + 1));
        newGrid.set(this.i, this.j - 1, new Flower1(this.i, this.j - 1));
        newGrid.set(this.i - 1, this.j, new Flower1(this.i - 1, this.j));
        newGrid.set(this.i + 1, this.j, new Flower1(this.i + 1, this.j));
      }
    }
  }
}
