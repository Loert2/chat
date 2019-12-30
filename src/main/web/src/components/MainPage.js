import React, { Component } from "react";
import { Link } from "react-router-dom";

class MainPage extends Component {
  render() {
    return (
      <div className="container-work">
        <div className="element-header-main-page">
          <div className="element-right">
            <Link to="/registration">Зарегестрироваться</Link>
            <label className="separator"> / </label>
            <Link to="/authorisation">Авторизоваться</Link>
          </div>
        </div>
        <div className="element-info">
          <label className="name-compony">Чат Д&А</label>
        </div>
      </div>
    );
  }
}

export default MainPage;
