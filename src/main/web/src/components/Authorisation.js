import React, { Component } from 'react';
import Form from './Form';

class Authorisation extends Component {
  state = {};
  fileds = [
    {
      name: 'login',
      label: 'Логин',
      labelClass: 'topAndButtom',
      className: 'text',
      type: 'text',
    },
    {
      name: 'password',
      label: 'Пароль',
      labelClass: 'topAndButtom',
      type: 'password',
    },
  ];

  handleAuhtSubmit = ({ login, password }) => {
    this.props.update({ login, password }).then(res => {
      if (res.data.UserSignIn.error === null) {
        this.setState({ error: '' });
        this.props.history.push('/chat');
      } else {
        this.setState({ error: 'Неправильный логин или пароль' });
      }
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
