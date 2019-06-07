import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../../App.css";
import { Icon, Dropdown, Menu } from "antd";
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

class Navbar extends Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };
  render() {
    return (
      <div class="toolbar">
        <div class="toolbar__navigation">
          <Link to="/" class="toolbar__logo">
            Club Circles
          </Link>
          <div className="spacer" />
          <div>
            <Link to="/clubspage" class="navbar-items2">
              Browse Clubs
            </Link>

            <Link to="/clubspage" class="navbar-items2">
              Join a Club
            </Link>

            <Link to="/clubspage" class="navbar-items2">
              Create a Club
            </Link>

            <Link
              className="navbar-items2"
              onClick={this.onLogoutClick}
              to="/register"
            >
              Register
            </Link>
            <Link
              className="navbar-items2"
              onClick={this.onLogoutClick}
              to="/login"
            >
              Log In
            </Link>
            <Dropdown
              trigger="click"
              overlay={
                <Menu style={{ textAlign: "center" }}>
                  <Menu.Item>
                    <Link
                      to="/"
                      class="navbar-items2"
                      style={{ margin: "0px 100px" }}
                    >
                      Home
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link
                      to="/clubspage"
                      class="navbar-items2"
                      style={{ margin: "0px 50px" }}
                    >
                      Browse Clubs
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link
                      to="/clubspage"
                      class="navbar-items2"
                      style={{ margin: "0px 50px" }}
                    >
                      Join a Club
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link
                      to="/clubspage"
                      class="navbar-items2"
                      style={{ margin: "0px 50px" }}
                    >
                      Create a Club
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link
                      className="navbar-items2"
                      onClick={this.onLogoutClick}
                      to="/register"
                      style={{ margin: "0px 50px" }}
                    >
                      Register
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link
                      className="navbar-items2"
                      onClick={this.onLogoutClick}
                      to="/login"
                      style={{ margin: "0px 50px" }}
                    >
                      Log In
                    </Link>
                  </Menu.Item>
                </Menu>
              }
              placement="bottomRight"
              overlayStyle={{ position: "fixed" }}
            >
              <a href="javascript:void(0);">
                <Icon
                  onClick={this.showDrawer}
                  type="menu"
                  className="menu_icon"
                />
              </a>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
