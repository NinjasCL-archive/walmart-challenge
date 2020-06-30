"use strict";
const { test } = use("Test/Suite")("Test ProductsModel");
const ProductsModel = use("App/Models/ProductsModel");

test("that getBy method exists", async ({ assert }) => {
  const model = ProductsModel;
  assert.exists(model.getBy, "getBy method does not exists");
});
