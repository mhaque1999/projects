function selectionSort(array) {
    const arrayLength = array.length;
    for (let currentIndex = 0; currentIndex < arrayLength - 1; currentIndex++) {
        let minIndex = currentIndex;
        for (let nextIndex = currentIndex + 1; nextIndex < arrayLength; nextIndex++) {
            if (array[nextIndex] < array[minIndex]) {
                minIndex = nextIndex; 
            }
        }
        
        if (minIndex !== currentIndex) {
            let temp = array[currentIndex];
            array[currentIndex] = array[minIndex];
            array[minIndex] = temp;
        }
    }

    return array;
}
  
module.exports = selectionSort;