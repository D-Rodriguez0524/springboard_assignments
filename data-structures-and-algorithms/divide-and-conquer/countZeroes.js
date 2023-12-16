function countZeroes(arr) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        // If mid element is 1, move left pointer to the right to find the first 0
        if (arr[mid] === 1) {
            left = mid + 1;
        } else { // If mid element is 0, move right pointer
            if (mid === 0 || arr[mid - 1] === 1) {
                return arr.length - mid;
            } else {
                right = mid - 1;
            }
        }
    }

    return 0; // If there are no zeroes in the array
}
// Test cases 
console.log(countZeroes([1, 1, 1, 1, 0, 0]), // 2
    countZeroes([1, 0, 0, 0, 0]), // 4
    countZeroes([0, 0, 0]), // 3
    countZeroes([1, 1, 1, 1])); // 0)

