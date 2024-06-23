const portfolioservice = require("../models/portfolioServices.model");

const create = async (req, res) => {
  const { name, description, service } = req.body;
  
  const path = req.files.images;
  let images = [];
  path.forEach((element) => {
    images.push(element.path);
  });
  let thumbnail = req.files.thumbnail[0].path

  try {
    if (!name || !description || !service ) {
      return res.status(400).json({
        error:
          "^portfolioService creation failed: Missing required information!",
      });
    }
    const newPortfolioService = new portfolioservice({
      name,
      description,
      images,
      thumbnail,
      service,
    });

    const data = await newPortfolioService.save();

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
    console.log(req.files);
    const files = req.files;
    let images = [];
    if (files) {
      files.forEach((element) => {
        images.push(element.path);
      });
    }

    console.log(files);
    console.log(images);
    if (!id || !newPortfolioService) {
      return res.status(400).json({
        error: "PortfolioService update failed: Missing required information!",
      });
    }
    const updatedPortfolioService = await portfolioservice.findByIdAndUpdate(
      id,
      { ...newPortfolioService, images },
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
      message: "Portfolio service deleted successfully",
    });
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
    return res.status(200).json(portfolioService);
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
};
