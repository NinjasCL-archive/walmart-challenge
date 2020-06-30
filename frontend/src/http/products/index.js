import client from "./client";
import transformers from "./transformers";
import params from "../common";

const API = {
  // properties
  client,
  transformers,
  name: "products",
  default: {},
  // methods
  get: ({ query = "", page = 1 }) => {},
};

// default state for get requests
API.default.get = {
  items: [],
  meta: {
    page: 1,
  },
};

API.get = async ({ query = "", page = 1 }) => {
  const endpoint = client.endpoints.base + `?query=${query}&page=${page}`;

  return client
    .http({
      method: "get",
      url: endpoint,
      headers: params.headers,
    })
    .then((json) => json.data)
    .then((json) => transformers.get(json))
    .catch((error) => {
      return API.default.get;
    });
};

export default API;
