function addCommas(number) {
  if (typeof number !== 'number') {
    throw new Error('Input must be a number');
  }

  // Convert number to string
  let numString = number.toString();

  // Add commas to the integer part
  numString = numString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return numString

}

module.exports = addCommas;