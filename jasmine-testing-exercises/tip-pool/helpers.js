
// accepts 'tipAmt', 'billAmt', 'tipPercent' and sums total from allPayments objects
function sumPaymentTotal(type) {
  let total = 0;

  for (let key in allPayments) {
    let payment = allPayments[key];

    total += Number(payment[type]);
  }

  return total;
}

// converts the bill and tip amount into a tip percent
function calculateTipPercent(billAmt, tipAmt) {
  return Math.round(100 / (billAmt / tipAmt));
}

// expects a table row element, appends a newly created td element from the value
function appendTd(tr, value) {
  let newTd = document.createElement('td');
  newTd.innerText = value;

  tr.append(newTd);
}

// expects table row element, appens a td element to delete
function appendDeleteBtn(tr){
  let newTd=document.createElement("td");
  newTd.innerText="X";
  newTd.classList.add("deleteBtn");
  newTd.addEventListener("click",function(event){
    console.log(event.target.closest("tr"));
    let tableRow=event.target.closest("tr");
    let table=tableRow.parentNode;
    delete allServers[tableRow.id];
    delete allPayments[tableRow.id];
    table.removeChild(tableRow);
    updateServerTable();
    updateSummary();
  })
  tr.append(newTd);
}
