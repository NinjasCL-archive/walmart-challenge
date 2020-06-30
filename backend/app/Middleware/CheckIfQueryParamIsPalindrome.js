"use strict";

const isPalindrome = require("@pelevesque/is-palindrome");

class CheckIfQueryParamIsPalindrome {
  async handle({ request }, next) {
    request.palindrome = false;

    if (request.query) {
      const word = request.query;
      const minimumLength = 3;
      if (word.length >= minimumLength) {
        request.palindrome = isPalindrome(word);
      }
    }
    await next();
  }
}

module.exports = CheckIfQueryParamIsPalindrome;
