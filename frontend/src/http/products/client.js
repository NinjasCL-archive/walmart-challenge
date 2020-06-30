import axios from "axios";
import { setupCache } from "axios-cache-adapter";

const root = process.env.REACT_APP_API_URL;
const base = root + "products/";

const cache = setupCache({
  // default 5 minutes (300000 milliseconds) cache
  // minutes hours milliseconds
  maxAge: 5 * 60 * 1000,
});

const http = axios.create({
  adapter: cache.adapter,
});

const client = {
  endpoints: { root, base },
  http,
  cache,
};

export default client;
