import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../../App.css";
import { Icon, Dropdown, Menu } from "antd";
import "./Toolbar.css";

class Navbar extends Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
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
                      to="/clubspage"
                      class="navbar-items2"
                      style={{ margin: "0px 50px" }}
                    >
                      Browse Clubs
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
