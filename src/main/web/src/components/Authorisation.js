import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Form from "./Form";

import * as userService from "../store/user/service";
import * as catalogSelectors from "../store/selectors";

class Authorisation extends Component {
  fileds = [
    {
      name: "login",
      label: "Логин",
      labelClass: "topAndButtom",
      className: "text",
      type: "text"
    },
    {
      name: "password",
      label: "Пароль",
      labelClass: "topAndButtom",
      type: "password"
    }
  ];

  handleAuhtSubmit = ({ login, password }) => {
    fetch("http://localhost:8900/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin",
      body: JSON.stringify({ fullName: login, password })
    })
      .then(response => {
        console.log(response);
        response.json();
      })
      .then(result => {
        console.log(result);
        this.props.history.push(`chat/${result}`);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  /*handleAuhtSubmit = ({ login, password }) => {
    const { registrationUser } = this.props.userService;
    registrationUser({ login, password }); 
  };*/

  render() {
    const { user } = this.props;
    return (
      <Form
        fileds={this.fileds}
        button="Войти"
        onSubmit={this.handleAuhtSubmit}
        error={user && user.error}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: catalogSelectors.getUser(state)
});

const mapDispatchToProps = dispatch => ({
  userService: bindActionCreators(userService, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Authorisation);
