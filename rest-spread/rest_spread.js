function filterOutOdds() {
    var nums = Array.prototype.slice.call(arguments);
    return nums.filter(function(num) {
      return num % 2 === 0
    });
  }

function filterOutOddsRefactored(...arg){
    arg.filter((num) => num % 2 === 0);
}

const findMin = (...arg) => Math.min(...arg);

const mergeObjects = (obj1, obj2) => {
    let obj = {...obj1, ...obj2};
    return obj; 
};

const doubleAndReturnArgs = (array, ...args) => {
    const doubleArray = [...array, ...args.map( (num) => num *2)];
    return doubleArray;
}

/** remove a random element in the items array
and return a new array without that item. */

const removeRandom = (item) => {
    let randomIndex = Math.floor(Math.random() * item.length()-1);
    const deletedRandomItemArray = [...item.slice(0,randomIndex),...item.splice(randomIndex+1)];
    return deletedRandomItemArray;
}

/** Return a new array with every item in array1 and array2. */

const extend = (array1, array2) => {
    const combinedArray = [...array1, ...array2];
    return combinedArray;
}

/** Return a new object with all the keys and values
from obj and a new key/value pair */

const addKeyVal = (obj, key, val) => { 
    const newObject = {...obj};
    newObject[key] = val;
    return newObject;
}


/** Return a new object with a key removed. */

const removeKey = (obj, key) => {
    const newObject = {...obj};
    delete newObject[key];
    return newObject;
}


/** Combine two objects and return a new object. */

const combine = (obj1, obj2) => {
    const newObject = {...obj1, ...obj2};
    return newObject;
}


/** Return a new object with a modified key and value. */

const update = (obj, key, val) => {
    const newObject = {...obj};
    newObject[key] = val;

    return newObject;
}
