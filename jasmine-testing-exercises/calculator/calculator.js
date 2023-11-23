window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  let initialValues={amount:10000,years:10,rate:5};
  document.getElementById("loan-amount").value=10000;
  document.getElementById("loan-years").value=10;
  document.getElementById("loan-rate").value=5;
  update();

}

// Get the current values from the UI
// Update the monthly payment
function update() {
  let loanInputDetails=getCurrentUIValues();
  let monthlyPayment=calculateMonthlyPayment(loanInputDetails);
  updateMonthly(monthlyPayment);
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  const periodicInterestRate=(values.rate/100)/12;
  const totalNumOfPayments=values.years*12;
  const monthlyPaymentNumerator=values.amount*periodicInterestRate;
  const monthlyPaymentDenominator=1-Math.pow((1+periodicInterestRate),(-1*totalNumOfPayments));
  const monthlyPayment=(monthlyPaymentNumerator/monthlyPaymentDenominator).toFixed(2);
  return monthlyPayment;
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  const monthlyPayment=document.getElementById("monthly-payment");
  monthlyPayment.innerText=`$${monthly}`;
}
