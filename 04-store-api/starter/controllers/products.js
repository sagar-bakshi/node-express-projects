const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const search = "ab";

  const products = await Product.find({
    name: { $regex: search, $options: "i"}
  });

  res.status(200).json({ products, nbhits: products.length });
};

//getting all product
const getAllProducts = async (req, res) => {
  const { featured, company, name, sort } = req.query;
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

  if (sort){
    const sortList = sort.split(',').join(' ');
    console.log(sortList);
    const products = await result.sort(sortList);
    res.status(200).json({ nbhits: products.length, products  });
  }else {
      const products = await result;
      res.status(200).json({ nbhits: products.length, products  });
  }

};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
