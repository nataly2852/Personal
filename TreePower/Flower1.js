class Flower1 extends Cell {
  constructor(i, j, val = FLOWER1) {
    super(val, i, j);
  }

  update(grid, newGrid) {
    let cross = grid.cross(this.i, this.j);
    let ring = grid.ring(this.i, this.j);
    let left = grid.left(this.i, this.j);
    let right = grid.right(this.i, this.j);

  }
}
