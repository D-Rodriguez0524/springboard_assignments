function binarySearch(arr, target, start, end) {
    while (start <= end) {

        let mid = Math.floor((start + end) / 2)

        if (arr[mid] === target) return mid

        if (target < arr[mid]) {
            end = mid - 1
        } else {
            start = mid + 1
        }
    }
    return -1
}

function findPivotPnt(arr) {
    if (arr.length === 1 || arr[0] < arr[arr.length - 1]) return 0;
    let start = 0
    let end = arr.length - 1

    while (start <= end) {
        let mid = Math.floor((start + end) / 2)
        if (arr[mid] > arr[mid + 1]) return mid + 1
        else if (arr[start] <= arr[mid]) {
            start = mid + 1
        } else {
            end = mid - 1
        }

    }
}

function findRotatedIndex(arr, target) {
    let pivotPnt = findPivotPnt(arr)
    if (pivotPnt > 0 && target >= arr[0] && target <= arr[pivotPnt - 1]) {
        return binarySearch(arr, target, 0, pivotPnt - 1)
    } else {
        return binarySearch(arr, target, pivotPnt, arr.length - 1)
    }

}

// test cases
console.log(findRotatedIndex([3, 4, 1, 2], 4),
    findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 8),
    findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 3),
    findRotatedIndex([37, 44, 66, 102, 10, 22], 14),
    findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 12))

