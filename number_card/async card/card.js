let url = "https://deckofcardsapi.com/api/deck/"
let count = 0

async function drawCards(){
    let card = await $.getJSON(`${url}/new/draw/?count=1`)
    console.log(card)
    console.log(card.cards[0].value)
    console.log(card.cards[0].suit)
    deckID = card.deck_id
    let nextCard = await $.getJSON(`${url}/${deckID}/draw/?count=1`)
    console.log(nextCard.cards[0].value)
    console.log(nextCard.cards[0].suit)
}


$("button").on("click",async ()=>{
    if (count === 51){
        alert("Out of cards")
        return 
    }
    if (count === 0){
        let card = await $.getJSON(`${url}/new/draw/?count=1`)
        deckID = card.deck_id
        $("div").append(`<img src=${card.cards[0].image}>`)
    }
    else{
        let card = await $.getJSON(`${url}/${deckID}/draw/?count=1`)
        $("img").attr("src", `${card.cards[0].image}`)
    }
    count += 1 
})

drawCards()