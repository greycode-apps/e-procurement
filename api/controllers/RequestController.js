const {Request, User, Supplier,Bid, Institute, Payment} = require("../models");
const EmailSender = require("../services/Email");


const makeRequest = async(req, res) => {
    const {supplierId:user, bidId, desc, budget, qoute, trade_type:trade_sector} = req.body;

    try {
        
        const reqExists = await Request.findOne({where: {bidId}});

        if(reqExists){
            return res.json({msg: "You have already applied for this tender|bid. Please try another one."})
        }

        const userz = await User.findOne({where: {id:user}, include: [Supplier]});

        const {supplierId, org_name, trade_type, email} = userz.Supplier;

        // const {email} = await Bid.findOne({where: {id:bidId}, include: [Institute]});

        // if(trade_type !== trade_sector){
        //     return res.json({msg: "You can only make request to bids|tenders in your trading sector."});
        // }

        const paymentExists = await Payment.findOne({where: {supplierId:user}});

        if(!paymentExists){
            return res.json({msg: "Please subscribe|make payment 1st then make a request."});
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
        const request = await Request.findOne({where: {id}});

        if(!request){
            return res.json({msg: "Request does not exist."});
        }

        await request.update({
            is_accepted: false
        })

        return res.json({msg: "Request was rejected."})
    } catch (error) {
        console.log(error);
        return res.json({msg: "Internal server error. Failer to reject request"});
    }
}

const acceptRequest = async(req, res) => {
    const {id} = req.params;
    
    try {

        const bid = await Bid.findOne({where: {id}, include: [Institute]});
        const request = await Request.findOne({where: {id}});

        const {trade_type, org_name: institute, due_date} = bid;
        
        const supDetails = await Supplier.findAll({include: [User]})

        if(!bid){
            return res.json({msg: "Tender for this request is not found | tender might have expired or applied. Please try another one."})
        }

        if(supDetails.length > 0){
            const details = supDetails[supDetails.length - 1];

            const {org_name, User} = details;

            await bid.update({
                is_available: false,
                acceptedFor: org_name
            });

            await request.update({
                is_accepted: true
            });

            const send = new EmailSender();

            send.sendEmail(User.email, 'Request|Qoute accepted.', `Your request to supply ${trade_type} items for ${institute} was accepted. Please make sure you supply the requested items before ${due_date}`);

            return res.json({msg: "Request accepted."});
        }else{
            return res.json({msg: "Failed to accept request"});
        }
        
        
    } catch (error) {
        console.log(error);
        return res.json({msg: "Internal server error. Failer to accept request"});
    }
}

const myRequest = async(req, res) => {
    try {
        const request = await Request.findAll();

        return res.json({data: request});
    } catch (error) {
        return res.json({msg: "Internal server error. Failed to retrieve your requests."});
    }
}

module.exports = {
    makeRequest,
    rejectRequest,
    acceptRequest,
    myRequest
}