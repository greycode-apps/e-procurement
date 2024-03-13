const {Request, User} = require("../models");
const Bid = require("../models/Bid");
const EmailSender = require("../services/Email");


const makeRequest = async(req, res) => {
    const {userId:user, bidId, desc, budget, qoute, trade_type:trade_sector} = req.body;

    const {userId} = req.user;

    try {
        
        const reqExists = await Request.findOne({where: {bidId}});

        if(reqExists){
            return res.json({msg: "You have already applied for this tender|bid. Please try another one."})
        }

        const {trade_type, org_name, supplierId} = await User.findOne({where: {user}, include: [Supplier]});

        const {email} = await Bid.findOne({where: {bidId}, include: [User]});

        if(trade_type !== trade_sector){
            return res.json({msg: "You can only make request to bids|tenders in your trading sector."});
        }

        const paymentExists = await Payment.findOne({where: {supplierId}});

        if(!paymentExists){
            return res.json({msg: "Please subscribe 1st then make a request."});
        }

        await Request.create({
            send_to: org_name, desc, budget, qoute, bidId, supplierId
        });

        const send = new EmailSender();

        send.sendEmail(email, `Tender request.`, `Bid | Tender request for ${bidId} in the Trade Sector: ${trade_sector}\n\n Login to accept or reject offers`);

        return res.json({msg: "Request sent successfully."});
    } catch (error) {
        console.log(error);
        return res.json({err: "Internal server error. Faile to send request."});
    }
}

const rejectRequest = async(req, res) => {
    const {id} = req.params;
    
    try {
        
    } catch (error) {
        console.log(error);
        return res.json({msg: "Internal server error. Failer to reject request"});
    }
}

const acceptRequest = async(req, res) => {
    const {id} = req.params;
    
    try {

        const {bid: {trade_type, org_name: institute, due_date}} = await Bid.findOne({where: {id}, include: [Institute]});

        const {supplierId, org_name, email} = await Supplier.findOne({where: {id}, include: [User]})

        if(!bid){
            return res.json({msg: "Tender for this request is not found | tender might have expired or applied. Please try another one."})
        }

        await bid.update({
            is_available: false,
            acceptedFor: org_name
        });

        const send = new EmailSender();

        send.sendEmail(email, 'Request|Qoute accepted.', `Your request to supply ${trade_type} items for ${institute} was accepted. Please make sure you supply the requested items before ${due_date}`);
        
    } catch (error) {
        console.log(error);
        return res.json({msg: "Internal server error. Failer to reject request"});
    }
}

module.exports = {
    makeRequest,
    rejectRequest,
    acceptRequest
}