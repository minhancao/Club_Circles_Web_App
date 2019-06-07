import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import NavbarLoggedIn from "../layout/navbar/NavbarLoggedIn";

function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const images = importAll(
  require.context("../images", false, /\.(png|jpe?g|svg)$/)
);

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div>
        <NavbarLoggedIn />
        <div class="w3-content w3-padding" style={{ maxWidth: 1564 }}>
          <div class="w3-container w3-padding-32" id="projects">
            <h3 class="w3-border-bottom w3-border-light-grey w3-padding-16">
              Clubs
            </h3>
          </div>

          <div class="w3-row-padding">
            <div class="w3-col l3 m6 w3-margin-bottom">
              <div class="w3-display-container">
                <div class="w3-display-topleft w3-black w3-padding">
                  LA Club
                </div>
                <img
                  alt="some alt"
                  src={images["los_angeles.jpeg"]}
                  style={{ width: 300, height: 300 }}
                />
              </div>
            </div>
            <div class="w3-col l3 m6 w3-margin-bottom">
              <div class="w3-display-container">
                <div class="w3-display-topleft w3-black w3-padding">
                  LA Club
                </div>
                <img
                  alt="some alt"
                  src={images["los_angeles.jpeg"]}
                  style={{ width: 300, height: 300 }}
                />
              </div>
            </div>
            <div class="w3-col l3 m6 w3-margin-bottom">
              <div class="w3-display-container">
                <div class="w3-display-topleft w3-black w3-padding">
                  LA Club
                </div>
                <img
                  alt="some alt"
                  src={images["los_angeles.jpeg"]}
                  style={{ width: 300, height: 300 }}
                />
              </div>
            </div>
            <div class="w3-col l3 m6 w3-margin-bottom">
              <div class="w3-display-container">
                <div class="w3-display-topleft w3-black w3-padding">
                  LA Club
                </div>
                <img
                  alt="some alt"
                  src={images["los_angeles.jpeg"]}
                  style={{ width: 300, height: 300 }}
                />
              </div>
            </div>
            <div class="w3-col l3 m6 w3-margin-bottom">
              <div class="w3-display-container">
                <div class="w3-display-topleft w3-black w3-padding">
                  LA Club
                </div>
                <img
                  alt="some alt"
                  src={images["los_angeles.jpeg"]}
                  style={{ width: 300, height: 300 }}
                />
              </div>
            </div>
            <div class="w3-col l3 m6 w3-margin-bottom">
              <div class="w3-display-container">
                <div class="w3-display-topleft w3-black w3-padding">
                  LA Club
                </div>
                <img
                  alt="some alt"
                  src={images["los_angeles.jpeg"]}
                  style={{ width: 300, height: 300 }}
                />
              </div>
            </div>
            <div class="w3-col l3 m6 w3-margin-bottom">
              <div class="w3-display-container">
                <div class="w3-display-topleft w3-black w3-padding">
                  LA Club
                </div>
                <img
                  alt="some alt"
                  src={images["los_angeles.jpeg"]}
                  style={{ width: 300, height: 300 }}
                />
              </div>
            </div>
            <div class="w3-col l3 m6 w3-margin-bottom">
              <div class="w3-display-container">
                <div class="w3-display-topleft w3-black w3-padding">
                  LA Club
                </div>
                <img
                  alt="some alt"
                  src={images["los_angeles.jpeg"]}
                  style={{ width: 300, height: 300 }}
                />
              </div>
            </div>
          </div>

          <div style={{ height: "75vh" }} className="container valign-wrapper">
            <div className="row">
              <div className="landing-copy col s12 center-align">
                <h4>
                  <b>Hey there,</b> {user.name.split(" ")[0]}
                  <p className="flow-text grey-text text-darken-1">
                    You are logged into a full-stack{" "}
                    <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
                  </p>
                </h4>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  onClick={this.onLogoutClick}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
