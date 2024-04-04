import { Product } from "./model.js";

export const getProducts = async (req, res) => {
  const { name, company, featured } = req.query;

  const queryParams = {};

  if (name) {
    queryParams.name = new RegExp(name, "i");
  }

  if (company) {
    queryParams.company = new RegExp(company, "i");
  }

  if (featured) {
    console.log("featured", featured);
    queryParams.featured = featured;
  }

  const products = await Product.find(queryParams);

  res.status(200).json(products);
};
