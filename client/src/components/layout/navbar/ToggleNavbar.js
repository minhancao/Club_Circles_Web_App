import React, { Component } from "react";
import Navbar from "./Navbar";
import NavbarLoggedIn from "./NavbarLoggedIn";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class ToggleNavbar extends Component {
  render() {
    return (
      <div className="App">
        {this.props.auth.isAuthenticated ? <NavbarLoggedIn /> : <Navbar />}
      </div>
    );
  }
}

ToggleNavbar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ToggleNavbar);
