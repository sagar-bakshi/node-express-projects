const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const search = "ab";

  const products = await Product.find({}).select('name price');

  res.status(200).json({ products, nbhits: products.length });
};

//getting all product
const getAllProducts = async (req, res) => {

  const { featured, company, name, sort, fields } = req.query;

  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company){
    queryObject.company = company;
  }
  if (name){
    queryObject.name = { $regex: name, $options: "i"}
  }

  let result =  Product.find(queryObject);

  //sorting=============================>

  if (sort) {
    const sortList = sort.split(",").join(" ");
    console.log(sortList);
    result = result.sort(sortList); 
  }else{
    result = result.sort("-createdAt");
  }

  //fields=============================>

  if (fields){
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  
  const products = await result;
  res.status(200).json({ nbhits: products.length, products  });

};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
