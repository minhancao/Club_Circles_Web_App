import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import "../../../App.css";
import { Icon } from "antd";
import "./Toolbar.css";

const onMouseOver = event => {
  const el = event.target;
  el.style.color = "#40E0D0";
};

const onMouseOut = event => {
  const el = event.target;
  el.style.color = "#707070";
};

const onMouseOver2 = event => {
  const el = event.target;
  el.style.color = "black";
};

const onMouseOut2 = event => {
  const el = event.target;
  el.style.color = "white";
};

class NavbarLoggedIn extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    // Redirect to login
    window.location.href = "/login";
  };

  render() {
    const { user } = this.props.auth;
    return (
      <div class="toolbar">
        <div class="toolbar__navigation">
          <Link to="/dashboard" class="toolbar__logo">
            Club Circles
          </Link>
          <div className="spacer" />
          <div>
            <Link to="/clubspage" class="navbar-items">
              Browse Clubs
            </Link>
            <Link to="/clubspage" class="navbar-items">
              Notifications
            </Link>

            <a
              class="navbar-items"
              href="/AccountInfo"
              onMouseEnter={event => onMouseOver(event)}
              onMouseOut={event => onMouseOut(event)}
            >
              Account Info
            </a>
            <Link
              className="navbar-items"
              onClick={this.onLogoutClick}
              to="/login"
            >
              Log Out
            </Link>

            <Icon className="toolbar_navigation-items2" type="profile" />

            <Icon className="toolbar_navigation-items2" type="notification" />

            <Icon className="toolbar_navigation-items2" type="user" />

            <Link
              className="toolbar_navigation-items2"
              onClick={this.onLogoutClick}
              to="/login"
            >
              <Icon type="logout" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

NavbarLoggedIn.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(NavbarLoggedIn);
