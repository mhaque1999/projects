const MarkovMachine = require("./markov");


describe("generating the markov machine", function () {
  let generator;
  
  beforeAll(function(){
    generator = new MarkovMachine("the cat in the hat");
  });

  afterAll(function(){
    generator = null;
  });

  test("testing the break up of the string", function () {
   expect(generator.words).toEqual([ "the", "cat", "in", "the", "hat" ])
  });

  test("testing the markov chain map", function(){
    expect(generator.markovChain).toEqual(new Map([["the", [ "cat", "hat" ]],
      ["cat", [ "in" ]],
      ["in", [ "the" ]],
      ["hat", [ null ]]]))
    });

  test("testing if it generates valid text", function () {
    let output = generator.makeText();
    let outputArray = output.split(/[ \r\n]+/);
    outputArray = outputArray.filter(c => c !== "");
    expect(outputArray[outputArray.length - 1]).toEqual("hat");
  });

  test("testing the length of the generated string", function () {
    let output = generator.makeText(5);
    let outputArray = output.split(/[ \r\n]+/);
    expect(outputArray.length).toBeLessThanOrEqual(5)
  });

});
