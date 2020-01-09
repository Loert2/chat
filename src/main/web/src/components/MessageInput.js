import React, { Component } from "react";

class MessageInput extends Component {
  state = {};

  sendMessage = event => {
    event.preventDefault();
    this.props.socketConn.send(
      JSON.stringify({
        type: "MESSAGE",
        text: this.state.value
      })
    );
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({value: event.target.value});
  };

  render() {
    return (
      <form className="container row" onSubmit={this.sendMessage}>
        <div className="form-group nav col-xs-14 col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Сообщение"
            onChange={this.handleChange}
          />
        </div>
        <div className="btn button-send">
          <input type="submit" className="form-control btn-secondary" value="Отправить" />
        </div>
      </form>
    );
  }
}

export default MessageInput;
