function findFirstIdx(arr, num, start = 0, end = arr.length - 1) {
    while (start <= end) {
        let mid = Math.floor((start + end) / 2)

        if (mid === 0 || num > arr[mid - 1] && arr[mid] === num) {
            return mid
        } else if (num > arr[mid]) {
            return findFirstIdx(arr, num, mid + 1, end)
        } else {
            return findFirstIdx(arr, num, start, mid - 1)
        }
    }
    return -1
}

function findLastIdx(arr, num, start = 0, end = arr.length - 1) {
    while (start <= end) {
        let mid = Math.floor((start + end) / 2)

        if ((mid === arr.length - 1 || arr[mid] < arr[mid + 1]) && arr[mid] === num) {
            return mid;
        } else if (num < arr[mid]) {
            return findLastIdx(arr, num, start, mid - 1)
        } else {
            return findLastIdx(arr, num, mid + 1, end)
        }
        return -1
    }
}

function sortedFrequency(arr, num) {
    let firstIdx = findFirstIdx(arr, num)
    if (firstIdx === -1) return firstIdx
    let lastIdx = findLastIdx(arr, num)
    return lastIdx - firstIdx + 1
}


//test cases
console.log(sortedFrequency([1, 1, 2, 2, 2, 2, 3], 2),
    sortedFrequency([1, 1, 2, 2, 2, 2, 3], 3),
    sortedFrequency([1, 1, 2, 2, 2, 2, 3], 1),
    sortedFrequency([1, 1, 2, 2, 2, 2, 3], 4)) 