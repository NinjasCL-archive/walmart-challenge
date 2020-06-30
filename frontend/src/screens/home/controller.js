import React, { useState, useEffect, useRef } from "react";

import View from "./view";
import ProductsAPI from "../../http/products";

const HomeController = () => {
  const [products, setProducts] = useState(ProductsAPI.default.get);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [shouldFetch, setShouldFetch] = useState(true);

  const cachedProducts = useRef([]);

  // TODO: fin a way to implement debounce
  // the current implementation using solutions like react-debounce-input
  // gives wrong search results due to the delay.
  const updateSearchQuery = (event) => {
    const query = event.target.value.trim();

    // Reset the product list and current page
    if (cachedProducts.current.length > 0) {
      cachedProducts.current = [];
    }

    if (page !== 1) {
      setPage(1);
    }

    setSearchQuery(query);
    setShouldFetch(true);
  };

  const loadMoreProducts = () => {
    if (products.meta.has_next_page) {
      setPage(products.meta.next_page);
      setShouldFetch(true);
    }
  };

  useEffect(() => {
    cachedProducts.current = [...cachedProducts.current, ...products.items];
  }, [products]);

  useEffect(() => {
    const fetchProducts = () => {
      if (shouldFetch) {
        ProductsAPI.get({ query: searchQuery, page }).then((result) => {
          setProducts(result);
          setShouldFetch(false);
        });
      }
    };
    fetchProducts();
  }, [searchQuery, page, shouldFetch]);

  return (
    <View
      products={products}
      items={cachedProducts.current}
      search={searchQuery}
      setSearch={updateSearchQuery}
      loadMoreProducts={loadMoreProducts}
    />
  );
};

export default HomeController;
