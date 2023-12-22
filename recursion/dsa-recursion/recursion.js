/** product: calculate the product of an array of numbers. */

function product(nums) {
  // base case
  if (nums.length === 0) return 1;
  // normal case
  return nums.pop() * product(nums);
}

/** longest: return the length of the longest word in an array of words. */

function longest(words) {
  // base case
  if (words.length === 1) return words[0].length;
  // noraml case
  if (words[0].length >= words[1].length) {
    return longest(words.splice(0, 1));
  } else {
    return longest(words.splice(1, 1));
  }
}

/** everyOther: return a string with every other letter. */

function everyOther(str, idx = 1) {
  // base case
  if (str.length <= idx) return str;
  // noraml case
  return everyOther(str.slice(0, idx) + str.slice(idx + 1), (idx = idx + 1));
}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str, idx = 0) {
  // base case
  let leftIdx = idx;
  let rightIdx = str.length - idx - 1;
  if (leftIdx >= rightIdx) return true;
  //normal case
  if (str[leftIdx] !== str[rightIdx]) return false;
  return isPalindrome(str, idx + 1);
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val, idx = 0) {
  // base case
  if (idx === arr.length) return -1;
  //normal case
  if (arr[idx] === val) return idx;
  return findIndex(arr, val, idx + 1);
}

/** revString: return a copy of a string, but in reverse. */

function revString(str, revStr = "") {
  // base case
  if (str.length === 0) return revStr;
  // noraml case
  let lastChar = str.slice(-1);
  revStr = revStr.concat(lastChar);
  let strMinusLast = str.substring(0, str.length - 1);
  return revString(strMinusLast, revStr);
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj) {
  let stringArr = [];
  for (let key in obj) {
    if (typeof obj[key] === "string") stringArr.push(obj[key]);
    if (typeof obj[key] === "object") stringArr.push(...gatherStrings(obj[key]));
  }
  return stringArr;
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val, low = 0, high = arr.length - 1) {
  // Base Case - if value is not in array
  if (low > high) return -1;
  // Normal Case
  let middleIdx = Math.floor((low + high) / 2);
  let middleVal = arr[middleIdx];

  if (middleVal === val) {
    return middleIdx;
  } else if (middleVal < val) {
    low = middleIdx + 1;
    return binarySearch(arr, val, low, high);
  } else if (middleVal > val) {
    high = middleIdx - 1;
    return binarySearch(arr, val, low, high);
  }
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
