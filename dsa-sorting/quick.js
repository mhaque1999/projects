function quickSort(arr, leftIndex = 0, rightIndex = arr.length - 1) {
    if (leftIndex < rightIndex) {
        const pivotIndex = pivot(arr, leftIndex, rightIndex);
        quickSort(arr, leftIndex, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, rightIndex);
    }
    return arr;
}

function pivot(arr, startIndex = 0, endIndex = arr.length - 1) {
    const pivotValue = arr[startIndex];
    let pivotIndex = startIndex;

    for (let current = startIndex + 1; current <= endIndex; current++) {
        if (arr[current] < pivotValue) {
            pivotIndex++;
            swap(arr, current, pivotIndex);
        }
    }

    swap(arr, startIndex, pivotIndex);
    return pivotIndex;
}

function swap(arr, index1, index2) {
    const temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}
  
module.exports =  {pivot, quickSort};