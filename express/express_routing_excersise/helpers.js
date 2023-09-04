
/**
 * Build a frequancy counter object from an array
 * @param {Array} arr  
 */

function frequencyCounter(arr) {
    return arr.reduce((acc, next) => {
        acc[next] = (acc[next] || 0) + 1;
        return acc;
    }, {});
}


/**
 * find the most common element in the array
 * @param {Array} arr any array 
 * 
 */

function findMode(arr) {
    let freq = frequencyCounter(arr);

    let count = 0;
    let mode;

    for (let key in freq) {
        if (freq[key] > count) {
            // update the mode 
            mode = key;
            // update count 
            count = freq[key];
        }
    }

    return +mode;
}

function convertAndValidateNumsArray(numsAsStrings) {
    let result = [];

    for (let i = 0; i < numsAsStrings.length; i++) {
        let valToNumber = Number(numsAsStrings[i]);

        if (Number.isNaN(valToNumber)) {
            return new Error(
                `The value '${numsAsStrings[i]}' at index ${i} is not a valid number.`
            );
        }

        result.push(valToNumber);
    }
    return result;
}

/**
 * finding the average of an array of numbers
 */
function findMean(nums) {
    if (nums.length === 0) return 0;
    return nums.reduce((acc, cur) => {
        return acc + cur;
    }) / nums.length
}

/**
 * find the middle element of an array of numbers
 */
function findMedian(nums) {
    nums.sort((a, b) => a - b)

    let middleNum = Math.floor(nums.length / 2);
    let median;

    if (nums.length % 2 === 0) {
        median = (nums[middleNum] + nums[middleNum - 1]) / 2;
    }
    else {
        median = nums[middleNum];
    }
    return median;
}

module.exports = {
    findMean,
    findMedian,
    findMode,
    convertAndValidateNumsArray
};