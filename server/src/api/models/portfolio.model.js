var mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  logo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  cover: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  portfolioServices: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "PortfolioService",
  }],
});


const Portfolio = mongoose.model("Portfolio", portfolioSchema);

Portfolio.schema.index({ description: 'text' });  // Text index for searching

module.exports = Portfolio;
