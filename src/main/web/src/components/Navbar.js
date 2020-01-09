import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as chatService from "../store/chat/service";
import * as userService from "../store/userList/service";
import * as catalogSelectors from "../store/selectors";

class Navbar extends Component {
  state = {};

  componentDidMount() {
    const { getChatList } = this.props.chatService;
    const { getUserList } = this.props.userService;
    getChatList();
    getUserList();
  }

  addChat = event => {
    event.preventDefault();
    const { chatName } = this.state;
    fetch(`http://localhost:8900/addChat/`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin",
      body: chatName
    })
      .then(response => {
        return response.json();
      })
      .then(result => {
        console.log(result);
        this.setState({ chatList: result });
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  handleChange = event => {
    this.setState({ chatName: event.target.value });
  };

  loadChatMessage = (event, name) => {
    event.preventDefault();
    this.props.setCurrentChat(name, "ROOM");
  };

  loadChatMessageUser = (event, name) => {
    event.preventDefault();
    this.props.setCurrentChat(name, "PRIVATE");
  };

  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const { user, chatList, userList } = this.props;
    const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;
    return (
      <div className="navbar navbar-expand-lg navbar-dark backgroundNavbar">
        <div className="container">
          <div className="dropdown" onClick={this.toggleOpen}>
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
            >
              Список чатов пользователя
            </button>
            <div className={menuClass} aria-labelledby="dropdownMenuButton">
              {chatList &&
                chatList.map(el => (
                  <button
                    className="dropdown-item"
                    onClick={event => this.loadChatMessage(event, el.name)}
                  >
                    {el.name}
                  </button>
                ))}
              {userList &&
                userList.map(el => (
                  <button
                    className="dropdown-item"
                    onClick={event =>
                      this.loadChatMessageUser(event, el.fullName)
                    }
                  >
                    {el.fullName}
                  </button>
                ))}
            </div>
          </div>
          <form className="input-richt" onSubmit={this.addChat}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Введите название чата"
                onChange={this.handleChange}
              />
              <span className="input-group-btn">
                <button className="btn btn-secondary" type="submit">
                  +
                </button>
              </span>
            </div>
          </form>
          <a href="/" className="navbar-brand ml-auto">
            <h4>{user && user.fullName}</h4>
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: catalogSelectors.getUser(state),
  userList: catalogSelectors.getUsers(state),
  chatList: catalogSelectors.getChats(state)
});

const mapDispatchToProps = dispatch => ({
  chatService: bindActionCreators(chatService, dispatch),
  userService: bindActionCreators(userService, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
