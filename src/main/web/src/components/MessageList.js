import React, { Component } from "react";

class MessageList extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <table id="conversation" className="table table-striped">
            <thead>
              <tr>
                <th>Список сообщений</th>
              </tr>
            </thead>
            <tbody id="messagelist"></tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default MessageList;
