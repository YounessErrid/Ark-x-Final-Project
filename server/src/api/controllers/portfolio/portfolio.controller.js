const portfolio = require('../models/portfolio.model');

const create = async (req, res) => {
    const {description, logo, couverture, services, } = req.body;
    try {
        if (!description ||!logo ||!couverture ||!services) {
            return res
               .status(400)
               .json({ error: "Portfolio creation failed: Missing required information!" });
        }
        const newPortfolio = new portfolio({description, logo, couverture, services});
        await newPortfolio.save();
        return res
        .status(201)
        .json({
            success: true,
            message: "Successfully created portfolio",
        });
    }
    catch(error){
        return res
       .status(500)
       .json({
            error: "Internal server error",
            message: error.message
        });
    }
}
const findOne = async (req, res) => {
    const {id} = req.params;
    try{
        const portfolio = await portfolio.findById(id);
        if(!portfolio){
            return res.status(404).json({ error: "Portfolio not found!" });
        }
        return res.status(200).json(portfolio);
    }
    catch(error){
        return res
       .status(500)
       .json({
            error: "Internal server error",
            message: error.message
        });
    }
};

const viewAll = (req, res) => {
    try{
        const portfolios = portfolio.find();
        if(portfolios> 0){
            return res
            .status(200)
            .json({ portfolio});
        }else{
            return res.status(404).json({
                message: "portfolio not found"
            })
        }}
        catch(error){
            return res
              .status(500)
              .json([
                {error: 'internal server error'},
                {message: error.message, success: false}
              ]);
        }
        };
        const update = async (req, res) => {
            try{
                const {id} = req.params;
                const {description, logo, couverture, services, } = req.body;
                if (!description ||!logo ||!couverture ||!services) {
                    return res
                       .status(400)
                       .json({ error: "Portfolio update failed: Missing required information!" });
                }
                const updatedPortfolio = await portfolio.findByIdAndUpdate(id, {description, logo, couverture, services}, {new: true});
                if(!updatedPortfolio){
                    return res.status(404)
                    .json({ error: "Portfolio not found!" });
                }
                return res.status(200).json(updatedPortfolio);
            }catch(error){
                return res
               .status(500)
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
        };

