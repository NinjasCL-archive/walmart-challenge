"use strict";

const ProductsModel = use("App/Models/ProductsModel");

class ProductsController {
  async index({ request, response }) {
    const { palindrome, query, numeric, page, limit } = request;

    const products = await ProductsModel.getBy({
      query,
      numeric,
      page,
      limit,
      palindrome,
    });

    response.send(products.serialize());
  }
}

module.exports = ProductsController;
