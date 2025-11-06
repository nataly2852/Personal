class Cell {
  constructor(val, i, j, activate = 100) {
    this.val = val; //seed, stem, root, flower
    this.life = 0; //starts dead until activated
    this.activate = activate; //activate will be the timer until it activates
    this.i = i;
    this.j = j;
    this.frozen = false;
    this.hasBranched = false;
    this.grid = grid;
  }

  setPos(i, j) {
    this.i = i;
    this.j = j;
  }

  setVal(type) {
    this.val = type;
  }

  show() {
    // stroke("black");
    //     // Use this.life, not the global life
    //     if (this.life === 1 && COLOR[this.val]) {
    //       fill(COLOR[this.val]); // Use this.val, not this.type (typo in original code)
    //     } else {
    //       fill(0, 0, 0, 0); // Transparent fill for dead/inactive cells
    //     }
    //     // You also need to actually draw the square here if you want show() to handle drawing
    //     square(this.i * w, this.j * w, w);

    //     // Currently, drawing happens in the main draw() loop, which might be fine.

    let fillColor = COLOR[this.val] || "black";
    if (this.fillShade) {
      fillColor = this.fillShade;
    }
    fill(fillColor);
    square(this.i * w, this.j * w, w);
    this.fillShade = null;
  }

  fillUp(shade = "lightgreen") {
    if (this.val === "LEAF" && this.life === 1) {
      let crossCoords = [
        [this.i, this.j - 1],
        [this.i + 1, this.j],
        [this.i, this.j + 1],
        [this.i - 1, this.j],
      ];
      crossCoords.forEach(([x, y]) => {
        if (this.grid && this.grid.inBounds(x, y)) {
          let neighbor = this.grid.at(x, y);
          if (neighbor.val === "NOTHING") {
            neighbor.fillShade = shade;
          }


          
        }
      });
    }
  }

  freeze() {
    this.frozen = true;
  }

  unfreeze() {
    this.unfrozen = false;
  }
}