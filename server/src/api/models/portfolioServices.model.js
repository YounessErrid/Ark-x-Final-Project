const mongoose = require("mongoose");
const portfolioserviceSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  shortDescription: {
    type: String,
    trim: true,
  },
  // list of images
  thumbnail: {
    type: String,
    trim: true,
  },
  images: [{
    type: String,
    trim: true,
  }],
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }],
});


const Portfolioservice = mongoose.model(
  "Portfolioservice",
  portfolioserviceSchema
);

Portfolioservice.schema.index({ name: 'text', description: 'text' });  // Text index for searching

module.exports = Portfolioservice;
/*const mongoose = require("mongoose");
const portfolioserviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    unique: true,
    trim: true,
  },
  // list of images
  image: [{
    type: String,
    unique: true,
    trim: true,
  }],
 
});
const portfolioservice = mongoose.model(
  "portfolioservice",
  portfolioserviceSchema
);
module.exports = portfolioservice;*/