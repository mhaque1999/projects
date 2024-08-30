function sortedFrequency(arr, num) {
    
    function findFirst(arr, num) {
        let low = 0;
        let high = arr.length - 1;
        let result = -1;

        while (low <= high) {
            let mid = Math.floor((low + high) / 2);
            if (arr[mid] === num) {
                result = mid;
                high = mid - 1; 
            } else if (arr[mid] < num) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return result;
    }

    function findLast(arr, num) {
        let low = 0;
        let high = arr.length - 1;
        let result = -1;

        while (low <= high) {
            let mid = Math.floor((low + high) / 2);
            if (arr[mid] === num) {
                result = mid;
                low = mid + 1; 
            } else if (arr[mid] < num) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return result;
    }

    let firstIndex = findFirst(arr, num);
    if (firstIndex === -1) {
        return -1; 
    }

    let lastIndex = findLast(arr, num);
    return lastIndex - firstIndex + 1;
}

module.exports = sortedFrequency;
