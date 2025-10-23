
const Rat = {
    name: "Sally",
    age: 18,
    color: "spotted",
    health: 100,
    size: 10,

    describe() {
        return `${this.name} is a ${this.color} rat that is ${this.age} years old with ${this.health}hp.`;
    },

    grow() {
        this.age++;
        return `Happy Birthday Sally! Congrats on ${this.age} years!`;
    },

    damage() {
        this.health--;
        return `Yow! Sally took damage! ${this.health}hp left!`;
    }
};

const fruits = ['apple', 'orange', 'mango'];
fruits.forEach(fruit => {
    console.log(fruits[0]);
}
)

let shiftPressed = false;


function setup() {
    createCanvas(400, 400);
    textSize(18);
    fill(0);

    //Describe Rat
    console.log(Rat.describe());

    
    // Ask for a word
    let word = prompt("Enter a word:");

    //Assign types of word
    let lengthInfo = `Length: ${word.length}`;
    let lowerInfo = `Lowercase: ${word.toLowerCase()}`;
    let upperInfo = `Uppercase: ${word.toUpperCase()}`;

    // Display on canvas
    text(`Word: ${word}`, 20, 100);
    text(lengthInfo, 20, 140);
    text(lowerInfo, 20, 180);
    text(upperInfo, 20, 220);

    //Console
    console.log(word, word.length, word.toLowerCase(), word.toUpperCase());
    fill("brown");
    circle(width / 2, height / 2, Rat.size);
    text("this is sally", width / 2, height / 2 + 20);
}

function draw() {
    // background("blue");

}

document.addEventListener('keydown',
    function (event) {
        if (event.code === "Space") {
            Rat.grow();
            console.log(Rat.grow());
        }

        if (event.code === "Enter") {
            Rat.damage();
            console.log(Rat.damage());
        }

        if (event.code === "ShiftLeft" && !shiftPressed) {
            fruits.forEach(fruit => {
                fruits.push('watermelon');
                fruits.unshift('banana');
                console.log(fruits);
            })
        }

        if (event.code === "Backspace") {
            fruits.forEach(fruit => {
                fruits.pop();
                console.log(fruits);
            })
        }

    });

document.addEventListener('keydown',
    function (event) {
        if (event.code === "ShiftLeft" && !shiftPressed) {
            shiftPressed = false;
        }
    }
)