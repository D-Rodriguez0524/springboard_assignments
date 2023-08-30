$(function(){

    const baseURL = 'https://deckofcardsapi.com/api/deck';

    // part 1
   async function part1(){
    try{
        let res = await $.getJSON(`${baseURL}/new/draw/`);
        let { suit, value } = res.cards[0];
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    }
    catch(e){
        console.log(e);
    }
   }
   part1();

    // part 2
    async function part2(){
        try{
            let firstCard = await $.getJSON(`${baseURL}/new/draw/`);
            let deckId = firstCard.deck_id;
            let secondCard = await $.getJSON(`${baseURL}/${deckId}/draw/`);
            [firstCard,secondCard].forEach(card =>{
                let { suit,value } = card.cards[0];
                console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
            });
        }
        catch(e){
            console.log(e);
        }
    }
    part2();
    // let firstCard = null;
    // $.getJSON(`${baseURL}/new/draw/`)
    // .then(data => {
    //     firstCard = data.cards[0];
    //     let deckId = data.deck_id;
    //     return $.getJSON(`${baseURL}/${deckId}/draw/`);
    // })
    // .then(data => {
    //     let secondCard = data.cards[0];
    //     [firstCard , secondCard].forEach(function(card){
    //         console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`);
    //     });
    // });

    //part 3
    async function part3(){
        const $btn = $('button'); 
        const $cardSpace = $('#card-space');

        try{
            let deck = await $.getJSON(`${baseURL}/new/shuffle/`);
            $btn.on("click", async function () {
                let card = await $.getJSON(`${baseURL}/${deck.deck_id}/draw/`);
                let cardImg = card.cards[0].image;
                let angle = Math.random() * 90 - 45;
                let randomX = Math.random() * 40 - 20;
                let randomY = Math.random() * 40 - 20;
                $cardSpace.append(
                    $("<img>", {
                        src: cardImg,
                        css: {
                            transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
                        }
                    })
                );
                if(card.remaining === 0) $btn.remove();
            });
        }
        catch(e){
            console.log(e);
        }
    }
    part3();
});

//     let deckId = null;
//     let $btn = $('button');
//     let $cardSpace = $('#card-space');

//     $.getJSON(`${baseURL}/new/shuffle/`)
//     .then(data => {
//         deckId = data.deck_id; 
//     });

//     $btn.on("click", function(){
//         $.getJSON(`${baseURL}/${deckId}/draw/`)
//         .then(data => {
//             let cardImg = data.cards[0].image;
//             let angle = Math.random() * 90 - 45;
//             let randomX = Math.random() * 40 - 20;
//             let randomY = Math.random() * 40 - 20;
//             $cardSpace.append(
//                 $('<img>', {
//                     src: cardImg,
//                     css: {
//                         transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
//                       }
//                 })
//             );
//             if(data.remaining === 0) $btn.remove();
//         });
//     });
// 