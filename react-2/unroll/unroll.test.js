const unroll = require('./unroll');

test('unrolls a 1x1 square array', () => {
  const squareArray = [ [1] ];
  const result = unroll(squareArray);
  expect(result).toEqual([1]);
});

test('unrolls a 2x2 square array', () => {
  const squareArray = [
    [1, 2],
    [3, 4]
  ];
  const result = unroll(squareArray);
  expect(result).toEqual( [1, 2, 4, 3] );
});

test('unrolls a 3x3 square array', () => {
  const squareArray = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];
  const result = unroll(squareArray);
  expect(result).toEqual([1, 2, 3, 6, 9, 8, 7, 4, 5]);
});

test('unrolls a 4x4 square array', () => {
  const squareArray = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
  ];
  const result = unroll(squareArray);
  expect(result).toEqual([1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10]);
});



