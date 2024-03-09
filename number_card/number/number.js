let favNumber = 7;
let url = "http://numbersapi.com"

function getRandomNumber(max){
    return Math.floor(Math.random() * max)
}


$.getJSON(`${url}/${favNumber}?json`)
.then(data => { 
  console.log(data)
  $("body").append(`<p> 1. ${data.number} fact is : ${data.text}</p>`) });


let favNumbers = [getRandomNumber(100), getRandomNumber(100), getRandomNumber(100)];
$.getJSON(`${url}/${favNumbers}?json`)
.then(data => { 
  console.log(data)
  $("body").append(`<p> 2. ${favNumbers[0]} fact is : ${data[favNumbers[0]]}
                  ${favNumbers[1]} fact is : ${data[favNumbers[1]]}
                  ${favNumbers[2]} fact is : ${data[favNumbers[2]]}</p>`) });



$.getJSON(`${url}/${favNumber}?json`)
    .then(data => { $("body").append(`<p> 3. ${data.number} fact 1 is : ${data.text}</p>`) 
    return $.getJSON(`${url}/${favNumber}?json`)})

    .then(data => { $("body").append(`<p> 3. ${data.number} fact 2 is : ${data.text}</p>`) 
    return $.getJSON(`${url}/${favNumber}?json`)})

    .then(data => { $("body").append(`<p> 3. ${data.number} fact 3 is : ${data.text}</p>`) 
    return $.getJSON(`${url}/${favNumber}?json`)})

    .then(data => { $("body").append(`<p> 3. ${data.number} fact 4 is : ${data.text}</p>`) 
});