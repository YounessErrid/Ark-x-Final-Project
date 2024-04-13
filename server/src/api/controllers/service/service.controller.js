const service = require('../models/service.model');

const create = async (req , res) => {
    const { title , description } = req.body;
    try{
        if(!title||!description){
            return res.status(400).json({
                message: "Please fill all the fields"
            })
        }
        const newService = new service({title, description});
        await newService.save();
        res.status(200).json({
            success: true,
            message: "Service created successfully",
        });
    }catch (error) {
        return res
           .status(500)
           .json([
                { error: "Internal server error" },
                { message: `Error creating service: ${error.message}` },
            ]);
        }
    
};
const update = async (req, res, next) => {
    try{
        const {id} = req.params;
        const {title, description} = req.body;
        if(!title||!description){
            return res.status(400).json({
                message: "Please fill all the fields"
            })
        }
        const updatedService = await service.findByIdAndUpdate(id, {title, description}, {new: true});
        if(!updatedService){
            return res.status(404).json({
                message: "Service not found"
            })
        }
        return res.status(200).json(updatedService);
    }catch (error) {
        return res
          .status(500)
          .json([
            { error: "Internal server error" },
            { message: `Error updating client: ${error.message}` },
          ]);
      }
};
//define update
const findOne = async (req ,res) =>{
    const {id} = req.params;
    try{
        const service = await service.findById(id);
        if(!service){
            return res.status(404).json({
                message: "Service not found"
            })
        }
        return res.status(200).json(service);
    }catch(error){
        console.error("Error finding agency", error);
        return res
        .status(500).json([
            {error: 'internal server error'},
            {message: error.message, success: false}]);

    }

};
const viewall = async (req ,res) =>{
    try{
        const services = await service.find();
        if(!services){
            return res.status(404).json({
                message: "Services not found"
            })
        }
    }catch(error){
        return res.status(500)
        .json([
            {error: 'internal server error'},
            {message: error.message, success:false}]);
    }
    };
        
const remove = async (req ,res) =>{
    try{
        const {id} = req.params;
        const deletedservice = await service.findByIdAndDelete(id);
        if(!deletedservice){
            return res.status(404).json({
                message: "Service not found"
            })
        }
        return res.status(200).json(deletedservice);
    }catch(error){
        return res
       .status(500).json([
        {error: 'internal server error'},
        {message: error.message, success: false}]);
    }
};
module.exports = {
    create,
    findOne,
    viewall,
    remove,
    update
};