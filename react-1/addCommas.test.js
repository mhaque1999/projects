const addCommas = require("./addCommas");

describe("#addCommas", () => {
  test("it is a function", () => {
    expect(typeof addCommas).toBe("function");
  });
  
  test('addCommas converts 1234 to "1,234"', () => {
    expect(addCommas(1234)).toBe("1,234");
  });
  
  test('addCommas converts 1000000 to "1,000,000"', () => {
    expect(addCommas(1000000)).toBe("1,000,000");
  });
  
  test('addCommas converts 9876543210 to "9,876,543,210"', () => {
    expect(addCommas(9876543210)).toBe("9,876,543,210");
  });
  
  test('addCommas converts 6 to "6"', () => {
    expect(addCommas(6)).toBe("6");
  });
  
  test('addCommas converts -10 to "-10"', () => {
    expect(addCommas(-10)).toBe("-10");
  });
  
  test('addCommas converts -5678 to "-5,678"', () => {
    expect(addCommas(-5678)).toBe("-5,678");
  });
  
});
