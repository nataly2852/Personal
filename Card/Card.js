const cardNumbers = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
const cardSuits = ["♥", "♦", "♣", "♠"];

class CardDiv extends HTMLElement {
    constructor(number, suit) {
        super();
        let num = cardNumbers[number];
        let suitSymbol = cardSuits[suit];

        this.inert = `${num}${suitSymbol}`;
    }
}

customElements.define("card-div", CardDiv);