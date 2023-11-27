/*
let facts = {numPlanets: 8, yearNeptuneDiscovered: 1846};
let {numPlanets, yearNeptuneDiscovered} = facts;

console.log(numPlanets); // returns 8
console.log(yearNeptuneDiscovered); // returns 1846
*/

/*
let planetFacts = {
    numPlanets: 8,
    yearNeptuneDiscovered: 1846,
    yearMarsDiscovered: 1659
  };
  
  let {numPlanets, ...discoveryYears} = planetFacts;
  
  console.log(discoveryYears); // returns {yearNeptuneDiscovered: 1846, yearMarsDiscovered: 1659}
  */

/*
function getUserData({firstName, favoriteColor="green"}){
  return `Your name is ${firstName} and you like ${favoriteColor}`;
}

getUserData({firstName: "Alejandro", favoriteColor: "purple"}) // returns "Your name is Alejandro and you like purple"
getUserData({firstName: "Melissa"}) // returns "Your name is Melissa and you like green"
getUserData({}) // returns "Your name is undefined and you like green"
  */

/*
let [first, second, third] = ["Maya", "Marisa", "Chi"];

console.log(first); // Returns Maya
console.log(second); // Returns Marisa
console.log(third); // Returns Chi
*/

/*
let [raindrops, whiskers, ...aFewOfMyFavoriteThings] = [
  "Raindrops on roses",
  "whiskers on kittens",
  "Bright copper kettles",
  "warm woolen mittens",
  "Brown paper packages tied up with strings"
]

console.log(raindrops); // returns "Raindrops on roses"
console.log(whiskers); // returns "whiskers on kittens"
console.log(aFewOfMyFavoriteThings); // returns ["Bright copper kettles","warm woolen mittens","Brown paper packages tied up with strings"]
*/

/*
let numbers = [10, 20, 30];
[numbers[1], numbers[2]] = [numbers[2], numbers[1]]

console.log(numbers) // returns [10,30,20]
*/

/*
var obj = {
    numbers: {
      a: 1,
      b: 2
    }
  };
  
  var a = obj.numbers.a;
  var b = obj.numbers.b;
*/

const obj = {
    numbers: {
        a: 1,
        b: 2
    }
};

const {a,b} = obj.numbers;

/*
var arr = [1, 2];
var temp = arr[0];
arr[0] = arr[1];
arr[1] = temp;
*/

const arr = [1,2];
[arr[1],arr[0]] = [arr[0],arr[1]];


const raceResults = ([first, second, third, ...rest]) => ({first, second, third, rest});

