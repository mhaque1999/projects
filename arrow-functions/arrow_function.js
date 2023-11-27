//test array to test the functionality of the double arrays
const testArray = [1,2,3,4,5];

function double(arr) {
    return arr.map(function(val) {
      return val * 2;
    });
  }

//refactored version of the double function
function doubleRefactor(arr){
    return arr.map((val) => val * 2);
}

//double(testArray);

function squareAndFindEvens(numbers){
    var squares = numbers.map(function(num){
      return num ** 2;
    });
    var evens = squares.filter(function(square){
      return square % 2 === 0;
    });
    return evens;
  }

function squareAndFindEvensRefactored(numbers){
    const squares = numbers.map((num) => num ** 2);
    const evens = squares.filter((square) => square % 2 === 0);
    return evens;
  }

  

