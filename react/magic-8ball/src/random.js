/** Return a random item from a list. */

const choice = (arr) => {
    let randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

export { choice };