import React, { Component } from "react";

class MessageInput extends Component {
  state = {};

  sendMessage = event => {
    event.preventDefault();
    this.props.socketConn.send(JSON.stringify({
        type: "MESSAGE",
        text: this.state.value
    }));
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({value: event.target.value});
  };

  render() {
    return (
      <form className="form-inline" onSubmit={this.sendMessage}>
        <div className="form-group nav">
          <input
            type="text"
            className="form-control col-md-10"
            placeholder="Сообщение"
            onChange={this.handleChange}
          />
        </div>
        <div className="button">
          <input type="submit" className="dws-submit" value="Отправить" />
        </div>
      </form>
    );
  }
}

export default MessageInput;
