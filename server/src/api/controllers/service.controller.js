const Service = require("../models/services.model");

const create = async (req, res) => {
  const { title, description } = req.body;
  try {
    if (!title || !description) {
      return res.status(400).json({
        message: "Service creation failed: Missing required information!",
      });
    }

    // Check if a service with the same title already exists
    const existingService = await Service.findOne({ title });
    if (existingService) {
      return res.status(409).json({
        error: {
          message: "Service with this title already exists!",
          response: { status: 409 } // Add the status property to the response
        }
      });
    }

    const newService = new Service({ title, description });
    const data = await newService.save();
    res.status(200).json({
      success: true,
      message: "Service created successfully",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      message: `Error creating service: ${error.message}`,
    });
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newService = req.body;
    
    if (!newService) {
      return res.status(400).json({
        message: "Service update failed: Missing required information!"
      });
    }

    // Check if the user wants to update the service title
    if (newService.title) {
      // Check if a service with the new title already exists
      const existingService = await Service.findOne({ title: newService.title });
      if (existingService && existingService._id.toString() !== id) {
        return res.status(409).json({
          error: {
            message: "Service with this title already exists!",
            response: { status: 409 }
          }
        });
      }
    }
    
    const updatedService = await Service.findByIdAndUpdate({_id: id}, { ...newService }, { new: true });
    if (!updatedService) {
      return res.status(404).json({
        message: "Service not found"
      });
    }
    
    return res.status(200).json(updatedService);
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      message: `Error updating client: ${error.message}`
    });
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }
    return res.status(200).json(service);
  } catch (error) {
    console.error("Error finding service", error);
    return res
      .status(500)
      .json([
        { error: "internal server error" },
        { message: error.message, success: false },
      ]);
  }
};
const viewAll = async (req, res) => {
  try {
    const services = await Service.find();

    if (services.length > 0) {
      return res.status(200).json(services);
    } else {
      return res.status(404).json({ error: "No services found!" });
    }
  } catch (error) {
    return res
      .status(500)
      .json([
        { error: "Internal server error" },
        { message: `Error retrieving services: ${error.message}` },
      ]);
  }

};
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedservice = await Service.findByIdAndDelete(id);
    if (!deletedservice) {
      return res.status(404).json({
        message: "Service not found",
      });
    }
    return res.status(200).json(deletedservice);
  } catch (error) {
    return res
      .status(500)
      .json([
        { error: "internal server error" },
        { message: error.message, success: false },
      ]);
  }
};
module.exports = {
  create,
  findOne,
  viewAll,
  remove,
  update
};

// const service = require("../../models/services.model");

// const create = async (req, res) => {
//   const { title, description } = req.body;
//   try {
//     if (!title || !description) {
//       return res.status(400).json({
//         message: "Please fill all the fields",
//       });
//     }
    
//     const newService = new service({ title, description });
//     await newService.save();
//     res.status(200).json({
//       success: true,
//       message: "Service created successfully",
//     });
//   } catch (error) {
//     return res
//       .status(500)
//       .json([
//         { error: "Internal server error" },
//         { message: `Error creating service: ${error.message}` },
//       ]);
//   }
// };
// const update = async (req, res, next) => {
//     try{
//         const {id} = req.params;
//         const {title, description} = req.body;
//         if(!title||!description){
//             return res.status(400).json({
//                 message: "Please fill all the fields"
//             })
//         }
//         const updatedService = await service.findByIdAndUpdate(id, {title, description}, {new: true});
//         if(!updatedService){
//             return res.status(404)
//             .json({
//                 message: "Service not found"
//             })
//         }
//         return res.status(200)
//         .json(updatedService);
//     }catch (error) {
//         return res
//           .status(500)
//           .json([
//             { error: "Internal server error" },
//             { message: `Error updating client: ${error.message}` },
//           ]);
//       }
// };
// //define update
// const findOne = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const service = await service.findById(id);
//     if (!service) {
//       return res.status(404).json({
//         message: "Service not found",
//       });
//     }
//     return res.status(200).json(service);
//   } catch (error) {
//     console.error("Error finding service", error);
//     return res
//       .status(500)
//       .json([
//         { error: "internal server error" },
//         { message: error.message, success: false },
//       ]);
//   }
// };
// const viewAll = async (req, res) => {
//   try {
//       const services = await service.find();
  
//       if (services.length > 0) {
//         return res.status(200).json(services);
//       } else {
//         return res.status(404).json({ error: "No services found!" });
//       }
//     } catch (error) {
//       return res
//         .status(500)
//         .json([
//           { error: "Internal server error" },
//           { message: `Error retrieving services: ${error.message}` },
//         ]);
//     }

// };





// const remove = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedservice = await service.findByIdAndDelete(id);
//     if (!deletedservice) {
//       return res.status(404).json({
//         message: "Service not found",
//       });
//     }
//     return res.status(200).json(deletedservice);
//   } catch (error) {
//     return res
//       .status(500)
//       .json([
//         { error: "internal server error" },
//         { message: error.message, success: false },
//       ]);
//   }
// };
// module.exports = {
//     create,
//     findOne,
//     viewAll,
//     remove,
//     update
// };