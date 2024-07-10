function radixSort(array) {
    const maxDigits = mostDigits(array);

    for (let digitPlace = 0; digitPlace < maxDigits; digitPlace++) {
        let buckets = Array.from({ length: 10 }, () => []);

        for (let number of array) {
            const digit = getDigit(number, digitPlace);
            buckets[digit].push(number);
        }
        array = buckets.flat();
    }

    return array;
}

function getDigit(number, digitPlace) {
    return Math.floor(Math.abs(number) / Math.pow(10, digitPlace)) % 10;
}

function digitCount(number) {
    return Math.floor(Math.log10(number)) + 1;
}

function mostDigits(array) {
    let maxDigits = 0;
    for (let number of array) {
        maxDigits = Math.max(maxDigits, digitCount(number));
    }
    return maxDigits;
}

module.exports = { getDigit, digitCount, mostDigits, radixSort };
