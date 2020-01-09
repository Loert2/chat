import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as chatService from "../store/chat/service";
import * as userService from "../store/userList/service";
import * as catalogSelectors from "../store/selectors";

class ChatList extends Component {
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
    const { user } = this.props;
    fetch(`http://localhost:8900/addChat/${user && user.fullName}`, {
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

  render() {
    const { chatList, userList } = this.props;
    return (
      <div className="card my-4">
        <h5 className="card-header">Список чатов</h5>
        <div className="card-body">
          {chatList &&
            chatList.map(el => (
              <p>
                <button
                  className="form-control input-group-btn"
                  onClick={event => this.loadChatMessage(event, el.name)}
                >
                  {el.name}
                </button>
              </p>
            ))}
            {userList &&
            userList.map(el => (
              <p>
                <button
                  className="form-control input-group-btn"
                  onClick={event => this.loadChatMessageUser(event, el.fullName)}
                >
                  {el.fullName}
                </button>
              </p>
            ))}
          <form onSubmit={this.addChat}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
