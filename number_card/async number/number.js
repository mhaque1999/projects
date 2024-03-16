let favNumber = 7;
let url = "http://numbersapi.com"

function getRandomNumber(max){
    return Math.floor(Math.random() * max)
}

async function getOneNumberFact(){
  let fact = await $.getJSON(`${url}/${favNumber}?json`)
  $("body").append(`<p> 1. ${fact.number} fact is : ${fact.text}</p>`)
}

let favNumbers = [getRandomNumber(100), getRandomNumber(100), getRandomNumber(100)];
async function getFourNumberFacts(){
  let fact = await $.getJSON(`${url}/${favNumbers}?json`)
  $("body").append(`<p> 2. ${favNumbers[0]} fact is : ${fact[favNumbers[0]]}
                    ${favNumbers[1]} fact is : ${fact[favNumbers[1]]}
                    ${favNumbers[2]} fact is : ${fact[favNumbers[2]]}</p>`)
}



async function getFourSameNumberFacts(){
  let fact = await Promise.all([$.getJSON(`${url}/${favNumber}?json`), $.getJSON(`${url}/${favNumber}?json`),
  $.getJSON(`${url}/${favNumber}?json`),$.getJSON(`${url}/${favNumber}?json`)])
  $("body").append(`<p> 3. ${fact[0].number} fact 1 is : ${fact[0].text}</p>`)
  $("body").append(`<p> 3. ${fact[1].number} fact 2 is : ${fact[1].text}</p>`)
  $("body").append(`<p> 3. ${fact[2].number} fact 3 is : ${fact[2].text}</p>`)
  $("body").append(`<p> 3. ${fact[3].number} fact 4 is : ${fact[3].text}</p>`)
}

getOneNumberFact()
getFourNumberFacts()
getFourSameNumberFacts()