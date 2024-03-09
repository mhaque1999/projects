let url = "https://deckofcardsapi.com/api/deck/"
let count = 0
$.getJSON(`${url}/new/draw/?count=1`)
.then(data => { 
    console.log(data)
    console.log(data.cards[0].value)
    console.log(data.cards[0].suit)
    deckID = data.deck_id
    return $.getJSON(`${url}/${deckID}/draw/?count=1`)
     })
.then(data => {
    console.log(data.cards[0].value)
    console.log(data.cards[0].suit)
})

$("button").on("click",()=>{
    if (count === 51){
        alert("Out of cards")
        return 
    }
    if (count === 0){
        $.getJSON(`${url}/new/draw/?count=1`)
        .then(data => { 
            console.log(data)
            deckID = data.deck_id
            $("div").append(`<img src=${data.cards[0].image}>`)
        })
    }
    else{
        $.getJSON(`${url}/${deckID}/draw/?count=1`)
        .then(data => {
            console.log(data.cards[0].value)
            console.log(data.cards[0].suit)
            $("img").attr("src", `${data.cards[0].image}`)
        })
    }
    count += 1 
})