import React, { Component } from "react";
import { Helmet } from "react-helmet";
import "./App.scss";
import SearchImages from "./searchImages";
import styled from "styled-components";
import CountDown from "./countDown";
import ReactGa from "react-ga";

const DynamicBg = styled.div`
  background-image: url(${(props) => (props.bg ? props.bg : "none")});
  background-size: cover;
  background-position: center center;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bg: "https://source.unsplash.com/xL66l--msXU/1600x900",
      query: "",
      pics: [],
      isInputOpen: false,
      searchDelete: false,
    };
  }

  componentDidMount() {
    ReactGa.initialize("G-1MDFZTNN34");
    ReactGa.pageview("/");

    var bg = localStorage.getItem("bg");
    if (bg) {
      this.setState({
        bg: bg,
      });
    }
  }

  changeBg = (picId) => {
    var url = `https://source.unsplash.com/${picId}/1600x900`;
    this.setState({
      bg: url,
    });
    localStorage.setItem("bg", url);
  };

  render() {
    let bg = this.state.bg;

    return (
      <DynamicBg bg={bg}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Mi Cuenta Regresiva</title>
          <link rel="canonical" href="http://mysite.com/example" />
          <meta
            name="description"
            content="Contador regresivo configurable para eventos especiales"
          />
        </Helmet>
        <SearchImages changeBg={this.changeBg} />
        <CountDown />
      </DynamicBg>
    );
  }
}
