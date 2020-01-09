import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as userService from "../store/userList/service";
import * as catalogSelectors from "../store/selectors";

class UserList extends Component {
  state = {};

  componentDidMount() {
    const { getUserList } = this.props.userService;
    getUserList();
  }

  loadChatMessage = (event, name) => {
    event.preventDefault();
    this.props.setCurrentChat(name, "PRIVATE");
  };

  render() {
    const { userList } = this.props;
    return (
      <div className="card my-4">
        <h5 className="card-header">Пользователи</h5>
        <div className="card-body">
          {userList &&
            userList.map(el => (
              <p>
                <button
                  className="form-control input-group-btn"
                  onClick={event => this.loadChatMessage(event, el.fullName)}
                >
                  {el.fullName}
                </button>
              </p>
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userList: catalogSelectors.getUsers(state)
});

const mapDispatchToProps = dispatch => ({
  userService: bindActionCreators(userService, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
