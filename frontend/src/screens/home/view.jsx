import React from "react";
import NavBar from "./components/navbar";
import SearchBar from "./components/searchbar";
import Products from "./components/products";

// html based on https://bulmatemplates.github.io
const HomeView = ({ items, products, search, setSearch, loadMoreProducts }) => {
  return (
    <>
      <NavBar />
      <SearchBar search={search} setSearch={setSearch} />
      <Products
        items={items}
        products={products}
        loadMoreProducts={loadMoreProducts}
      />
    </>
  );
};

export default HomeView;
