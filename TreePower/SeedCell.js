class SeedCell extends Cell {
  constructor(i, j, val = SEED) {
    super(val, i, j);
  }

  update(grid, newGrid) {
    let below = grid.bottom(this.i, this.j);
    let above = grid.top(this.i, this.j);

    if (this.life === 1 && below?.val === NOTHING) {
      if (below?.val === NOTHING || below?.val === undefined) {
        newGrid.set(this.i, this.j + 1, new SeedCell(this.i, this.j + 1));
        newGrid.set(this.i, this.j - 1, NOTHING);
        return;
      }
    }
    if (below?.val === SEED) {
      newGrid.set(this.i, this.j + 1, new SeedCell(this.i, this.j + 1));
    }

    if (below?.val === DIRT || (below?.val === DIRT && below?.val === SEED)) {
      newGrid.set(this.i, this.j - 1, new StemCell(this.i, this.j - 1));
    }
  }
}
