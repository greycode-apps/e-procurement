const {Bid, Institute} = require("../models");

const fs = require('fs');
const multer = require('multer');

// Set up multer storage and file filter
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the destination directory for file uploads
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for the uploaded file
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});


// const upload = multer({ storage, fileFilter });

const create = async(req, res) => {

    const {budget, desc, due_date, userId: user, trade_type} = req.body;
    

    const {userId} = req.user || user;

    try {

        if (!req.files || !req.files.quote) {
            return res.status(400).json({ error: "No file uploaded" });
          }
      
          const filePath = req.file.path;
        
          const quote = req.files.quote;
      
        const {id: owner} = await Institute.findOne({where: {userId}, attributes: ['id']});

        console.log(owner)

        const bid = await Bid.create({
            budget, desc, due_date, ownerId: owner, trade_type, quote: filePath,
        });

        if(!bid){
            return res.json({msg: "Failed to create Bid."})
        }

        const targetPath = `uploads/${req.file.filename}`;
        fs.renameSync(req.file.path, targetPath);

        return res.json({msg: "Bid/Tender created successfully."});
    } catch (error) {
        console.log(error);
        return res.json({err: "Internal server error. Failed to create Bid"})
    }

}

const listBids = async(req, res) => {
    const userId = 1;

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
        const bids = await Bid.findAll();

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