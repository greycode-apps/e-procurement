const {Supplier, Payment:MyPayment} = require("../models");
const {Paynow} = require('paynow');
const {PAYNOW_INTEGRATION_ID, PAYNOW_INTEGRATION_KEY} = require('../config');

let paynow = new Paynow(PAYNOW_INTEGRATION_ID, PAYNOW_INTEGRATION_KEY);

const makePayment = async(req,res) => {
    const {phone, userId: user, bidId, trade_type} = req.body;

    const {id} = req.params;

    const userId =  user;

    try {

        const {id: owner, trade_type: trade_sector} = await Supplier.findOne({where: {userId}, attribute: ['id', 'trade_type']});

        // if(trade_sector !== trade_type){
        //     console.log(trade_sector)
        //     return res.json({msg: "You can only make payment your trade section."})
        // }

        const generateRandomNumber = () => {
            return Math.floor(1000 + Math.random() * 9000);
        };
  
        const generateRandomLetters = () => {
            const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const randomIndex1 = Math.floor(Math.random() * letters.length);
            const randomIndex2 = Math.floor(Math.random() * letters.length);
            return letters[randomIndex1] + letters[randomIndex2];
        };

        paynow.resultUrl = "http://example.com/gateways/paynow/update";
        paynow.returnUrl = "http://example.com/return?gateway=paynow&merchantReference=1234";

        const invoiceNo = generateRandomLetters() + generateRandomNumber();

        const payment = paynow.createPayment(invoiceNo, 'munyamakudzai095@gmail.com');

        payment.add(trade_sector, 1);

        const paymentExists = await MyPayment.findOne({where: {supplierId:owner}});

        if(paymentExists){
            return res.json({msg: "Payment for this term is already made.Please try again next term"})
        }

        const pay = await paynow.sendMobile(payment, phone, 'ecocash').then(response => {

            console.log(response)
            let pollUrl = response.pollUrl; 
            let status = paynow.pollTransaction(pollUrl);
            if (response.status === 'ok') {
                return status.then((resolvedStatus) => {
                  if (!resolvedStatus.paid) {
                    return Promise.resolve().then(() => {
                      return MyPayment.create({
                        trade_type: trade_sector,
                        amount: 150,
                        supplierId: owner
                      });
                    }).then(() => {
                      return res.json({ msg: "Payment processed successfully." });
                    });
                  } else {
                    return Promise.reject({ msg: "Payment already paid." });
                  }
                });
              } else {
                return Promise.reject({ msg: "Payment Failed. Please try again" });
              }


            
        }).catch(ex => {
            console.log('Your application has broken an axle', ex)
            return res.json({err: ex})
        })

        if(!pay){
            return res.json({msg: "Something went wrong"})
        }

        

    } catch (error) {
        console.log(error);
        return res.json({err: "Internal server error. Failed to make payment."})
    }
}

module.exports = {makePayment}