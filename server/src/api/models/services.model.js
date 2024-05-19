const mongoose = require("mongoose");
const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
});

const Service = mongoose.model("Service", serviceSchema);

Service.schema.index({ title: "text", description: "text" }); // Text index for searching

module.exports = Service;
