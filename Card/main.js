for (let i = 0; i < 14; i++) {
    for (let suit = 0; suit < 4; suit++) {
        const card = new CardDiv(i, suit);
        document.getElementById("deck-container").append(card);
        
    }
}