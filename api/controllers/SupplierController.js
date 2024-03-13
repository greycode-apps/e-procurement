const {Supplier} = require("../models");


const create = async(req, res) => {
    const {address, phone, org_name, tax_no, trade_type} = req.body;

    const {userId} = req.user;
    try {
        
        const orgExist = await Supplier.findOne({where: {org_name, tax_no}});
       

        if(orgExist){
            return res.json({msg: 'Organaisation already exists. Try another name or login.'});
        }

        const modifiedPhone = `263${phone.replace(/-/g, '').replace(/^0/, '')}`;

        const org = await Supplier.create({
            address, phone: modifiedPhone, org_name, tax_no, trade_type, userId 
        });

        if(!org){
            return res.json({msg: "Error creating organisation data."})
        }
        
        return res.json({msg: 'Organisation info updated successfully.'});

    } catch (error) {
        console.log(error);
        
        return res.json({err: 'Internal server error. Failed to update organisation details.'});
        
    }
}

module.exports = {
    create
}