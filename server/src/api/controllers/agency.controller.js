const bcrypt = require("bcrypt");
const Agency = require("../models/agency.model");
const User = require("../models/user.model");
const portfolioservice = require("../models/portfolioServices.model");
const Service = require("../models/services.model");
const Portfolio = require("../models/portfolio.model");

const register = async (req, res) => {
  const { email, password, fullname, addresse, agencyName, phone } = req.body;

  try {
    const path = req.file ? req.file.path : null;
    if (!email || !password || !fullname || !addresse || !agencyName || !phone) {
      return res.status(400).json({
        error: "Agency creation failed: Missing required information!",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(403).json({ error: "Email already exists" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = new User({
      email: email,
      password: hashedPassword,
      fullname: fullname,
      profile_image: path,
      phone: phone,
      role: "agency",
    });

    const userData = await user.save();

    const agency = new Agency({ userId: userData.id, addresse, agencyName });
    const agencyData = await agency.save();
    // console.log({...user,...agency });
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { ...userData, ...agencyData },
    });
  } catch (error) {
    return res
      .status(500)
      .json([
        { error: "Internal server error" },
        { message: `Error creating User: ${error.message}` },
      ]);
  }
};

const checkAgencyEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const agency = await User.findOne({ email });
    if (agency) {
      return res.status(403).json({ message: "Email already exists" });
    }
    return res.status(200).json({
      success: true,
      message: "Email is available",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      message: `Error checking email: ${error.message}`,
    });
  }
};

const login = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Successfully logged in",
    user: {
      role: req.user.role,
      fullname: req.user.fullname,
      email: req.user.email,
    },
  });
};

const destroy = async (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      success: true,
      message: "Successfully logged out",
    });
  });
};

const viewAll = async (req, res) => {
  try {
    // console.log("heleeoelele")
    const agencies = await Agency.find().populate(
      "userId",
      " fullname email profile_image"
    ).populate("portfolioId");

    if (agencies.length === 0) {
      return res.status(404).json({ error: "No agencies found" });
    }
    // Construct the response object with the desired fields
    console.log("agencies", agencies);
    const responseData = agencies.map((agency) => {
      return {
        _id: agency._id,
        fullname: agency.userId === null ? null : agency.userId.fullname,
        email: agency.userId === null ? null : agency.userId.email,
        profile_image:
          agency.userId === null ? null : agency.userId.profile_image,
        agencyName: agency.agencyName,
        address: agency.addresse,
        logo: agency?.portfolioId?.logo
      };
    });
    return res.status(200).json(responseData);
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      message: `Error retrieving agencies: ${error.message}`,
    });
  }
};
// const findOne = async (req, res) => {
//   try {
//     const agency = await Agency.findById(req.params.id).populate(
//       "userId"
//     ).populate('portfolioId')

//     if (!agency) {
//       return res.status(404).json({ error: "No agencies found" });
//     }
//     console.log('--------agency---------');
//     console.log(agency);
//     console.log('--------agency---------');
//     // Construct the response object with the desired fields
//     const responseData = {
//       _id: agency._id,
//       fullname: agency.userId === null ? null : agency.userId.fullname,
//       email: agency.userId === null ? null : agency.userId.email,
//       profile_image:
//         agency.userId === null ? null : agency.userId.profile_image,
//       // phone:
//       //   agency.userId === null ? null : agency.userId.phone,
//       agencyName: agency.agencyName,
//       address: agency.addresse, // Corrected typo
//       description: agency.portfolioId == null ? null : agency.portfolioId.description
//     };
//     return res.status(200).json(responseData);
//   } catch (error) {
//     return res.status(500).json({
//       error: "Internal server error",
//       message: `Error retrieving agencies: ${error.message}`,
//     });
//   }
// };

const update = async (req, res) => {
  const updated = req.body;
  const id = req.params.id;
  // console.log("reqqqq",req);
  try {
    const updatedAgency = await Agency.findByIdAndUpdate(id, updated, {
      new: true,
      runValidators: true,
    });
    if(!updatedAgency){
      return  res.status(404).json({ error: "No agencies found" })
    }
    return res.status(200).json(updatedAgency);

  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      message: `Error retrieving agencies: ${error.message}`,
    });
  }
};

const findOne = async (req, res) => {
  try {

    const agency = await Agency.findById(req.params.id)
      .populate("userId")
      .populate("portfolioId");

    if (!agency) {
      return res.status(404).json({ error: "No agencies found" });
    }
    // console.log('--------agency---------');
    // console.log(agency);
    // console.log('--------agency---------');
    const responseData = {
      _id: agency._id,
      fullname: agency.userId === null ? null : agency.userId.fullname,
      email: agency.userId === null ? null : agency.userId.email,
      profile_image:
        agency.userId === null ? null : agency.userId.profile_image,
      phone: agency.userId === null ? null : agency.userId.phone,
      agencyName: agency.agencyName,
      address: agency.addresse, // Corrected typo
      description:
        agency.portfolioId == null ? null : agency.portfolioId.description,
      cover: agency.portfolioId == null ? null : agency.portfolioId.cover,
      logo: agency.portfolioId == null ? null : agency.portfolioId.logo,
      portfolioId: agency.portfolioId == null ? null : agency.portfolioId._id,
    };
    return res.status(200).json(responseData);
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      message: `Error retrieving agencies: ${error.message}`,
    });
  }
};

/**
 * db.agencies.aggregate([ {
    $lookup: {
      from: 'portfolios',
      localField: 'portfolioId',
      foreignField: '_id',
      as: 'portfolio'
    }
  },
{
        $lookup: {
          from: 'portfolioservices',
          localField: 'portfolio.portfolioServices',
          foreignField: '_id',
          as: 'portfolioServices',
        },
      },
{
        $lookup: {
          from: 'services',
          localField: 'portfolioServices.service',
          foreignField: '_id',
          as: 'service',
        },
      },
      {$match: { $or : [{"portfolio.description" : "International"}]}}
  ])
 * Global search function to retrieve agencies with pagination, sorting, and filtering based on search criteria.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {object} - JSON response with paginated agencies, total count, current page, and total pages.
 */
// const globalSearch = async (req, res) => {
//   // Extract pagination and search parameters from query string
//   const pageSize = parseInt(req.query.pageSize) || 10;
//   const page = parseInt(req.query.page) || 1;
//   const search = req.query.search;

//   try {
//     let query = {};

//     // If search text is provided, create a regex pattern to match any text
//     if (search) {
//       const searchRegex = new RegExp(search, 'i');
//       query.$or = [
//         { agencyName: searchRegex },
//         { addresse: searchRegex },
//         { 'portfolioId.description': searchRegex },
//         { 'portfolioId.portfolioServices.name': searchRegex },
//         { 'portfolioId.portfolioServices.description': searchRegex },
//         { 'portfolioId.portfolioServices.service.title': searchRegex },
//         { 'portfolioId.portfolioServices.service.description': searchRegex },
//       ];
//     }
//     // if (search) {
//     //   const searchRegex = new RegExp(search, 'i');
//     //   query = {
//     //     $or: [
//     //       { agencyName: searchRegex },
//     //       { address: searchRegex },
//     //       {
//     //         portfolioId: {
//     //           $elemMatch: {
//     //             $or: [
//     //               { 'description': searchRegex },
//     //               { 'portfolioServices.name': searchRegex },
//     //               { 'portfolioServices.description': searchRegex },
//     //               { 'portfolioServices.service.title': searchRegex },
//     //               { 'portfolioServices.service.description': searchRegex },
//     //             ],
//     //           },
//     //         },
//     //       },
//     //     ],
//     //   };
//     // }

//     // Total count of matching documents
//     const totalCount = await Agency.countDocuments(query);

//     // Fetch agencies with pagination, sorting, and filtering
//     const agencies = await Agency.find(query, { userId: 0, __v: 0 })
//     .populate({
//       path: "portfolioId",
//       model: "Portfolio",
//       select: { _id: 0, __v: 0 },
//       populate: {
//         path: "portfolioServices",
//         model: "portfolioservice",
//         select: { name: 1, description: 1, _id: 0 },
//         populate: {
//           path: "service",
//           model: "Service",
//           select: { title: 1, description: 1, _id: 0 },
//         },
//       },
//     }) // You can change the sorting criteria if needed

//     if (agencies.length > 0) {
//       return res.status(200).json({
//         agencies,
//         totalCount,
//         currentPage: page,
//         totalPages: Math.ceil(totalCount / pageSize),
//       });
//     } else {
//       return res.status(404).json({
//         message: 'Agencies not found',
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       error: 'Internal server error',
//       message: `Error retrieving agencies: ${error.message}`,
//     });
//   }
// };

const globalSearch = async (req, res) => {
  const { search, ...pagination } = req.query;
  const searchRegex = new RegExp(search, "i");
  const aggregation = [
    {
      $lookup: {
        from: "portfolios",
        localField: "portfolioId",
        foreignField: "_id",
        as: "portfolio",
      },
    },
    {
      $lookup: {
        from: "portfolioservices",
        localField: "portfolio.portfolioServices",
        foreignField: "_id",
        as: "portfolioServices",
      },
    },
    {
      $lookup: {
        from: "services",
        localField: "portfolioServices.service",
        foreignField: "_id",
        as: "service",
      },
    },
    {
      $match: {
        $or: [
          { agencyName: searchRegex },
          { address: searchRegex },
          { "portfolio.description": searchRegex },
          { "portfolioServices.name": searchRegex },
          { "portfolioServices.description": searchRegex },
          { "service.title": searchRegex },
          { "service.description": searchRegex },
        ],
      },
    },
  ];

  try {
    // const [agencies, totalCount] = await Promise.all([
    //   Agency.aggregate(aggregation),
    //   Agency.countDocuments(aggregation), // Text search for top-level fields
    // ]);
    const agencies = await Agency.aggregate(aggregation);
    const totalCount = agencies.length;

    const currentPage = parseInt(pagination.page) || 1;
    const pageSize = parseInt(pagination.pageSize) || 10;
    const totalPages = Math.ceil(totalCount / pageSize);

    if (agencies.length > 0) {
      return res
        .status(200)
        .json({ agencies, totalCount, currentPage, totalPages });
    } else {
      return res.status(404).json({ message: "Agencies not found" });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      message: `Error retrieving agencies: ${error.message}`,
    });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        error: "Agency deletion failed: Missing required information!",
      });
    }

    const deletedAgency = await Agency.findOneAndDelete({ _id: id });

    if (!deletedAgency) {
      return res.status(404).json({ error: "Agency not found!" });
    }

    return res.status(200).json({
      success: true,
      message: "Agency deleted successfully",
      data: deletedAgency,
    });
  } catch (error) {
    return res
      .status(500)
      .json([
        { error: "Internal server error" },
        { message: `Error deleting agency: ${error.message}` },
      ]);
  }
};

module.exports = {
  register,
  login,
  destroy,
  viewAll,
  globalSearch,
  findOne,
  remove,
  update,
  checkAgencyEmail,
};
