import React, { createRef, Component } from "react";
import { createApi } from "unsplash-js";

const unsplash = new createApi({
  accessKey: "1nUlSewgHUUR_yIDU8o2Nq7MraAp4yjnMrja6o7X61s",
});

export default class SearchImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      pics: [],
      isInputOpen: false,
      searchDelete: false,
    };
    this.searchInput = createRef();
    this.changeValue = this.changeValue.bind(this);
  }

  searchImages = async (e) => {
    e.preventDefault();
    unsplash.search
      .getPhotos({ query: this.state.query, orientation: "landscape" })
      .then((result) => {
        this.setState({
          pics: result.response.results,
        });
      });
  };

  focusInput() {
    this.searchInput.current.focus();
    this.setState({
      query: "",
    });
  }
  changeValue(event) {
    this.setState({
      query: event.target.value,
    });
  }
  setQuery(event) {
    if (event.key === "Enter") {
      this.searchImages(event);
    }
  }

  closeSearch(isInputOpen) {
    if (isInputOpen) {
      this.focusInput();
    } else {
      this.setState({
        pics: "",
        searchDelete: false,
        isInputOpen: false,
      });
    }
  }
  deleteSearch() {
    this.setState({
      pics: "",
      query: "",
      searchDelete: false,
    });
    this.focusInput();
  }

  changeBg = (picId) => {
    this.props.changeBg(picId);
  };

  render() {
    let pics = this.state.pics;
    return (
      <>
        <div className="container">
          <div
            className={this.state.isInputOpen ? "search search-open" : "search"}
          >
            <svg
              className="search__icon"
              alt="Cambiar fondo"
              viewBox="0 0 500 500"
              title="search"
              onClick={() => {
                this.setState({ isInputOpen: true }, () => {
                  this.closeSearch(this.state.isInputOpen);
                });
              }}
            >
              <path
                style={{ fill: `rgb(118, 123, 145)` }}
                d="M 7.312 480.804 L 493.601 482.633 L 346.098 205.667 L 193.834 379.342 L 135.785 297.989 L 7.312 480.804 Z"
              />
              <circle
                style={{ fill: `rgb(118, 123, 145)` }}
                cx="117.915"
                cy="198.355"
                r="42.737"
              />
            </svg>
            <input
              type="text"
              className="search__input"
              value={this.state.query}
              autoFocus
              placeholder="Cambiar fondo..."
              onChange={this.changeValue}
              onKeyDown={(e) => this.setQuery(e)}
              ref={this.searchInput}
            />
            <svg
              className="search__close"
              viewBox="0 0 352 512"
              width="45"
              title="times"
              onClick={() => {
                this.setState({ isInputOpen: false }, () => {
                  this.closeSearch(this.state.isInputOpen);
                });
              }}
            >
              <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
            </svg>
            <svg
              className={
                this.state.isInputOpen
                  ? "search__delete"
                  : "search__delete_close"
              }
              viewBox="0 0 640 512"
              width="45"
              title="backspace"
              onClick={() => {
                this.setState({ searchDelete: true }, () => {
                  this.deleteSearch();
                });
              }}
            >
              <path d="M576 64H205.26A63.97 63.97 0 0 0 160 82.75L9.37 233.37c-12.5 12.5-12.5 32.76 0 45.25L160 429.25c12 12 28.28 18.75 45.25 18.75H576c35.35 0 64-28.65 64-64V128c0-35.35-28.65-64-64-64zm-84.69 254.06c6.25 6.25 6.25 16.38 0 22.63l-22.62 22.62c-6.25 6.25-16.38 6.25-22.63 0L384 301.25l-62.06 62.06c-6.25 6.25-16.38 6.25-22.63 0l-22.62-22.62c-6.25-6.25-6.25-16.38 0-22.63L338.75 256l-62.06-62.06c-6.25-6.25-6.25-16.38 0-22.63l22.62-22.62c6.25-6.25 16.38-6.25 22.63 0L384 210.75l62.06-62.06c6.25-6.25 16.38-6.25 22.63 0l22.62 22.62c6.25 6.25 6.25 16.38 0 22.63L429.25 256l62.06 62.06z" />
            </svg>
          </div>

          <div className="card-list">
            {pics !== "" &&
              pics.map((pic) => (
                <div className="card" key={pic.id}>
                  <img
                    className="card--image"
                    alt={pic.alt_description}
                    src={pic.urls.small}
                    onClick={() => this.changeBg(pic.id)}
                  ></img>
                </div>
              ))}
          </div>
        </div>
      </>
    );
  }
}
