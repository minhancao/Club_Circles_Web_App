import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../App.css";

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

/* const onMouseOver = event => {
  const el = event.target;
  el.style.color = "#40E0D0";
};

const onMouseOut = event => {
  const el = event.target;
  el.style.color = "#707070";
}; */

class Landing extends Component {
  render() {
    return (
      <div>
        {/* <header
          class="w3-display-container w3-content w3-wide"
          style={{ maxWidth: 1920 }}
          id="home"
        >
          <div>
            <img
              class="w3-image"
              src={images["bestHomePic.jpg"]}
              alt="Architecture"
            />
            <div class="topmiddle1 w3-margin-top w3-center">
              <h1 class="w3-xxlarge w3-text-white">
                <span class="w3-hide-small w3-text-light-grey">
                  Create and manage your clubs.
                </span>
              </h1>
            </div>
            <div class="bottommiddle1 w3-margin-top w3-center">
              <h1 class="w3-xxlarge w3-text-white">
                <span class="w3-padding w3-black w3-opacity-min">
                  <b>Club</b> Circles
                </span>
              </h1>
            </div>
          </div>
        </header> */}
        <div
          className="row"
          style={{
            height: "100vh",
            backgroundColor: "#40E0D0",
            paddingTop: "220px"
          }}
        >
          <div className="column center-align">
            <h1
              style={{
                fontFamily: "Avenir Next",
                fontSize: "62px",
                fontWeight: "520"
              }}
            >
              Connect with your <br />
              members like never
              <br /> before.
            </h1>
            <p
              className="flow-text white-text text-darken-1"
              style={{
                fontFamily: "Avenir Next",
                fontSize: "16px"
              }}
            >
              Create a club, join your favorite group, and interact with
              <br />
              members in ways you never thought were possible.
            </p>
            <br />

            <Link
              className="btn waves-effect waves-light hoverable black-text white accent-3"
              to="/register"
              style={{
                fontFamily: "Avenir Next",
                fontSize: "16px",
                width: "250px",
                borderRadius: "100px",
                letterSpacing: "1.5px",
                textTransform: "none",
                position: "relative",

                marginRight: "30px"
              }}
            >
              Create a Club
            </Link>
            <Link
              className="btn waves-effect waves-light hoverable black-text white accent-3"
              to="/login"
              style={{
                fontFamily: "Avenir Next",
                fontSize: "16px",
                width: "250px",
                borderRadius: "100px",
                letterSpacing: "1.5px",
                textTransform: "none"
              }}
            >
              Join a Club
            </Link>
          </div>
          <div className="column">
            <img
              alt="some alt"
              src={images["laptopandphone.png"]}
              style={{
                position: "relative",
                width: "1200px",
                height: "1100px",
                right: "300px",
                bottom: "430px"
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
