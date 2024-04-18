const Portfolio = require("../models/portfolio.model");


const create = async (req, res) => {
  const { description} = req.body;
   const logo = req.files["logo"][0].path;
   const cover = req.files["cover"][0].path;
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
    await newPortfolio.save();
    return res.status(201).json({
      success: true,
      message: "Successfully created portfolio",
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
    const portfolios = await Portfolio.find();
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
// 
const update = async (req, res) => {
  const { id } = req.params;
  const { newPortfolio} = req.body;
  const logo = req.files["logo"][0].path;
  const cover = req.files["cover"][0].path;
 

  if (!newPortfolio) {
      return res.status(400).json({
          error: "Missing required information for update!",
      });
  }
  try {
 
      const updatedPortfolio = await Portfolio.findByIdAndUpdate(
          id,
          { newPortfolio, cover, logo},
          { new: true }
      );

      if (!updatedPortfolio) {
          return res.status(404).json({ error: "Portfolio not found!" });
      }
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
                portfolio: deletedPortfolio
            });
            
        } catch (error) {
           
            console.error(`Error deleting portfolio with ID ${id}:`, error);
            return res.status(500).json({
                error: "Internal server error",
                message: `Error deleting portfolio: ${error.message}`
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
        success: false
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