"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", ({ response }) => response.redirect("/docs"));

Route.group(() => {
  Route.get("/", () => ({
    version: "1.0.0",
  }));

  const middleware = [
    "process-request-params",
    "palindrome",
    // max 1000 request per minute
    "throttle:1000,60",
  ];

  // app/Controllers/Http/API/ProductsController -> index()
  Route.get("/products", "ProductsController.index").middleware(middleware);
  Route.get("/products/:page?", "ProductsController.index").middleware(
    middleware
  );
})
  .namespace("API")
  .prefix("api")
  .formats(["json"]);
