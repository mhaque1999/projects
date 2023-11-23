describe("Payments test", function() {
    beforeEach(function () {
      billAmtInput.value = 100;
      tipAmtInput.value = 10;
    });
  
    it('should add a new payment on submitPaymentInfo()', function () {
      submitPaymentInfo();
      expect(Object.keys(allPayments).length).toEqual(1);
      expect(allPayments['payment1'].billAmt).toEqual('100');
      expect(allPayments['payment1'].tipAmt).toEqual('10');
      expect(allPayments['payment1'].tipPercent).toEqual(10);
    });
 
    it('should create a new payment on createCurPayment()', function () {
        let expectedPayment = {billAmt: '100',tipAmt: '10',tipPercent: 10,}
        expect(createCurPayment()).toEqual(expectedPayment);
      });

    it('should payment update #paymentTable on appendPaymentTable()', function () {
      let currentPayment = createCurPayment();
      allPayments['payment1'] = currentPayment;
      appendPaymentTable(currentPayment);
      let currentTdList=document.querySelectorAll('#paymentTable tbody tr td');
      expect(currentTdList.length).toEqual(4);
      expect(currentTdList[0].innerText).toEqual('$100');
      expect(currentTdList[1].innerText).toEqual('$10');
      expect(currentTdList[2].innerText).toEqual('10%');
    });
    
    afterEach(function() {
      billAmtInput.value = '';
      tipAmtInput.value = '';
      paymentTbody.innerHTML = '';
      summaryTds[0].innerHTML = '';
      summaryTds[1].innerHTML = '';
      summaryTds[2].innerHTML = '';
      serverTbody.innerHTML = '';
      paymentId = 0;
      allPayments = {};
    });
  });