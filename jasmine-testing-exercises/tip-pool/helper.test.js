describe("sumPaymentTotal Test",function(){
    beforeEach(function(){
        billAmtInput.value = 100;
        tipAmtInput.value = 10;
        submitPaymentInfo();
    });

    it('should calculate tip amount on sumPaymentTotal()',function(){
        expect(sumPaymentTotal('tipAmt')).toEqual(10);
    });

    it('should calculate total bill amount on sumPaymentTotal()',function(){
        expect(sumPaymentTotal('billAmt')).toEqual(100);
    });

    it('should calculate total tip percent on sumPaymentTotal()',function(){
        expect(sumPaymentTotal('tipPercent')).toEqual(10);
    });

    it('should calculate tip percent on calculateTipPercent()',function(){
        expect(calculateTipPercent(100,10)).toEqual(10);
    });

      afterEach(function() {
        billAmtInput.value = '';
        tipAmtInput.value = '';
        paymentTbody.innerHTML = '';
        summaryTds[0].innerHTML = '';
        summaryTds[1].innerHTML = '';
        summaryTds[2].innerHTML = '';
        serverTbody.innerHTML = '';
        allPayments = {};
        paymentId=0;
      });
})