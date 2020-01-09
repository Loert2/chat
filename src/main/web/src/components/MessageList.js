import React, { Component } from "react";

class MessageList extends Component {
  render() {
    const { messageList } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <table id="conversation" className="table table-striped">
            <thead>
              <tr>
                <th>Список сообщений</th>
              </tr>
            </thead>
            {messageList && messageList.map(el => <p className='message'>{el.message}</p>)}
          </table>
        </div>
      </div>
    );
  }
}

export default MessageList;
