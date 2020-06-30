import React from "react";

const View = ({ search, setSearch }) => (
  <>
    <section className="hero is-info">
      <div className="hero-body">
        <div className="container">
          <div className="columns has-text-centered">
            <div className="column">
              <img
                src="https://images.lider.cl/wmtcl?source=url%5Bfile:/prehome/logo-lider-pride.png%5D&sink=format%5Bpng%5D%5D&sink=format%5Bpng%5D"
                alt="Lider.cl"
              />
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <div className="content">
                <div className="control has-icons-left has-icons-right">
                  <input
                    className="input is-large searchbar"
                    type="search"
                    onChange={setSearch}
                    placeholder={search}
                    autoFocus
                  />
                  <span className="icon is-medium is-left">
                    <i className="fa fa-search"></i>
                  </span>
                  <span className="icon is-medium is-right"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div className="box cta">
      <div className="columns is-mobile is-centered">
        <div className="field is-grouped is-grouped-multiline">
          {/* <div className="control">
            <span className="tag is-link is-large">Link</span>
          </div>
          <div className="control">
            <span className="tag is-success is-large">Success</span>
          </div>
          <div className="control">
            <span className="tag is-black is-large">Black</span>
          </div>
          <div className="control">
            <span className="tag is-warning is-large">Warning</span>
          </div>
          <div className="control">
            <span className="tag is-danger is-large">Danger</span>
          </div>
          <div className="control">
            <span className="tag is-info is-large">Info</span>
          </div> */}
        </div>
      </div>
    </div>
  </>
);

export default View;
