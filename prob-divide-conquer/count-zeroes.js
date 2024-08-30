function countZeroes(array) {

  let firstZero = findFirst(array)
  if (firstZero === -1) return 0;

  return array.length - firstZero
}

function findFirst(array) {

  leftIdx = 0; 
  rightIdx = array.length - 1;
  
  while (leftIdx <= rightIdx){
    let midIdx = leftIdx + Math.floor((rightIdx - leftIdx) / 2);
    let midVal = array[midIdx];
    
    if ((midIdx === 0 || array[midIdx - 1] === 1) && midVal === 0){
        return midIdx
    }
    else if (midVal === 1){
        leftIdx = midIdx + 1;
    }
    else {
        rightIdx = midIdx - 1;
    }
    }
    return -1
}



module.exports = countZeroes