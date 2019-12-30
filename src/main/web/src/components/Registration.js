import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';
import Chat from './chat';

class RegistrationForm extends Component {
  state = {};
  fileds = [
    {
      name: 'name',
      label: 'Имя пользователя',
      labelClass: 'topAndButtom',
      className: 'text',
      type: 'text',
    },
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
    {
      name: 'confirmPassword',
      label: 'Подтвердить пароль',
      type: 'password',
    },
  ];

  handleRegSubmit = ({ login, name, password, confirmPassword }) => {
    if (password === confirmPassword) {
      this.props.update({ login, name, password }).then(res => {});
      this.props.history.push('/chat');
      this.setState({ error: '' });
    } else {
      this.setState({ error: 'Пароль не совпадает' });
    }
  };

  render() {
    return (
      <Form
        fileds={this.fileds}
        button="Зарегестрироваться"
        link={<Link to="/authorisation">Авторизоваться</Link>}
        onSubmit={this.handleRegSubmit}
        error={this.state.error}
      />
    );
  }
}

export default Registration;
