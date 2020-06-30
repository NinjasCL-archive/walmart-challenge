"use strict";

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Swagger Information
  | Please use Swagger 2 Specification Docs
  | https://swagger.io/docs/specification/2-0/basic-structure/
  |--------------------------------------------------------------------------
  */

  enable: true,
  specUrl: "/swagger.json",

  options: {
    swaggerDefinition: {
      info: {
        title: "Walmart",
        version: "1.0.0",
        description: "This is an API made for Walmart Challenge.",
        contact: {
          email: "camilo@ninjas.cl",
        },
      },

      basePath: "/api",
    },

    // Path to the API docs
    // Sample usage
    // apis: [
    //    'docs/**/*.yml',    // load recursive all .yml file in docs directory
    //    'docs/**/*.js',     // load recursive all .js file in docs directory
    // ]
    apis: ["app/**/*.js", "start/routes.js", "docs/**/*.yml"],
  },
};
