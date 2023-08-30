/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chain = new Map();

    for (let i = 0; i < this.words.length; i+=1 ) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if(chain.has(word)) 
      chain.get(word).push(nextWord);
      else 
      chain.set(word,[nextWord]);
    }
    this.chain = chain;
  }

  static randomIdx(arr){
    return arr[Math.floor(Math.random() * arr.length)];
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // get random key from chain
    let keys = Array.from(this.chain.keys());
    let randKey = MarkovMachine.randomIdx(keys);
    let output = [];

    // writing a chain until the target word is reached
    while (output.length < numWords && randKey != null) {
      output.push(randKey);
      randKey = MarkovMachine.randomIdx(this.chain.get(randKey));
    }
    return output.join(" ");
  }
}

module.exports = {
  MarkovMachine,
};
