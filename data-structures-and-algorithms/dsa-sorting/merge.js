function merge(arrOne, arrTwo) {
    let values = [];
    let dataOne = 0;
    let dataTwo = 0;
    while (dataOne < arrOne.length && dataTwo < arrTwo.length) {
      if (arrTwo[dataTwo] > arrOne[dataOne]) {
        values.push(arrOne[dataOne]);
        dataOne++;
      } else {
        values.push(arrTwo[dataTwo]);
        dataTwo++;
      }
    }
    while (dataOne < arrOne.length) {
      values.push(arrOne[dataOne]);
      dataOne++;
    }
    while (dataTwo < arrTwo.length) {
      values.push(arrTwo[dataTwo]);
      dataTwo++;
    }
    return values;
  }
  
  function mergeSort(arr) {
    if (arr.length <= 1) {
      return arr;
    }
    const center = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, center));
    const right = mergeSort(arr.slice(center));
    return merge(left, right);
  }
  
  module.exports = { merge, mergeSort };