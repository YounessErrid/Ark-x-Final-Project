const Agency = require("../models/agency.model");
const Portfolio = require("../models/portfolio.model");
const portfolioservice = require("../models/portfolioServices.model");
const User = require("../models/user.model");

const create = async (req, res) => {

  const { name, description, service, shortDescription } = req.body;
  let images = [];
  if (req.files && req.files.images) {
    req.files.images.forEach((element) => {
      images.push(element.path);
    });
  }

  let thumbnail = "";
  if (req.files && req.files.thumbnail && req.files.thumbnail[0]) {
    thumbnail = req.files.thumbnail[0].path;
  }
  try {
    if (!name || !description || !service || !shortDescription) {
      return res.status(400).json({
        error:
          "^portfolioService creation failed: Missing required information!",
      });
    }
    const newPortfolioService = new portfolioservice({
      name,
      description,
      shortDescription,
      images,
      thumbnail,
      service,
    });

    const data = await newPortfolioService.save();

    // updte the array of portfolio services
    const agency = await Agency.findOne({ userId: req.user._id });
    const portfolio = await Portfolio.findById(agency.portfolioId);
    portfolio.portfolioServices.push(data._id);
    await portfolio.save();

    return res.status(200).json({
      message: "Portfolio service created successfully",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { ...newPortfolioService } = req.body;
    // console.log(req.files);
    const files = req.files;

    let images = [];
    if (req.files && req.files.images) {
      req.files.images.forEach((element) => {
        images.push(element.path);
      });
    }
  
    let thumbnail = newPortfolioService.thumbnail;
    if (req.files && req.files.thumbnail && req.files.thumbnail[0]) {
      thumbnail = req.files.thumbnail[0].path;
    }

    // console.log(files);
    // console.log(images);

    if (!id || !newPortfolioService) {
      return res.status(400).json({
        error: "PortfolioService update failed: Missing required information!",
      });
    }
    const updatedPortfolioService = await portfolioservice.findByIdAndUpdate(
      id,
      { ...newPortfolioService, images, thumbnail },
      { new: true }
    );
    
    if (!updatedPortfolioService) {
      return res.status(404).json({
        message: "Portfolio service not found",
      });
    }
    return res.status(200).json(updatedPortfolioService);
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPortfolioService = await portfolioservice.findByIdAndDelete(
      id
    );
    if (!deletedPortfolioService) {
      return res.status(404).json({
        message: "Portfolio service not found",
      });
    }
    return res.status(200).json({
      data: deletedPortfolioService,
      message: "Portfolio service deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};

const findPortfolioByAgencyId = async (req, res) => {
  const { id } = req.params;
  try {
    const agencyPortfolio = await Agency.findById(id).populate({
      path: 'portfolioId',
      populate : {
        path: "portfolioServices",
        populate : {
          path : 'service'
        }
      }
    });

    // console.log("agencyPortfolio agency", agencyPortfolio);
    if (!agencyPortfolio) {
      return res.status(404).json({
        message: "Portfolio service not found",
      });
    }
    // console.log("agencyPortfolio: ",agencyPortfolio);
    return res.status(200).json(agencyPortfolio);
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const portfolioService = await portfolioservice.findById(id);
    if (!portfolioService) {
      return res.status(404).json({
        message: "Portfolio service not found",
      });
    }

    console.log("id", id);
    console.log("portfolioservice", portfolioService);

    const portfolio = await Portfolio.findOne({portfolioServices : id})

    if (!portfolio) {
      return res.status(404).json({
        message: "Portfolio not found",
      });
    }

    const agency = await Agency.findOne({portfolioId : portfolio._id})
    if (!agency) {
      return res.status(404).json({
        message: "agency not found",
      });
    }

    return res.status(200).json({
      ...portfolioService._doc,
        agencyName: agency?.agencyName,
        addresse : agency?.addresse,
        logo: portfolio?.logo
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};

const viewAll = async (req, res) => {
  try {
    const portfolioServices = await portfolioservice.find();
    if (portfolioServices.length > 0) {
      return res.status(200).json(portfolioServices);
    } else {
      return res.status(404).json({
        message: "No portfolio services found!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};

module.exports = {
  create,
  update,
  remove,
  findOne,
  viewAll,
  findPortfolioByAgencyId,
};
