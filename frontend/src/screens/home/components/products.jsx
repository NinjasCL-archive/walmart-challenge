import React from "react";
import InfiniteScroller from "react-infinite-scroller";

const makeColumnsContainer = (cols, index) => (
  <div key={index} className="columns features">
    {cols}
  </div>
);
const makeColumn = (item, index) => (
  <div key={index} className="column is-3">
    <div className="card is-shady">
      <div className="card-image">
        <figure className="image is-4by3">
          <img
            src={item.image}
            alt={item.id}
            className="modal-button"
            data-target="modal-image2"
          />
        </figure>
      </div>
      <div className="card-content">
        <div className="content">
          <h4>
            ({item.id}) - {item.brand}
          </h4>
          <p>{item.description}</p>
          {item.palindrome ? (
            <>
              <p>
                <span className="tag is-danger is-large">
                  <s>{item.formatted_price}</s>
                </span>
                &nbsp;
                <span className="tag is-warning is-large">
                  <b>{item.discount}</b>
                </span>
              </p>
              <p>
                <span className="tag is-success is-large">
                  <b>{item.formatted_new_price}</b>
                </span>
              </p>
            </>
          ) : (
            <p>
              <span className="tag is-success is-large">
                {item.formatted_price}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  </div>
);

const noResults = () => (
  <section className="container">
    <div className="columns">
      <div className="column is-12">
        <div className="content has-text-centered">
          <span className="icon is-large">
            <h1
              className="is-title"
              style={{ fontSize: "5em", paddingTop: "3em" }}
            >
              <i className="fa fa-exclamation-triangle"></i>
            </h1>
          </span>
        </div>
      </div>
    </div>
  </section>
);

const View = ({ items, products, loadMoreProducts }) => {
  if (!products) {
    return null;
  }

  if (products.meta.total === 0 && items.length <= 0) {
    return noResults();
  }

  const columnsPerRow = 4;

  const hasReachedMaxColumns = (index) =>
    index > 0 && index % columnsPerRow === 0;

  const totalColumnsIsBelowColumnsPerRow = () => items.length <= columnsPerRow;

  let columns = [];
  const elements = [];

  items.forEach((item, index) => {
    if (hasReachedMaxColumns(index) || totalColumnsIsBelowColumnsPerRow()) {
      elements.push(makeColumnsContainer(columns, index));
      if (hasReachedMaxColumns(index)) {
        columns = [];
      }
    }
    columns.push(makeColumn(item, index));
  });

  return (
    <section className="container">
      <InfiniteScroller
        pageStart={1}
        loadMore={loadMoreProducts}
        hasMore={products.meta.has_next_page}
        threshold={10}
      >
        {elements}
      </InfiniteScroller>
    </section>
  );
};

export default View;
