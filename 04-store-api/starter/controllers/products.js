const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  res.status(200).json({ msg: "products route" });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({ products: products });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
