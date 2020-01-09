import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

import * as catalogSelectors from "../store/selectors";

class Chat extends Component {
  state = {
    messageList: []
  };

  setCurrentChat = (name, type) => {
    const { user } = this.props;
    var socketConn = new WebSocket("ws://localhost:8900/txtSocketHandler");

    this.setState({ currentChat: name });
    this.setState({ messageList: [] });

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
      console.log("Connection: " + user && user.fullName + " > " + name);
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
    this.setState({ socketConn: socketConn });
  };

  showMessage = message => {
    var messageObj = JSON.parse(message);
    if (messageObj.type === "MESSAGE") {
      this.setState(prevState => ({
        messageList: [...prevState.messageList, { message: messageObj.text }]
      }));
    }
    if (messageObj.type === "NEW_USER") {
      this.isOnlin(true, messageObj.text);
    }
    if (messageObj.type === "PUSH_MESSAGE") {
      console.log("Вам сообщение " + messageObj.text);
    }
  };

  isOnlin = (onlin, name) => {
    console.log("isOnlin: " + onlin + " - " + name);
  };

  render() {
    const { socketConn, currentChat, messageList } = this.state;
    return (
      <div className="container">
        <Navbar setCurrentChat={this.setCurrentChat} />
        <div className="row current-chat">
          <h3>
            <span>{currentChat}</span>
          </h3>
        </div>

        <MessageList messageList={messageList} />

        <MessageInput
          setCurrentChat={this.setCurrentChat}
          socketConn={socketConn}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: catalogSelectors.getUser(state)
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
