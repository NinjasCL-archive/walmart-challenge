"use strict";

const mongoosePaginate = require("mongoose-paginate-v2");
const JSONAPISerializer = require("jsonapi-serializer").Serializer;

const BaseModel = use("MongooseModel");
const { ObjectId } = use("mongoose").Schema.Types;

const PalindromeDecorator = require("./Decorators/PalindromeDecorator");

class ProductsModel extends BaseModel {
  static boot({ schema }) {
    super.boot({ schema });

    this._schema.plugin(mongoosePaginate);
  }

  static get schema() {
    return {
      uid: { type: ObjectId },
      id: { type: Number, default: -1 },
      brand: { type: String, default: "" },
      description: { type: String, default: "" },
      image: { type: String, default: "" },
      price: { type: Number, default: 0 },
    };
  }

  static serialize(data) {
    return new JSONAPISerializer("products", {
      docs: {
        attributes: [
          "id",
          "brand",
          "description",
          "image",
          "price",
          ...(PalindromeDecorator.enabled
            ? PalindromeDecorator.attributes
            : []),
        ],
        keyForAttribute: "underscore_case",
        nullIfMissing: true,
      },

      attributes: ["docs"],
      topLevelLinks: {
        self: "/api/products",
      },
      meta: {
        total: data.totalDocs,
        limit: data.limit,
        total_pages: data.totalPages,
        page: data.page,
        paging_counter: data.pagingCounter,
        has_prev_page: data.hasPrevPage,
        has_next_page: data.hasNextPage,
        prev_page: data.prevPage,
        next_page: data.nextPage,
      },
      keyForAttribute: "underscore_case",
    }).serialize(data);
  }

  static appendSerializeFunction(result) {
    return {
      ...result,
      serialize: () => this.serialize(result),
    };
  }

  static async getBy({
    query = "",
    numeric = false,
    page = 1,
    limit = 20,
    palindrome = false,
    sort = { price: 1 /* ASC */ },
  }) {
    const decorate = ({ result, palindrome }) =>
      this.appendSerializeFunction(
        PalindromeDecorator.enabled
          ? PalindromeDecorator.logic(result, palindrome)
          : result
      );

    if (numeric) {
      // You could send api/products?query=1&page=2
      // and it would return empty results due to the pagination
      // maybe it should return the first result regardless of pagination
      // but I believe the api should be consistent with the string query behavior

      return this.paginate(
        { id: query },
        { page, limit, sort }
      ).then((result) => decorate({ result, palindrome }));
    }

    if (query.length > 0) {
      return this.paginate(
        {
          $or: [
            { brand: new RegExp(query, "gi") },
            { description: new RegExp(query, "gi") },
          ],
        },
        {
          page,
          limit,
          sort,
        }
      ).then((result) => decorate({ result, palindrome }));
    }

    // Default behavior when no query is sent.
    // return a paginated result sorted by price

    return this.paginate({}, { page, limit, sort }).then((result) =>
      decorate({ result, palindrome })
    );
  }
}
// query on db.products collection
module.exports = ProductsModel.buildModel("Product");
