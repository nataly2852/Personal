const LEAF_END_CHANCE = 0.16; //0.17 is standard

const LEAF_GROWTH_CHANCE = 0.4; //0.5 is standard

const BUD_CHANCE = 0.1; //0.1 standard

class Leaf extends Cell {
  constructor(i, j, val = LEAF) {
    super(val, i, j);
    this.grown = false;
  }

  update(grid, newGrid) {
    if (this.growthCount > this.maxGrowth) {
      this.freeze(); // Freeze this leaf
      return;
    }
    const left = grid.left(this.i, this.j);
    const right = grid.right(this.i, this.j);

    if (random() < BUD_CHANCE && left?.val === LEAFEND) {
      newGrid.set(this.i - 1, this.j, new Bud(this.i - 1, this.j));
    }
  if (random() < BUD_CHANCE && right?.val === LEAFEND) {
      newGrid.set(this.i + 1, this.j, new Bud(this.i + 1, this.j));
    }

    const ring = grid.ring(this.i, this.j);

    for (let cell of ring) {
      if (cell && cell.val === NOTHING) {
        if (!this.grown) {
          let chance = random();

          if (chance > LEAF_GROWTH_CHANCE) {
            // Successful growth: make another Leaf
            newGrid.set(cell.i, cell.j, new Leaf(cell.i, cell.j));
          } else if (chance < LEAF_END_CHANCE) {
            // Failed growth: make LeafEnd in this spot
            const end = new LeafEnd(cell.i, cell.j);
            end.freeze();
            newGrid.set(cell.i, cell.j, end);

            // Surrounding ring becomes frozen LeafEnds
            const surrounding = grid.ring(this.i, this.j);
            for (let neighbor of surrounding) {
              if (neighbor && neighbor.val === NOTHING) {
                const leafEnd = new LeafEnd(neighbor.i, neighbor.j);
                leafEnd.freeze();
                newGrid.set(neighbor.i, neighbor.j, leafEnd);
              }
            }
          }

          this.growthCount++;
          this.grown = true; // Prevent repeated growth
          break; // Stop after one action per update
        }
      }
    }
  }
}
