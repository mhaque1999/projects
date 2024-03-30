/** product: calculate the product of an array of numbers. */

function product(nums,final = 0) {
  if (nums.length === 0) return final;
    
  if (final === 0){
    return product(nums.slice(1),final=nums[0]);
  }
  return product(nums.slice(1),final=final*nums[0]);
}

/** longest: return the length of the longest word in an array of words. */

function longest(words,len = 0) {
  if (words.length === 0) return len;
  if (len > words[0].length){
    return longest(words.slice(1),len);
  }
  else{
    len = words[0].length
    return longest(words.slice(1),len);
  }
  

}

/** everyOther: return a string with every other letter. */

function everyOther(str, finalString="", index = 0) {

  if (str.length === index || str.length === 0) return finalString;

  if(index % 2 === 0){
    return everyOther(str, finalString = finalString + str[index], index += 1)
  }
  return everyOther(str, finalString, index+=1)

}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str, index = 0) {
  let leftIndex = index;
  let rightIndex = str.length - index - 1;
  if (leftIndex >= rightIndex) return true;
  if (str[leftIndex] !== str[rightIndex]) return false;
  return isPalindrome(str, index + 1);

}

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val, index = 0) {
  if (arr.length === index){return -1}
  if (arr[index] === val){return index}
  return findIndex(arr, val, index+=1)
}

/** revString: return a copy of a string, but in reverse. */

function revString(str, finalString = "", index = 0) {
  if (str.length === index || str.length === 0) return finalString;

  return revString(str, finalString + str[str.length-index-1], index+=1)
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj, finalArray = []) {
  for (const [key, value] of Object.entries(obj)){
    console.log(obj[key], key)
    if (typeof value === "object"){
      gatherStrings(value,finalArray)
    }
    if(typeof value === "string") finalArray.push(value)
  }
  return finalArray
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val) {

}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch
};
