var mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
  },
  logo: {
    type: String,
    trim: true,
  },
  cover: {
    type: String,
    trim: true,
  },
  portfolioServices: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Portfolioservice",
  }],
});


const Portfolio = mongoose.model("Portfolio", portfolioSchema);

Portfolio.schema.index({ description: 'text' });  // Text index for searching

module.exports = Portfolio;
