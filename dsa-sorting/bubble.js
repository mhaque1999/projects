function bubbleSort(inputArray) {
    const arrayLength = inputArray.length;

    for (let pass = 0; pass < arrayLength - 1; pass++) {

        for (let index = 0; index < arrayLength - pass - 1; index++) {
            
            if (inputArray[index] > inputArray[index + 1]) {
                let temp = inputArray[index];
                inputArray[index] = inputArray[index + 1];
                inputArray[index + 1] = temp;
            }
        }
    }

    return inputArray;
}
  
module.exports = bubbleSort;