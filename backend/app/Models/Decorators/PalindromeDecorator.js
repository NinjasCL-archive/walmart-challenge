const PalindromeDecorator = (result, palindrome) => ({
  ...result,
  docs: result.docs.map((product) => {
    if (palindrome) {
      return {
        ...product._doc,
        new_price: product.price / 2 > 0 ? product.price / 2 : 0,
        palindrome,
        discount: "50%",
      };
    }
    return { ...product._doc, palindrome };
  }),
});

module.exports = {
  name: "palindrome",
  logic: PalindromeDecorator,
  attributes: ["new_price", "palindrome", "discount"],
  enabled: true,
  sort: 0,
};
