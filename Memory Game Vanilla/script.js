const gameContainer = document.getElementById("game");
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

let shuffledColors = shuffle(COLORS);


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


// TODO: Implement this function!
function handleCardClick(event) {
  if (clickNum<2){          //to make sure user cant click muliple cards fast
    const cardlist=gameContainer.querySelectorAll('div');
    // you can use event.target to see which element was clicked
    console.log("you just clicked", event.target);
    
    clickNum+=1;
    clickedCards.push(event.target.classList);
    if(clickedCards[clickNum-1].contains("clicked")){
      clickedCards.splice(clickNum-1,1);
      clickNum-=1;
    }
    else{
      clickedCards[clickNum-1]==(event.target.classList.add("clicked"));
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
        }
        else{
          console.log("Not a match");
          for (let idx = 0; idx < cardlist.length; idx++){
            if(cardlist[idx].classList.contains("clicked")&&(!cardlist[idx].classList.contains("matched"))){ //makes sure any matched cards don't have their classes removed.
              cardlist[idx].classList.remove("clicked");
            }
          }
        } 
        clickedCards=[];
        clickNum=0;
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

// when the DOM loads
createDivsForColors(shuffledColors);
