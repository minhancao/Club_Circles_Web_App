import React, { Component } from "react";
import "./App.css";
import "./ClubPage.css";
import axios from "axios";
import { connect } from "react-redux";
import { getClub, putClub } from "./actions/clubActions";
import PropTypes from "prop-types";
import { Button } from "antd";

const onMouseOver = event => {
  const el = event.target;
  el.style.color = "#40E0D0";
};

const onMouseOut = event => {
  const el = event.target;
  el.style.color = "black";
};

function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const images = importAll(
  require.context("./components/images", false, /\.(png|jpe?g|svg)$/)
);

const imagesUsers = importAll(
  require.context("./components/images/users", false, /\.(png|jpe?g|svg)$/)
);

class ClubPage extends Component {
  componentDidUpdate() {
    /* const { data } = this.props.location;
    var mongoose = require("mongoose");
    var id = mongoose.Types.ObjectId(data);
    this.props.getClub("5c3054f92788ce52ddbb1ccb");
    console.log(this.props.club); */
    /* axios.get(`/api/clubs/${id}`).then(res => {
      const specificClub = res.data;
      this.setState({ club: specificClub });
      this.setState({ membersArray: specificClub.members });
    }); */
  }

  constructor(props) {
    super(props);
    this.state = {
      display: "home",
      button1: "#C0C0C0",
      button2: "white",
      button3: "white",
      button4: "white",
      button5: "white",
      button6: "white",
      club: {},
      membersArray: []
    }; //this is how you set up state
  }

  componentDidMount() {}

  onNewEvent = () => {
    const tempPush = {
      events: {
        name: "TestEvent123",
        dateOfEvent: "2019-06-29",
        description: "Test Event Description"
      }
    };
    this.props.putClub(this.props.location.clubId, tempPush);
  };

  onNewAnnouncement = () => {
    const tempPush = {
      announcements: {
        name: "Announcement Test",
        announcement: "Announcement description..."
      }
    };
    this.props.putClub(this.props.location.clubId, tempPush);
  };

  // Render the content
  renderForm = () => {
    // What page should show?
    const club1 = this.props.clubs.clubs.find(
      item => item._id === this.props.location.clubId
    );
    console.log(club1);
    console.log(this.props.auth);
    switch (this.state.display) {
      case "home":
        return (
          <div //Home
            className="halfCol useFont"
            style={{ paddingTop: "33px", color: "grey", fontSize: "18px" }}
          >
            {this.props.auth.isAuthenticated &&
            this.props.auth.user.name == club1.president ? (
              <button>Edit Club</button>
            ) : null}
            {club1.category} <br />
            <b style={{ fontWeight: "600", fontSize: "48px", color: "black" }}>
              {club1.name}
            </b>
            <br />
            Location: {club1.location} <br />
            <br />
            About: <br />
            <br />
            {club1.description}
          </div>
        );

      case "about":
        return (
          <div //About
            className="halfCol useFont"
            style={{ paddingTop: "20px", color: "grey", fontSize: "18px" }}
          >
            <b style={{ fontWeight: "600", fontSize: "48px", color: "black" }}>
              About
            </b>
            <br />
            Club President: {club1.president}
            <br />
            <br />
            {club1.about}
          </div>
        ); //pass method to child

      case "announcements":
        return (
          <div //Announcements
            className="halfCol useFont"
            style={{ paddingTop: "20px", color: "grey", fontSize: "18px" }}
          >
            <b style={{ fontWeight: "600", fontSize: "48px", color: "black" }}>
              Announcements
            </b>
            <br />
            <Button onClick={this.onNewAnnouncement}>New Announcement</Button>
            {club1.announcements.map(({ name, announcement }) => (
              <div>
                <div>Name: {name}</div>
                <div>Announcement: {announcement}</div>
                <br />
              </div>
            ))}
          </div>
        ); //pass method to child

      case "discussions":
        return (
          <div //Discussions
            className="halfCol useFont"
            style={{ paddingTop: "20px", color: "grey", fontSize: "18px" }}
          >
            <b style={{ fontWeight: "600", fontSize: "48px", color: "black" }}>
              Discussions
            </b>
            <br />
            doiasjfioajfiaojfioajfioa sjfioasj fioaehgiu aehgu iah iuah uiahgau
            ighaiu hga iugha iu aiuhkdlfjakdjfad fadhuig hu
          </div>
        ); //pass method to child

      case "events":
        return (
          <div //Events
            className="halfCol useFont"
            style={{ paddingTop: "20px", color: "grey", fontSize: "18px" }}
          >
            <b style={{ fontWeight: "600", fontSize: "48px", color: "black" }}>
              Events
            </b>
            <br />
            <Button onClick={this.onNewEvent}>New Event</Button>
            {club1.events.map(({ name, description, dateOfEvent }) => (
              <div>
                <div>Event: {name}</div>
                <div>Description: {description}</div>
                <div>Date of Event: {dateOfEvent}</div>
                <br />
              </div>
            ))}
          </div>
        ); //pass method to child

      case "members":
        return (
          <div //Members
            className="halfCol useFont"
            style={{ paddingTop: "20px", color: "grey", fontSize: "18px" }}
          >
            <b style={{ fontWeight: "600", fontSize: "48px", color: "black" }}>
              Members
            </b>
            <br />
            doiasjfioajfiaojfioajfioa sjfioasj fioaehgiu aehgu iah iuah uiahgau
            ighaiu hga iugha iu aiuhkdlfjakdjfad fadhuig hu
          </div>
        ); //pass method to child

      default:
        return (
          <div //Home
            className="halfCol useFont hide"
            style={{ paddingTop: "20px", color: "grey", fontSize: "18px" }}
          >
            Student Organization <br />
            <b style={{ fontWeight: "600", fontSize: "48px", color: "black" }}>
              {club1.name}
            </b>
            <br />
            Location: San Jose State University <br />
            <br />
            About: <br />
            <br />
            {club1.description}
          </div>
        );
    }
  };

  whiteButtons = () => {
    this.setState({
      button1: "white",
      button2: "white",
      button3: "white",
      button4: "white",
      button5: "white",
      button6: "white"
    });
  };
  // Create a function that will update the state in parent
  home = () => {
    this.whiteButtons();
    this.setState({ display: "home", button1: "#C0C0C0" });
  };
  about = () => {
    this.whiteButtons();
    this.setState({ display: "about", button2: "#C0C0C0" });
  };
  announcements = () => {
    this.whiteButtons();
    this.setState({ display: "announcements", button3: "#C0C0C0" });
  };
  discussions = () => {
    this.whiteButtons();
    this.setState({ display: "discussions", button4: "#C0C0C0" });
  };
  events = () => {
    this.whiteButtons();
    this.setState({ display: "events", button5: "#C0C0C0" });
  };
  members = () => {
    this.whiteButtons();
    this.setState({ display: "members", button6: "#C0C0C0" });
  };
  render() {
    const club1 = this.props.clubs.clubs.find(
      item => item._id === this.props.location.clubId
    );
    return (
      <div>
        {this.props.clubs && (
          <div className="clubPageContainer" style={{ paddingTop: "80px" }}>
            <div className="header">
              <h1
                style={{
                  paddingTop: "50px",
                  fontFamily: "Avenir Next",
                  color: "grey",
                  zoom: 0.8
                }}
              >
                {club1.name}
              </h1>
              <img
                alt="some alt"
                style={{
                  marginTop: "20px",
                  width: "150px",
                  height: "160px"
                }}
                src={images["clublogo.png"]}
              />
              <img
                alt="some alt"
                style={{
                  marginTop: "45px",

                  width: "1100px",
                  height: "390px"
                }}
                src={images["citynight.jpg"]}
              />
            </div>
            <div className="leftSidebar">
              <ul style={{ listStyle: "none" }}>
                <li>
                  <div
                    className="btn "
                    style={{
                      fontSize: "17px",
                      backgroundColor: this.state.button1,
                      width: "175px",
                      height: "30px",
                      borderRadius: "10px",
                      textTransform: "none",
                      boxShadow: "none",
                      textAlign: "left",
                      color: "black"
                    }}
                    onMouseEnter={event => onMouseOver(event)}
                    onMouseOut={event => onMouseOut(event)}
                    onClick={this.home}
                  >
                    {" "}
                    Home
                  </div>
                </li>
                <li style={{ paddingTop: "10px" }}>
                  <div
                    className="btn sideMenuBtns"
                    href="#"
                    style={{
                      backgroundColor: this.state.button2,
                      boxShadow: "none"
                    }}
                    onMouseEnter={event => onMouseOver(event)}
                    onMouseOut={event => onMouseOut(event)}
                    onClick={this.about}
                  >
                    About
                  </div>
                </li>
                <li style={{ paddingTop: "10px" }}>
                  <div
                    className="btn sideMenuBtns"
                    href="#"
                    style={{
                      backgroundColor: this.state.button3,
                      boxShadow: "none"
                    }}
                    onMouseEnter={event => onMouseOver(event)}
                    onMouseOut={event => onMouseOut(event)}
                    onClick={this.announcements}
                  >
                    Announcements
                  </div>
                </li>
                <li style={{ paddingTop: "10px" }}>
                  <div
                    className="btn sideMenuBtns"
                    href="#"
                    style={{
                      backgroundColor: this.state.button4,
                      boxShadow: "none"
                    }}
                    onMouseEnter={event => onMouseOver(event)}
                    onMouseOut={event => onMouseOut(event)}
                    onClick={this.discussions}
                  >
                    Discussions
                  </div>
                </li>
                <li style={{ paddingTop: "10px" }}>
                  <div
                    className="btn sideMenuBtns"
                    href="#"
                    style={{
                      backgroundColor: this.state.button5,
                      boxShadow: "none"
                    }}
                    onMouseEnter={event => onMouseOver(event)}
                    onMouseOut={event => onMouseOut(event)}
                    onClick={this.events}
                  >
                    Events
                  </div>
                </li>
                <li style={{ paddingTop: "10px" }}>
                  <div
                    className="btn sideMenuBtns"
                    href="#"
                    style={{
                      backgroundColor: this.state.button6,
                      boxShadow: "none"
                    }}
                    onMouseEnter={event => onMouseOver(event)}
                    onMouseOut={event => onMouseOut(event)}
                    onClick={this.members}
                  >
                    Members
                  </div>
                </li>
              </ul>
            </div>

            <div className="content">{this.renderForm()}</div>

            <div
              className="rightSidebar useFont"
              style={{
                fontSize: "24px",
                fontWeight: "500",
                color: "grey",
                paddingTop: "50px"
              }}
            >
              Members
              <br />
              <div style={{ display: "inline-block" }}>
                {this.props.membersArray &&
                  this.props.membersArray.map(member => (
                    <img
                      alt="some alt"
                      style={{
                        display: "inline-block",
                        width: "60px",
                        height: "60px",
                        borderRadius: "100%",
                        paddingRight: "5px"
                      }}
                      src={
                        imagesUsers[(member + ".png").toString().toLowerCase()]
                      }
                    />
                  ))}
              </div>
              <div className="circle" style={{ display: "inline-block" }}>
                +
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

ClubPage.propTypes = {
  getClub: PropTypes.func.isRequired,
  putClub: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  clubs: state.clubs,
  membersArray: state.clubs.club.members,
  auth: state.auth
});

export default connect(mapStateToProps, { getClub, putClub })(ClubPage);
