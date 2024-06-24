function unroll(squareArray) {
  const result = [];
  let top = 0;
  let bottom = squareArray.length - 1;
  let left = 0;
  let right = squareArray[0].length - 1;

  while (top <= bottom && left <= right) {
    for (let index = left; index <= right; index++) {
      result.push(squareArray[top][index]);
    }
    top++;

    for (let index = top; index <= bottom; index++) {
      result.push(squareArray[index][right]);
    }
    right--;

    if (top <= bottom) {
      for (let index = right; index >= left; index--) {
        result.push(squareArray[bottom][index]);
      }
      bottom--;
    }

    if (left <= right) {
      for (let index = bottom; index >= top; index--) {
        result.push(squareArray[index][left]);
      }
      left++;
    }
  }

  return result;
}

module.exports = unroll;
