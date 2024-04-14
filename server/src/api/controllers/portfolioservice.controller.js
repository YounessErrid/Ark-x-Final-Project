const portfolioservice = require("../models/portfolioServices.model");

const create = async (req, res) => {
  const { name, description, image, portfolioId, serviceId } = req.body;
  const path = req.files;
  console.log(path);
  try {
    if (!name || !description) {
      return res.status(400).json({
        message: "Please fill all the fields",
      });
    }
    const newPortfolioService = new portfolioservice({
      name,
      description,
      // portfolioId,
      path,
      // serviceId,
    });
    await newPortfolioService.save();
    return res.status(200).json({
      message: "Portfolio service created successfully",
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
    const { name, description, image, portfolioId, serviceId } = req.body;
    if (!name || !description || !image || !portfolioId || !serviceId) {
      return res.status(400).json({
        message: "Please fill all the fields",
      });
    }
    const updatedPortfolioService = await portfolioservice.findByIdAndUpdate(
      id,
      { name, description, image, portfolioId, serviceId }
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
    if (portfolioServices > 0) {
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
