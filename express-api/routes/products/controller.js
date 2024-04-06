import { Product } from "./model.js";

export const getProducts = async (req, res) => {
  const { name, company, featured, fields, sort, price, rating } = req.query;

  const queryParams = {};

  if (name) {
    queryParams.name = new RegExp(name, "i");
  }

  if (company) {
    queryParams.company = new RegExp(company, "i");
  }

  if (featured) {
    queryParams.featured = featured;
  }

  if (price) {
    queryParams.price = price;
  }

  if (rating) {
    queryParams.rating = rating;
  }

  const productsQuery = Product.find(queryParams);

  if (fields) {
    productsQuery.select(fields);
  }

  if (sort) {
    productsQuery.sort(sort);
  }

  const products = await productsQuery;

  res.status(200).json(products);
};
