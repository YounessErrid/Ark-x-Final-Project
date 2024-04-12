const Agency = require('../models/agency.model');


const create= async (req , res) => {
    const {agencyName , location, password , email }= req.body;
try {
    if(!agencyName||!location||!password||!email){
        return res.status(400).json({
            message: "Please fill all the fields"
        })
    }
    const newAgency = new Agency({agencyName, location, password, email});
    await newAgency.save();
    return res
        .status(201).json({message: 'agency updated successfully', success: true});
        
        
} catch (error) {
    return res.status(500).json({error: 'internal server error', message: error.message, success: false});
}

};




const findOne = async (req , res) =>{
    const {id} = req.params;
    try{
        const agency = await Agency.findById(id);

        if(!agency){
            return res.status(404).json({
                message: "agency not found"
            })
        }
        return res.status(200).json(agency);
    }
    catch(error){
        console.error("Error finding agency", error);
        return res
        .status(500).json([
            {error: 'internal server error'},
            {message: error.message, success: false}]);

    }
};

const viewAll = (req , res) =>{
    try{
        const agency = Agency.find();
        if(agency > 0){
            return res.status(200).json(agency);
        }else{
            return res
            .status(404)
            .json({
                message: "agency not found"
            })
        }
    }catch(error){
    return res
      .status(500)
      .json([
        {error: 'internal server error'},
        {message: error.message, success: false}
      ]);
}
};
const update = async (req , res) =>{
    try{
        const {id} = req.params;
        const {agencyName, location, password, email }= req.body;
        if(!agencyName||!location||!password||!email){
            return res.status(400).json({
                message: "Please fill all the fields"
            })
        }
        const updatedAgency = await Agency.findByIdAndUpdate(id, {agencyName, location, password, email}, {new: true});
        if(!updatedAgency){
            return res.status(404).json({
                message: "agency not found"
            })
        }
        return res.status(200).json(updatedAgency);
    }
 catch(error){
    return res
    .status(500).json
    .json([
        {error: 'internal server error'},
        {message: error.message, success: false}
      ]);
}};
const remove = async (req , res) =>{
    try{
        const {id} = req.params;
        const deletedAgency = await Agency.findByIdAndDelete(id);
        if(!deletedAgency){
            return res.status(404).json({
                message: "agency not found"
            })
        }
        return res.status(200).json(deletedAgency);
    }catch(error){
        return res
      .status(500).json
      .json([
            {error: 'internal server error'},
            {message: error.message, success: false}
          ]);
    }
};

module.exports = {
    create,
    findOne,
    viewAll,
    update,
    remove
};