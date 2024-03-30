const express = require('express');
const ExpressError = require('./expressError');
const app = express();


//const { convertAndValidateNumsArray, findMode, findMean, findMedian } = require('./helpers');
function mean(array){
  let count = 0;
  let sum = 0;
  let avg = 0
  for (const number of array){
    if (isNaN(Number(number)) ){
        throw new ExpressError(`${number} is not a number`)
    }
    count += 1
    sum += Number(number)
    console.log(`The sum is ${sum}`)
    avg = sum/count
    console.log(avg)
  }
  return avg
}

function mode(array){
  let object = {}

  for (let i = 0; i < array.length; i++) {
    numberKey = Number(array[i])
    console.log(numberKey);
    if (object[numberKey]) {
      object[numberKey] += 1
    } else {
      object[numberKey] = 1
    }
  }
  
  let frequency = -1
  let mode = -1

  Object.keys(object).forEach(key => {
    let value = object[key]
    if (value > frequency) {
      frequency = value
      mode = key
    }
  })
  return Number(mode)
}

function median(array){
  let numbersArray = array.map(Number)

  numbersArray.sort()
  console.log(numbersArray)
  let median = 0;
  if (numbersArray.length % 2 == 0){
    median = (numbersArray[Math.floor(numbersArray.length/2)]+numbersArray[Math.floor(numbersArray.length/2)-1])/2;
  }
  else{
    median = numbersArray[Math.floor(numbersArray.length/2)]
  }
  console.log(Math.floor(numbersArray.length/2))
  return median
}

app.get('/mean', function(req, res, next) {
  if (!req.query.nums) {
    throw new ExpressError('Nums are required.', 400)
  }
  let numbersFromRequest = req.query.nums.split(',');

  //avg = mean(numbersFromRequest)

  //let nums = convertAndValidateNumsArray(numsAsStrings);
  // for (const number of numbersFromRequest){
  //   if (isNaN(Number(number)) ){
  //       throw new ExpressError(`${number} is not a number`)
  //   }
  //   count += 1
  //   sum += Number(number)
  //   console.log(`The sum is ${sum}`)
  //   avg = sum/count
  //   console.log(avg)
  // }



  let result = {
    operation: "mean",
    result: mean(numbersFromRequest)
  }

  return res.send(result);
});

app.get('/mode', function(req, res, next) {
  if (!req.query.nums) {
    throw new ExpressError('Nums are required.', 400)
  }
  let numbersFromRequest = req.query.nums.split(',');
  
  let object = {}

  object = mode(numbersFromRequest)
  // for (let i = 0; i < numbersFromRequest.length; i++) {
  //   numberKey = Number(numbersFromRequest[i])
  //   //console.log(object[numbersFromRequest])
  //   console.log(numberKey);
  //   if (object[numberKey]) {
  //     object[numberKey] += 1
  //   } else {
  //     object[numberKey] = 1
  //   }
  // }
  
  // let frequency = -1
  // let mode = -1

  // Object.keys(object).forEach(key => {
  //   let value = object[key]
  //   if (value > frequency) {
  //     frequency = value
  //     mode = key
  //   }
  // })

  // console.log(object)
  let result = {
    operation: "mode",
    result: mode(numbersFromRequest)
  }

  return res.send(result);
  
});

app.get('/median', function(req, res, next) {
  if (!req.query.nums) {
    throw new ExpressError('Nums are required.', 400)
  }
  let numbersFromRequest = req.query.nums.split(',');
  // let numbersArray = numbersFromRequest.map(Number)

  // numbersArray.sort()
  // console.log(numbersArray)
  // let median = 0;
  // if (numbersArray.length % 2 == 0){
  //   median = (numbersArray[Math.floor(numbersArray.length/2)]+numbersArray[Math.floor(numbersArray.length/2)-1])/2;
  // }
  // else{
  //   median = numbersArray[Math.floor(numbersArray.length/2)-1]
  // }
  // console.log(Math.floor(numbersArray.length/2))
  let result = {
    operation: "median",
    result: median(numbersFromRequest)
  }

  return res.send(result);
  
});

// /** general error handler */

// app.use(function (req, res, next) {
//   const err = new ExpressError("Not Found",404);

//   // pass the error to the next piece of middleware
//   return next(err);
// });

/** general error handler */

app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message
  });
});


app.listen(5000, function() {
  console.log(`Server starting on port 3000`);
});

module.exports = {mean, median, mode};