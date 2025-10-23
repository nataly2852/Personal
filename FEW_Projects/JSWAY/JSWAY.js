
const Rat = {
    name: "Sally",
    age: 18,
    color: "spotted",
    health: 100,

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

    console.log(Rat.describe());
}

function draw() {
    background("blue");
}

// function birthday{

//         if(spacePre ){
//         console.log(Rat.age)
//     }
// }
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