const Portfolio = require("../../models/portfolio.model");

const create = async (req, res) => {
  const { description, logo, couverture} = req.body;
  try {
    if (!description || !logo || !couverture) {
      return res.status(400).json({
        error: "Portfolio creation failed: Missing required information!",
      });
    }
  
    const newPortfolio = new Portfolio({
      description,
      logo,
      couverture,
     
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
const findOne = async (req, res) => {
  const { id } = req.params;

  try {
    const portfolio = await Portfolio.findById(id);
    if (portfolio) {
      console.log("Portfolio found:", portfolio);
      return res.status(200).json(Portfolio);
    
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
const update = async (req, res) => {
  const { id } = req.params;
  const { description, logo, couverture } = req.body;
  // console.log("Request body:", req.body);
  // console.log("Description:", description);
  // console.log("Logo:", logo);
  // console.log("Couverture:", couverture);

  if (!description || !logo || !couverture) {
      return res.status(400).json({
          error: "Missing required information for update!",
      });
  }
  try {
 
      const updatedPortfolio = await Portfolio.findByIdAndUpdate(
          id,
          { description, logo, couverture },
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
module.exports = {
  create,
  findOne,
  viewAll,
  update,
  remove
};
