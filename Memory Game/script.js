const gameContainer = document.getElementById("game");
const startBtn=document.querySelector("button");
const restartBtn=document.querySelector("#restart");
const scoreLabel=document.querySelector('h2');
const hiScoreLabel=document.querySelector('h3');
const numOfCardsInput=document.querySelector('input[type=text]');
let numOfGusses=0;
let score=0;
let totalNumOfCards=10;
let numOfMatches=0;
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

let RANDOMCOLORS=[];

let clickedCards=[];
let matches=false;
let clickNum=0;

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS); //old


function colorArr(){
    let idx=0;
    while(idx!=totalNumOfCards/2){
        //color=`rgb( ${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)} )`
        color=`${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)}`
        RANDOMCOLORS.push(color);
        RANDOMCOLORS.push(color);
        idx+=1;
    }   
}

function createDivsWithRandomColors(colorArray) {
    for (let color of colorArray) {
      // create a new div
      const newDiv = document.createElement("div");
  
      // give it a class attribute for the value we are looping over
      newDiv.classList.add(color);
  
      // call a function handleCardClick when a div is clicked on
      newDiv.addEventListener("click", handleCardClick);
  
      // append the div to the element with an id of game
      gameContainer.append(newDiv);
    }
  }

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

function deleteDivs(){      //delete all of the cards to restart the game
    while(gameContainer.children.length!=0){    
        let child=gameContainer.children[gameContainer.children.length-1];
        gameContainer.removeChild(child);
    }
}

function changeColor(div){
    let rgbArr=div.classList.value.split(",");
    const r=parseInt(rgbArr[0]);
    const g=parseInt(rgbArr[1]);
    const b=parseInt(rgbArr[2]);
    div.style.backgroundColor=`rgb( ${r},${g},${b})`;
}

function resetColor(){
    const cardlist=gameContainer.querySelectorAll('div');
    for (let idx = 0; idx < cardlist.length; idx++){
        if((!(cardlist[idx].classList.contains("matched")))){
            cardlist[idx].style.backgroundColor='white';
        }
    }
} 

// TODO: Implement this function!
function handleCardClick(event) {
  if (clickNum<2){          //to make sure user cant click muliple cards fast
    const cardlist=gameContainer.querySelectorAll('div');
    // you can use event.target to see which element was clicked
    console.log("you just clicked", event.target);
    numOfGusses+=1;
    clickNum+=1;
    clickedCards.push(event.target.classList);
    changeColor(event.target);
    if(clickedCards[clickNum-1].contains("clicked")){
      clickedCards.splice(clickNum-1,1);
      clickNum-=1;
    }
    else{
      event.target.classList.add("clicked");
      clickedCards[clickNum-1]=event.target.classList;  
      //clickedCards[clickNum-1]==(event.target.classList.add("clicked"));
    }
    const id=setTimeout(function(){       //to make sure the color of the cards remain while the logic to check for matches runs after 1 second
      if(clickedCards.length==2){
        matches=checkMatches();
        if(matches){
          for (let idx = 0; idx < cardlist.length; idx++){
            if(cardlist[idx].classList.contains("clicked")){
              cardlist[idx].classList.add("matched");
            }
          }
          score+=(Math.round(1000/numOfGusses));
          numOfGusses=0;
          numOfMatches+=1;
          updateTotalScore();
        }
        else{
          console.log("Not a match");
          for (let idx = 0; idx < cardlist.length; idx++){
            if(cardlist[idx].classList.contains("clicked")&&(!cardlist[idx].classList.contains("matched"))){ //makes sure any matched cards don't have their classes removed.
              cardlist[idx].classList.remove("clicked");
              resetColor();
            }
          }
        } 
        clickedCards=[];
        clickNum=0;
      }
      if(numOfMatches==(totalNumOfCards/2)){
        //check for score
        localStorage.setItem("previous score",score);
        checkHiScore();
      } 

    },1000);
  }
   
   
}

function checkMatches(){ //checks the clicked card list to see if they match
  if (clickedCards[0].value==clickedCards[1].value){
    clickedCards=[];
    return true;
  }
  return false;
}

function checkHiScore(){
    let storedScore=localStorage.getItem("previous score");
    if((localStorage.getItem("previous score")==null)){
        updateHiScore(0);
    }
    else if((localStorage.getItem("hi score")==null)||(parseInt(localStorage.getItem("hi score"))<storedScore)){
        localStorage.setItem("hi score",storedScore);
        updateHiScore(storedScore);
    }
    else{
        updateHiScore(parseInt(localStorage.getItem("hi score")));
    }
}

function updateHiScore(hiScore){
    const newSpan=document.createElement("span")
    const oldSpan=hiScoreLabel.children[0];
    hiScoreLabel.removeChild(oldSpan);
    //const hiScore=localStorage.getItem("hi score")
    /* if(hiScore==null){
        newSpan.innerText=0;
        hiScoreLabel.append(newSpan);
    }
    else{
        newSpan.innerText=parseInt(hiScore);
    } */
    newSpan.innerText=parseInt(hiScore);
    hiScoreLabel.append(newSpan);
}

function updateTotalScore(){
    const oldSpan=scoreLabel.children[0];
    scoreLabel.removeChild(oldSpan);
    const newSpan=document.createElement("span")
    newSpan.innerText=score;
    scoreLabel.append(newSpan);
}

// when the DOM loads
startBtn.addEventListener("click",function(){
    checkHiScore();
    const numOfCards=numOfCardsInput.value;
    if((parseFloat(numOfCards)%2)!=0){
        alert("Number of cards must be a multiple of 2");
    }
    else{
        totalNumOfCards=numOfCardsInput.value;
        startBtn.disabled=true;
        colorArr();
        randomizedColors= shuffle(RANDOMCOLORS);
        createDivsWithRandomColors(randomizedColors);
    }
    //createDivsForColors(shuffledColors);
    
    
});

restartBtn.addEventListener("click",function(){
    deleteDivs();
    startBtn.disabled=false;
    score=0;
    RANDOMCOLORS=[];
    updateTotalScore();
    checkHiScore()
})

checkHiScore();

