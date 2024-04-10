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

  const page = req.query.page ?? 1;
  const limit = req.query.limit ?? 10;

  const productsQuery = Product.find(queryParams)
    .limit(limit)
    .skip((page - 1) * limit);

  if (fields) {
    productsQuery.select(fields);
  }

  if (sort) {
    productsQuery.sort(sort);
  }

  const [products, totalFiltered, total] = await Promise.all([
    productsQuery,
    Product.countDocuments(queryParams),
    Product.estimatedDocumentCount(),
  ]);

  res.status(200).json({ results: products, total, totalFiltered, totalPages: Math.ceil(total / limit), pages: Math.ceil(totalFiltered / limit)});
};
