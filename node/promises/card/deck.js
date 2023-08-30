$(function(){

    const baseURL = 'https://deckofcardsapi.com/api/deck';

    // part 1
    $.getJSON(`${baseURL}/new/draw/`)
    .then(data => {
        let { suit, value } = data.cards[0];
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    });

    // part 2
    let firstCard = null;
    $.getJSON(`${baseURL}/new/draw/`)
    .then(data => {
        firstCard = data.cards[0];
        let deckId = data.deck_id;
        return $.getJSON(`${baseURL}/${deckId}/draw/`);
    })
    .then(data => {
        let secondCard = data.cards[0];
        [firstCard , secondCard].forEach(function(card){
            console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`);
        });
    });

    //part 3
    let deckId = null;
    let $btn = $('button');
    let $cardSpace = $('#card-space');

    $.getJSON(`${baseURL}/new/shuffle/`)
    .then(data => {
        deckId = data.deck_id; 
    });

    $btn.on("click", function(){
        $.getJSON(`${baseURL}/${deckId}/draw/`)
        .then(data => {
            let cardImg = data.cards[0].image;
            // i liked the way you designed the placing of the cards
            // so i just copied from the solution the style
            let angle = Math.random() * 90 - 45;
            let randomX = Math.random() * 40 - 20;
            let randomY = Math.random() * 40 - 20;
            $cardSpace.append(
                $('<img>', {
                    src: cardImg,
                    css: {
                        transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
                      }
                })
            );
            if(data.remaining === 0) $btn.remove();
        });
    });

});