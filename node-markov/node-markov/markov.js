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
    // TODO
    console.log(this.words);
    let map = new Map();
    let index = 0;
    let nextWord;
    this.words.forEach(word => {
      nextWord = null;
      if (index != this.words.length - 1){
        nextWord = this.words[index + 1]
      }
      //if word doesn't exist creates a array with the next word, else pushes word to existing array
      if(!map.has(word)){
        map.set(word,[nextWord]);
      }
      else{
        let array = map.get(word);
        array.push(nextWord);
        map.set(word,array);
      }
      index += 1
    });
    this.markovChain = map;

  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    let output = [];
    for(let word = 0; word !== numWords; word += 1){
      //choose random word from chain
      if(word == 0){
        let chain = Array.from(this.markovChain)
        let newWordSet = chain[Math.floor(Math.random() * chain.length)]
        let newWord = newWordSet[0]
        output.push(newWord)
      }
      else if(output[output.length - 1] === null){
        break;
      }
      else{
        let newWordArray = Array.from(this.markovChain.get(output[output.length - 1]))
        let newWord = newWordArray[Math.floor(Math.random() * newWordArray.length)]
        output.push(newWord)
      }
      //console.log(output)
    }
    console.log(output)
    let sentence = output.join(" ")
    console.log(sentence)
    return sentence
  }
}
module.exports = MarkovMachine;



