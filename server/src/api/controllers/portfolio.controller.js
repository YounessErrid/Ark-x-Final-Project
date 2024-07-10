const Portfolio = require("../models/portfolio.model");

const create = async (req, res) => {
  const { description } = req.body;
  const logo = req.files ? req.files["logo"][0]?.path : null;
  const cover = req.files ? req.files["cover"][0]?.path : null;

  try {
    if (!description || !logo || !cover) {
      return res.status(400).json({
        error: "Portfolio creation failed: Missing required information!",
      });
    }

    const newPortfolio = new Portfolio({
      description,
      logo,
      cover,
    });
    const data = await newPortfolio.save();
    return res.status(201).json({
      success: true,
      message: "Successfully created portfolio",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};

const viewAll = async (req, res) => {
  const pageSize = 10;
  const { page, Service } = req.query;
  try {
    const portfolios = await Portfolio
      .find
      // {
      //   "$or": [
      //     {portfolioServices: {"$regex": Service}}
      //   ]
      // }
      ()
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    if (portfolios.length > 0) {
      return res.status(200).json(portfolios);
    } else {
      return res.status(404).json({
        message: "portfolio not found",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json([
        { error: "internal server error" },
        { message: `Error retrieving services: ${error.message}` },
      ]);
  }
};

const update = async (req, res) => {
  const { id } = req.params;

  const newPortfolio = {};
  if (req.body.infos) {
    newPortfolio.description = req.body.infos;
  }

  if (req.files && req.files["logo"]) {
    const logo = req.files["logo"][0].path;
    newPortfolio.logo = logo;
  }

  if (req.files && req.files["cover"]) {
    const cover = req.files["cover"][0].path;
    newPortfolio.cover = cover;
  }

  if (Object.keys(newPortfolio).length === 0) {
    return res.status(400).json({
      error: "Missing required information for update!",
    });
  }

  try {
    const portfolio = await Portfolio.findById(id);
    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio not found!" });
    }

    // Update only the provided fields
    portfolio.set(newPortfolio);

    const updatedPortfolio = await portfolio.save();

    return res.status(200).json(updatedPortfolio);
  } catch (error) {
    console.error(`Error updating portfolio with ID ${id}:`, error);
    return res.status(500).json({
      error: "Internal server error",
      message: `Error updating portfolio: ${error.message}`,
    });
  }
};


const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPortfolio = await Portfolio.findByIdAndDelete(id);
    if (!deletedPortfolio) {
      return res.status(404).json({ error: "Portfolio not found!" });
    }
    return res.status(200).json({
      message: "Portfolio deleted successfully!",
      portfolio: deletedPortfolio,
    });
  } catch (error) {
    console.error(`Error deleting portfolio with ID ${id}:`, error);
    return res.status(500).json({
      error: "Internal server error",
      message: `Error deleting portfolio: ${error.message}`,
    });
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const portfolio = await Portfolio.findById(id);
    if (portfolio) {
      return res.status(200).json(portfolio);
    } else {
      console.log("Portfolio not found with id:", id);
      return res.status(404).json({ error: "portfolio not found!" });
    }
  } catch (error) {
    console.error("Error finding portfolio:", error);
    // Return a JSON response with a status code of 500
    return res.status(500).json({
      error: "Internal server error",
      message: error.message, // Include the error message for debugging
      success: false,
    });
  }
};

module.exports = {
  create,
  findOne,
  viewAll,
  update,
  remove,
};
