const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "caressa", "liddy", "marcos"],
      message: "value is not a valid company",
    },
    //enum: ["ikea", "caressa", "liddy", "macros"],
  },
});

module.exports = mongoose.model("Product", productSchema);
