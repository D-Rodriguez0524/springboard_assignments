function bubbleSort(arr) {
    const solver = (arr, idxOne, idxTwo) => {
      [arr[idxOne], arr[idxTwo]] = [arr[idxTwo], arr[idxOne]];
    };
    for (let i = arr.length; i > 0; i--) {
      for (let z = 0; z < i - 1; z++) {
        if (arr[z] > arr[z + 1]) {
          solver(arr, z, z + 1);
        }
      }
    }
    return arr;
  }
  
  module.exports = bubbleSort;