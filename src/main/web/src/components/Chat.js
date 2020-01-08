import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import ChatList from "./ChatList";
import UserList from "./UserList";

import * as catalogSelectors from "../store/selectors";

class Chat extends Component {
  state = {};

  setCurrentChat = (name, type) => {
    const { user } = this.props;
    var socketConn = new WebSocket("ws://localhost:8900/txtSocketHandler");

    socketConn.onmessage = e => {
      this.showMessage(e.data);
      console.log(e);
    };

    socketConn.onopen = () => {
      socketConn.send(
        JSON.stringify({
          type: "JOIN",
          chatType: type,
          user: user && user.fullName,
          recipient: name
        })
      );
      console.log(
        "Connection established: " + user && user.fullName + " -> " + name
      );
    };

    socketConn.onclose = event => {
      if (event.wasClean) {
        console.log("Connection closed clean");
      } else {
        console.log("Disconnection");
      }
      console.log("Code: " + event.code + " reason: " + event.reason);
    };

    socketConn.onerror = error => {
      console.log("error " + error.message);
    };

  };

  showMessage = message => {
    var messageObj = JSON.parse(message);
    if (messageObj.type === "MESSAGE") {
      console.log(messageObj.text);
    }
    if (messageObj.type === "NEW_USER") {
      this.isOnlin(true, messageObj.text);
    }
    if (messageObj.type === "DELETE_USER") {
      this.isOnlin(false, messageObj.text);
    }
    if (messageObj.type === "PUSH_MESSAGE") {
      console.log("Вам сообщение " + messageObj.text);
    }
  };

  isOnlin = (onlin, name) => {
    console.log("isOnlin: " + onlin + " - " + name);
  };

  render() {
    return (
      <div className="container">
        <Navbar />
        <div className="row">
          <h3>
            <span id="currentChat"></span>
          </h3>
        </div>

        <MessageList />

        <MessageInput socketConn={""} />

        <div className="row">
          <div className="col-sm">
            <ChatList setCurrentChat={this.setCurrentChat} />
          </div>
          <div className="col-sm">
            <UserList />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: catalogSelectors.getUser(state)
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
