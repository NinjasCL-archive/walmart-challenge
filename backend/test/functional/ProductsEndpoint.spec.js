"use strict";

const { test, trait } = use("Test/Suite")("Test api/products endpoint");

trait("Test/ApiClient");

const endpoint = `/api/products`;

// See node_modules/@adonisjs/vow/src/Response/index.js
// https://www.chaijs.com/api/assert/
// and https://adonisjs.com/docs/4.1/testing#_functional_tests
// for more info about the testing tools

test("that returns correct status and headers", async ({ assert, client }) => {
  const response = await client.get(endpoint).end();

  response.assertStatus(200);
  response.assertHeader("Content-Type", "application/json; charset=utf-8");

  assert.exists(response.headers["x-ratelimit-limit"]);
  assert.exists(response.headers["x-ratelimit-remaining"]);
});

test("that responds with correct error format", async ({ assert, client }) => {
  const response = await client.post(endpoint).end();

  response.assertStatus(404);
  response.assertHeader("Content-Type", "application/json; charset=utf-8");

  response.assertError({
    errors: [
      {
        status: 404,
        title: "HttpException",
        code: "E_ROUTE_NOT_FOUND",
        detail: "E_ROUTE_NOT_FOUND: Route not found POST /api/products",
      },
    ],
  });
});

test("that responds with throttle error", async ({ assert, client }) => {
  let response = null;
  // should trigger throttle error
  for (let i = 0; i <= 1000; i++) {
    response = await client.get(endpoint).end();
  }

  response.assertStatus(429);
  response.assertHeader("Content-Type", "application/json; charset=utf-8");

  response.assertError({
    errors: [
      { status: 429, title: "TooManyRequests", detail: "Too Many Attempts." },
    ],
  });
});

test("that returns correct data format", async ({ assert, client }) => {
  const response = await client.get(endpoint + `/?query`).end();

  response.assertStatus(200);
  response.assertHeader("Content-Type", "application/json; charset=utf-8");

  const { body } = response;
  assert.exists(body.links, "links do not exists");
  assert.exists(body.links.self, "links.self do not exists");
  assert.equal(
    body.links.self,
    endpoint,
    "links.self is not equal to the endpoint"
  );

  assert.exists(body.meta, "meta do not exists");
  assert.exists(body.meta.total, "meta.total do not exists");
  assert.exists(body.meta.limit, "meta.limit do not exists");

  assert.exists(body.meta.total_pages, "meta.total_pages do not exists");
  assert.exists(body.meta.page, "meta.page do not exists");
  assert.exists(body.meta.paging_counter, "meta.paging_counter do not exists");

  assert.exists(body.meta.has_prev_page, "meta.has_prev_page do not exists");
  assert.isDefined(body.meta.prev_page, "meta.prev_page do not exists");
  assert.isDefined(body.meta.next_page, "meta.next_page do not exists");

  assert.exists(body.data, "data do not exists");
  assert.exists(body.data.type, "data.type do not exists");
  assert.equal(body.data.type, "products", "data.type is not products");

  assert.exists(body.data.attributes, "data.attributes do not exists");
  assert.exists(
    body.data.attributes.docs,
    "data.attributes.docs do not exists"
  );
  assert.isArray(
    body.data.attributes.docs,
    "data.attributes.docs is not an array"
  );

  const product = body.data.attributes.docs[0];

  assert.isObject(product, "product is not an object");
  assert.exists(product.id, "product.id does not exists");
  assert.exists(product.brand, "product.brand does not exists");
  assert.exists(product.description, "product.description does not exists");
  assert.exists(product.image, "product.image does not exists");
  assert.exists(product.price, "product.price does not exists");

  // Internal mongo ids should not be available to clients
  assert.isUndefined(product._id, "product._id must not exists");
});

test("that query param works", async ({ assert, client }) => {
  // should return product with id 1
  const makeQuery = async (param) => {
    const productId = 1;
    const response = await client
      .get(endpoint + `/?${param}=${productId}`)
      .end();

    response.assertStatus(200);
    response.assertHeader("Content-Type", "application/json; charset=utf-8");

    const { body } = response;
    const product = body.data.attributes.docs[0];

    assert.equal(
      product.id,
      productId,
      "product.id is not the same as the requested id"
    );
  };

  await makeQuery("query");
  await makeQuery("q");
});

test("that page param works", async ({ assert, client }) => {
  // should return page number
  const makeQuery = async (param, value, query = 1) => {
    const response = await client
      .get(endpoint + `/?query=${query}&${param}=${value}`)
      .end();

    response.assertStatus(200);
    response.assertHeader("Content-Type", "application/json; charset=utf-8");

    const { body } = response;

    const { meta } = body;

    assert.equal(meta.page, value, "page is not equal to requested page");
  };

  await makeQuery("page", 1);
  await makeQuery("p", 3, "sadfdas");
});

test("that limit param works", async ({ assert, client }) => {
  // should return limit number
  const makeQuery = async (param, value, query = 1) => {
    const response = await client
      .get(endpoint + `/?query=${query}&${param}=${value}`)
      .end();

    response.assertStatus(200);
    response.assertHeader("Content-Type", "application/json; charset=utf-8");

    const { body } = response;

    const { meta } = body;

    assert.equal(meta.limit, value, "limit is not equal to requested limit");
  };

  await makeQuery("limit", 1);
  await makeQuery("l", 3, "sadfdas");
});
