const {Trade} = require("../models");

const create = async(req, res) => {
    const {trade_type} = req.body;

    try {
        const exist = Trade.findOne({where: {trade_type}});

        if (exist){
            return res.json({msg: "Trade sector already listed."})
        }

        await Trade.create({trade_type});

        return res.json({msg: "Trade sector created."})

    } catch (error) {
        console.log(error);
        return res.json({err: "Internal server error. Failed to create."});
    }
}

const remove = async(req, res) => {

    const {id} = req.params;

    try {
        const trade = await Trade.findOne({where: {id}});
        if(!trade){
            return res.json({msg: "Not found."});
        }

        await trade.destroy();

        return res.json({msg: "Trade sector deleted successfully."})
    } catch (error) {
        console.log(error);
        return res.json({err: "Internal server error. Failed to delete."});
    }
}

module.exports = {
    create, remove,
}