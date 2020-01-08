import React, { Component } from "react";

class UserList extends Component {
  render() {
    return (
      <div className="card my-4">
        <h5 className="card-header">Пользователи</h5>
        <div className="card-body">
          <tbody>
            <div className="input-group">
              <span
                className="form-control"
                onClick="setCurrentChat(this.getAttribute('data-nickname'), 'PRIVATE')"
              >
                <span></span>
                <span>✖</span>
              </span>
            </div>
            <hr />
          </tbody>
        </div>
      </div>
    );
  }
}

export default UserList;
