"use strict";

class ProcessRequestParams {
  async handle({ request, params }, next) {
    let query = "";

    const defaultPage = 1;
    const defaultLimit = 20;
    let page = defaultPage;
    let limit = defaultLimit;

    // check numeric from
    // https://stackoverflow.com/a/58849715
    const isNumeric = (val) =>
      val && val.toString().trim() !== "" && Number.isFinite(Number(val));

    const qParams = request.get();

    query = String(
      request.body["q"] ||
        request.body["query"] ||
        qParams["q"] ||
        qParams["query"] ||
        ""
    ).trim();

    page =
      request.body["page"] ||
      params.page ||
      qParams["page"] ||
      qParams["p"] ||
      defaultPage;

    page = isNumeric(page) && page > 0 ? Number(page) : defaultPage;

    limit =
      request.body["limit"] || qParams["limit"] || qParams["l"] || defaultLimit;

    limit = isNumeric(limit) ? Number(limit) : defaultLimit;

    if (limit <= 0 || limit > 100) {
      limit = defaultLimit;
    }

    let isNumericQuery = false;
    if (isNumeric(query)) {
      isNumericQuery = true;
      query = Number(query);
    }

    request.query = query;
    request.numeric = isNumericQuery;
    request.page = page;
    request.limit = limit;

    await next();
  }
}

module.exports = ProcessRequestParams;
