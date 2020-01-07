import React, { Component } from "react";
import Form from "./Form";

class Authorisation extends Component {
  state = {};
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
    fetch(
      "http://localhost:8900/login?" + new URLSearchParams({ login, password }),
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => {
        console.log(response);
        response.json();
      })
      .then(result => {
        this.setState({ login: result });
        this.props.history.push("/chat");
      })
      .catch(error => {
        console.error("Error:", error);
        this.setState({ error: "Неправильный логин или пароль" });
      });
  };

  render() {
    return (
      <Form
        fileds={this.fileds}
        button="Войти"
        onSubmit={this.handleAuhtSubmit}
        error={this.state.error}
      />
    );
  }
}

export default Authorisation;
