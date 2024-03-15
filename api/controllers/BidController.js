const {Bid, Institute, Supplier} = require("../models");


const create = async(req, res) => {

    const {budget, desc, due_date, userId: user, trade_type} = req.body;
    
    const {userId} = req.user || user;

    try {
      
        const currentDate = new Date();
        const selectedDate = new Date(due_date);

        if (selectedDate < currentDate) {
        return res.status(400).json({ err: "Invalid due date. Due date must be greater than current date." });
        }
        const {id: owner} = await Institute.findOne({where: {userId}, attributes: ['id']});

       
        const bid = await Bid.create({
            budget, desc, due_date, ownerId: owner, trade_type
        });

        if(!bid){
            return res.json({err: "Failed to create Bid."})
        }

        return res.json({msg: "Bid/Tender created successfully."});
    } catch (error) {
        console.log(error);
        return res.json({err: "Internal server error. Failed to create Bid"})
    }

}

const listBids = async(req, res) => {
    const {userId} = req.user || 2;

    try {
        const {id: owner} = await Institute.findOne({where: {userId}, attributes: ['id']});

        const bid = await Bid.findAll({where: {ownerId: owner}});

       return res.json({data: bid});
    } catch (error) {
        console.log(error);
        return res.json({err: "Internal server error. Failed to retreive tenders."})
    }
}

const listAllBids = async(req, res) => {
    try {
        const bids = await Bid.findAll({
            include: [Institute]
          });

        return res.json({data: bids});
    } catch (error) {
        console.log(error);
        return res.json({err: "Internal server error. Failed to retreive bids."})
    }
}

const deleteBid = async(req,res) => {

    const {id} = req.params;

    try {
        
        const bid = await Bid.findOne({where: {id}});

        if(!bid){
            return res.json({msg: "Bid not found."});
        }

        await bid.destroy();

        return res.json({msg: "Bid deleted successfully."});
    } catch (error) {
        console.log(error);
        return res.json({err: "Internal server error. Failed to delete Bid."});
    }
}


const listOneBid = async(req, res) => {

    const {id} = req.params;

    try {
        const bid = await Bid.findOne({where: {id}});

        if(!bid){
            return res.json({msg: "Bid not found."});
        }

        return res.json({data: bid});
    } catch (error) {
        console.log(error);
        return res.json({err: "Internal server error. Failed to retrieve bid."})
    }
}


module.exports = {
    create, listBids, deleteBid, listAllBids, listOneBid
}