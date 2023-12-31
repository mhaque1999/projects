describe("calculator-test",function(){
  it("should calculate the monthly rate correctly", function () {
    // ...
    const values = {amount: 10000, years: 20, rate: 5,};
    expect(calculateMonthlyPayment(values)).toEqual('66.00');
  });
  
  
  it("should return a result with 2 decimal places", function() {
    // ..
    const values = {amount: 20000, years: 15, rate: 7,};
    expect(calculateMonthlyPayment(values)).toEqual('179.77');
  });
  
  /// etc
});

