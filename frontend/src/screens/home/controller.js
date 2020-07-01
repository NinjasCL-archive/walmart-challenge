import React, { useState, useEffect, useRef } from "react";
import _ from "lodash";

import View from "./view";
import ProductsAPI from "../../http/products";

const HomeController = () => {
  const [products, setProducts] = useState(ProductsAPI.default.get);
  const [searchQuery, setSearchQuery] = useState("");
  const [queryIsDirty, setQueryIsDirty] = useState(true);
  const [page, setPage] = useState(1);
  const [shouldFetch, setShouldFetch] = useState(true);

  const cachedProducts = useRef([]);

  // using debounce strategy by https://github.com/Mikjail/search-bar
  const updateSearchQuery = ({ target: { value } }) => {
    const milliseconds = 300;

    const searchDebounced = _.debounce(() => {
      // Reset the product list and current page
      setPage(1);
      if (cachedProducts.current.length > 0) {
        cachedProducts.current = [];
      }

      setShouldFetch(true);
    }, milliseconds);

    const query = value.trim();

    setPage(1);
    setSearchQuery(query);
    setQueryIsDirty(true);
    searchDebounced(query);
  };

  const loadMoreProducts = () => {
    if (products.meta.has_next_page) {
      setPage(products.meta.next_page);
      if (queryIsDirty) {
        setPage(1);
      }
      setShouldFetch(true);
    }
  };

  useEffect(() => {
    cachedProducts.current = [...cachedProducts.current, ...products.items].sort(
      (a, b) => a.price < b.price
    );
  }, [products]);

  useEffect(() => {
    const fetchProducts = () => {
      if (shouldFetch) {
        ProductsAPI.get({ query: searchQuery, page }).then((result) => {
          if (result && !result.cancelPrevQuery) {
            setProducts(result);
            setShouldFetch(false);
            setQueryIsDirty(false);
          }
        });
      }
    };
    fetchProducts();
  }, [searchQuery, page, shouldFetch]);

  return (
    <View.Main
      products={products}
      items={cachedProducts.current}
      search={searchQuery}
      setSearch={updateSearchQuery}
      loadMoreProducts={loadMoreProducts}
    />
  );
};

export default HomeController;
