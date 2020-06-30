"use strict";
const { test } = use("Test/Suite")("Test ProductsController");
const ProductsController = use("App/Controllers/Http/API/ProductsController");

test("that index method exists", async ({ assert }) => {
  const controller = new ProductsController();
  assert.exists(controller.index, "index method does not exists");
});
