function findFloor(arr, num, low = 0, high = arr.length - 1) {
    if (low > high) return -1;
    if (num >= arr[high]) return arr[high];

    let mid = Math.floor((low + high) / 2);

    if (arr[mid] === num) return arr[mid];

    if (mid > 0 && arr[mid - 1] <= num && num < arr[mid]) {
        return arr[mid - 1];
    }

    if (num < arr[mid]) {
        return findFloor(arr, num, low, mid - 1);
    }

    return findFloor(arr, num, mid + 1, high);
}


// test cases
console.log(findFloor([1, 2, 8, 10, 10, 12, 19], 9),
    findFloor([1, 2, 8, 10, 10, 12, 19], 20),
    findFloor([1, 2, 8, 10, 10, 12, 19], 0))

