// transforms get requests responses

const currencyFormat = ({
  locale = "es-CL",
  symbol = "$",
  includeSymbol = true,
  includeCurrency = true,
  currency = "CLP",
  value = 0,
}) =>
  `${includeSymbol ? symbol : ""} ${Math.round(value).toLocaleString(locale)} ${
    includeCurrency ? currency : ""
  }`;

const getTransformer = (json) => ({
  items: json.data.attributes.docs.map((item) => ({
    ...item,
    image: `//${item.image}`,
    formatted_price: currencyFormat({ value: item.price }),
    formatted_new_price: currencyFormat({ value: item.new_price }),
  })),
  meta: json.meta,
});

const transformers = {
  get: getTransformer,
};

export default transformers;
