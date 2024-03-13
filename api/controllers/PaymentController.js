const {Supplier} = require("../models");
const {Paynow} = require('paynow');
const {PAYNOW_INTEGRATION_ID, PAYNOW_INTEGRATION_KEY} = require('../config');

let paynow = new Paynow(PAYNOW_INTEGRATION_ID, PAYNOW_INTEGRATION_KEY);

const makePayment = async(req,res) => {
    const {phone, amount, userId: user, bidId, trade_type} = req.body;

    const {id} = req.params;

    const userId =  user;

    try {

        const {id: owner, trade_type: trade_sector} = await Supplier.findOne({where: {userId}, attribute: ['id', 'trade_type']});

        if(trade_sector !== trade_type){
            console.log(trade_sector)
            return res.json({msg: "You can only make payment your trade section."})
        }

        const generateRandomNumber = () => {
            return Math.floor(1000 + Math.random() * 9000);
        };
  
        const generateRandomLetters = () => {
            const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const randomIndex1 = Math.floor(Math.random() * letters.length);
            const randomIndex2 = Math.floor(Math.random() * letters.length);
            return letters[randomIndex1] + letters[randomIndex2];
        };

        paynow.resultUrl = `http://localhost:8080/payment/result`;

        const invoiceNo = generateRandomLetters() + generateRandomNumber();

        const payment = paynow.createPayment(invoiceNo, 'munyamakudzai095@gmail.com');

        payment.add(trade_sector, amount);

        paynow.sendMobile(payment, phone, 'ecocash').then(response => {
            if(response.status === 'ok' && response.success){
                
                return res.json({msg: response.instructions});
            }else{
                return res.json(response.success);
            }
            
        }).catch(ex => {
            console.log('Your application has broken an axle', ex)
        })

    } catch (error) {
        console.log(error);
        return res.json({err: "Internal server error. Failed to make payment."})
    }
}

module.exports = {makePayment}