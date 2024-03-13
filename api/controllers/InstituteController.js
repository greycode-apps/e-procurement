const {Institute} = require("../models");


const create = async(req, res) => {
    const {org_name, address, phone, userId} = req.body;

    try {
        const orgExist = await Institute.findOne({where: {org_name}});

        if(orgExist){
            return res.json({msg: 'Organaisation already exists. Try another name or login.'});
        }

        const modifiedPhone = `263${phone.replace(/-/g, '').replace(/^0/, '')}`;

        const org = await Institute.create({
            address, phone: modifiedPhone, org_name, userId 
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
    create,

}