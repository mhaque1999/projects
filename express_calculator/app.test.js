const {median, mean, mode} = require("./app")

describe("find median", function(){
    it("finds the median of an even set", function(){ 
      expect(median([1, 0, 3, 7])).toEqual(2)
    })
    it("finds the median of an odd set", function () { 
      expect(median([1, 10, 0])).toEqual(1)
    })
})
  
describe("find mean", function () {
    it("finds the mean of an array of numbers", function () { 
      expect(mean([1, -100, 30, 4])).toEqual(-16.25)
    })
})
  
describe("find mode", function () {
    it("finds the mode", function () { 
      expect(mode([1, 2, 2, 2, 3, 3])).toEqual(2)
    })
})