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
  tokenSource: null,
};

API.get = async ({ query = "", page = 1 }) => {
  const endpoint = client.endpoints.base + `?query=${query}&page=${page}`;

  try {
    // Cancel previous request if a new one is made
    // before it's completion
    // see https://medium.com/@decker/typeerror-config-canceltoken-throwifrequested-is-not-a-function-6b7b20b54fa2
    // and https://medium.com/@mikjailsalazar/just-another-searchbar-react-axios-lodash-340efec6933d
    // for more info
    const tokenSource = API.default.get.tokenSource;
    if (tokenSource && tokenSource.cancel) {
      tokenSource.cancel("Operation canceled due to new request");
    }

    API.default.get.tokenSource = client.axios.CancelToken.source();

    return client
      .http({
        method: "get",
        url: endpoint,
        headers: params.headers,
        cancelToken: API.default.get.tokenSource.token,
      })
      .then((json) => json.data)
      .then((json) => transformers.get(json))
      .catch((error) => {
        return API.default.get;
      });
  } catch (err) {
    if (client.axios.isCancel(err)) {
      return { cancelPrevQuery: true };
    }
    return [err];
  }
};

export default API;
