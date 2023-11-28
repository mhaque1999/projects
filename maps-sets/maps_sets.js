/*
new Set([1,1,2,2,3,4]) //returns {1,2,3,4}
*/

/*
[...new Set("referee")].join("") //returns "ref"
*/

/*
let m = new Map();
m.set([1,2,3], true);
m.set([1,2,3], false); //returning m results in {[1,2,3] => true,[1,2,3] => false}
*/

const hasDuplicate = (arr) => {
    arraySet = new Set(arr);
    if(arraySet.size === arr.length) return false;
    return true;
}

const vowelCount = (str) => {
    const vowels = "aeiou";
    const vowelMap = new Map();
    for(char of str){
        let lowerCase = char.toLowerCase();
        if(vowels.indexOf(lowerCase) !== -1){
            if(vowelMap.has(lowerCase)){
                vowelMap.set(lowerCase,vowelMap.get(lowerCase)+1);
            }
            else{
                vowelMap.set(lowerCase,1);
            }
        }
    }
    return vowelMap;
}