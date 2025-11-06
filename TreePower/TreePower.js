let w = 5;
let grid;
let i, j;
const [
  SEED,
  STEM,
  BUD,
  FLOWER1,
  FLOWER2, //currently nothing..
  DIRT,
  BRANCH,
  MINIBRANCH,
  LEAF,
  LEAFEND,
  NOTHING,
  FIRE,
] = [
    "seed",
    "stem",
    "bud",
    "flower1",
    "flower2",
    "dirt",
    "branch",
    "minibranch",
    "leaf",
    "leafend",
    "nothing",
    "fire",
  ];
const COLOR = {
  seed: "yellow",
  stem: "brown",
  bud: "white",
  flower1: "red",
  flower2: "pink",
  dirt: "rgb(0, 154, 20)",
  branch: "brown",
  minibranch: "brown",
  leaf: "rgba(30, 155, 47, 1)",
  leafend: "rgba(47, 169, 66, 1)",
  nothing: "rgba(156, 214, 255, 1)",
  fire: "orange",
};

// let life;
// let activate = false;

let video;
let painting;
let handpose;
let predictions = [];
let canvasP5Element;

let sketchWidth;
let sketchHeight;

const simRegion = { x: 300, y: 0, w: 400, h: 400 };  // right half

let scaleX;
let timerSeed = 0;
let timerBloom = 0;
let start = 120;
let activate = false;
let flower_Hand = false;
let burn_start = false;

//////////////////PRELOAD/////////////////////

function preload() {
  handpose = ml5.handPose();
}

//////////SETUP///////////////////////////////

function setup() {
  video = createCapture(VIDEO, { flipped: true });
  painting = createGraphics(video.width, video.height);
  canvasP5Element = createCanvas(700, 400);
  videoSpace.append(canvasP5Element.elt);


  // console.log(gotResults);
  handpose.detectStart(video, gotResults);
  video.hide();
  console.log("Handpose model loading...");


  ////////////////////CREATE FIRST GRID////////////////////////////
  grid = new Grid(width / w, height / w);
  //For loop that goes through each cell and then defines the bottomcells of the grid as dirt
  grid.forEach((i, j) => {
    if (grid.bottom(i, j) === undefined) {
      grid.set(i, j, DIRT);
    }
  });
  frameRate(300);
}

//////////////GOT RESULTS FUNCTION//////////////////
//This is how my objects are formatted/pushed into array
function gotResults(results) {
  predictions = results.map(hand => {
    let named = {};
    hand.keypoints.forEach(pt => named[pt.name] = pt);
    return { ...hand, ...named };
  });
  painting.clear();
}

////////////DRAW/////////////////////////////////

function draw() {

  image(video, 0, 0, 300, video.height / 2);
  image(painting, 0, 0, 300, video.height / 2);
  drawKeypoints(predictions);

  push();
  translate(simRegion.x, simRegion.y);
  let newGrid = grid.clone();
  if (randomt === 0) {
    randomt = 0;
  }


  grid.forEach((i, j) => {
    let cell = grid.at(i, j);

    if (cell && typeof cell.update === "function" && !cell.frozen) {
      cell.update(grid, newGrid);
    }
    cell.show();

    let above = newGrid.top(i, j);
    let below = newGrid.bottom(i, j);
    let right = newGrid.right(i, j);
    let left = newGrid.left(i, j);
  });

  grid = newGrid;

  pop();
}

function destroy() {
  if (burn_start === true) {
    i = floor(width / 3.5 / w);
    j = floor(height / 3.5 / w);
    console.log("activated!")
    grid.set(i, j, new Fire(i, j)); // Place the seed}
  }
}

function budBloom() {
  flower_Hand = true;
  if (flower_Hand === true && activate === true) {
    start = 0;
  }
}

function dropSeed() {
  let counterSeed = 0;
  i = floor(width / 3.5 / w);
  j = floor(height / 3.5 / w);
  grid.set(i, j, new SeedCell(i, j)); // Place the seed}
}

function drawKeypoints() {

  push();


  for (let i = 0; i < predictions.length; i++) {
    let hand = predictions[i];//DEFINED AS HAND POINTS
    let keypoints = hand.keypoints; //DEFINED AS INDIVIDUAL HAND POINTS

    let index = hand.index_finger_tip;
    let thumb = hand.thumb_tip;
    let middleF = hand.middle_finger_tip;
    let ringF = hand.ring_finger_tip;
    let dBloom2 = dist(index.x, index.y, middleF.x, middleF.y);
    let dBloom1 = dist(thumb.x, thumb.y, ringF.x, ringF.y);
    let dSeed = dist(index.x, index.y, thumb.x, thumb.y);

    if (dBloom2 > 20 && dBloom1 < 30) {
      console.log(dBloom1);
      timerBloom++;
      burn_start = true;

      if (timerBloom === 20) {
        // budBloom();
        destroy();
      }
    }

    if (dSeed < 20) {
      timerSeed++;
      if (timerSeed === 20) {
        dropSeed();
      }  // console.log(timerSeed);
    }
    for (let keypoint of keypoints) {
      scaleX = 300 / video.width;
      scaleY = (video.height / 3) / video.height;
      if (hand.handedness === 'Right') {
        painting.fill(0, 255, 0);
        painting.noStroke();
        painting.ellipse((video.width - keypoint.x) * scaleX, keypoint.y * scaleY, 7, 7);
      } else {
        painting.fill(255, 0, 255);
        painting.noStroke();
        painting.ellipse((video.width - keypoint.x) * scaleX, keypoint.y * scaleY, 7, 7);
      }

      push();
      painting.fill(0, 0, 0);
      painting.ellipse((video.width - index.x) * scaleX, index.y * scaleY, 7, 7);
      pop();


      push();
      painting.fill(0, 0, 0);
      painting.ellipse((video.width - thumb.x) * scaleX, thumb.y * scaleY, 7, 7);
      pop();


      // console.log(hand);
    }
  }
  pop();
}

function keyPressed() {
  if (keyCode === ENTER) {
    burn_start = true;
  }
}
