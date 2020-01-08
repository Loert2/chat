import React, { Component } from "react";
import { connect } from "react-redux";

import * as catalogSelectors from "../store/selectors";

class Navbar extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a href="/" className="navbar-brand ml-auto">
            <h4>{user && user.fullName}f</h4>
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: catalogSelectors.getUser(state)
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
