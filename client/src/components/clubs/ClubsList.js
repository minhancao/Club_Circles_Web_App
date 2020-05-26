import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getClubs,
  deleteClub,
  getClub,
  editClub,
} from "../../actions/clubActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../../App.css";
import { Card, Icon, Avatar, Row, Col, message } from "antd";
import ClubModal from "./ClubModal";

const { Meta } = Card;

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

const onMouseOver2 = (event) => {
  const el = event.target;
  el.style.opacity = "0.6";
};

const onMouseOut2 = (event) => {
  const el = event.target;
  el.style.opacity = "1.0";
};

class ClubsList extends Component {
  componentDidMount() {
    this.props.getClubs();
  }

  onDeleteClick = (id) => {
    this.props.deleteClub(id);
  };

  onGoClick = (id) => {
    console.log(this.props.clubs.club.members);
  };

  onRequestToJoin = (club) => {
    var joinArr = club.joinRequests ? club.joinRequests : [];
    joinArr.push(this.props.auth.user.name);
    const item = {
      joinRequests: joinArr,
    };
    this.props.editClub(club._id, item);
    message.success("Requested to join club " + club.name);
  };

  render() {
    console.log(this.props.auth);
    const { clubs } = this.props.clubs;
    return (
      <div
        style={{
          maxWidth: "1920px",
          paddingTop: "75px",
          marginRight: "50px",
          marginLeft: "80px",
          width: "auto",
        }}
      >
        <div>
          <h3>My Clubs</h3>
          <p>
            Manage your clubs by creating a new club, leaving a club, or editing
            a club.
          </p>
        </div>

        {this.props.auth.isAuthenticated ? <ClubModal></ClubModal> : null}

        <Row gutter={[16, 16]}>
          {clubs.map(
            ({
              _id,
              name,
              description,
              category,
              location,
              members,
              joinRequests,
            }) => (
              <Col xs={24} sm={24} md={12} lg={12} xl={8} key={_id}>
                <Card
                  style={{ maxWidth: "80%", marginBottom: "20px" }}
                  cover={
                    <img
                      alt="some alt"
                      src={images["los_angeles.jpeg"]}
                      style={{ width: "100%", height: "auto" }}
                    />
                  }
                  actions={
                    this.props.auth.isAuthenticated &&
                    joinRequests &&
                    joinRequests.indexOf(this.props.auth.user.name) < 0 &&
                    members &&
                    members.indexOf(this.props.auth.user.name) < 0
                      ? [
                          <Link
                            onClick={this.onGoClick.bind(this, _id)}
                            to={"/ClubPage/" + _id}
                            className="btn"
                          >
                            Go To Club
                          </Link>,
                          <a
                            onClick={() =>
                              this.onRequestToJoin({
                                _id,
                                name,
                                description,
                                category,
                                location,
                                members,
                                joinRequests,
                              })
                            }
                          >
                            Request to Join
                          </a>,
                        ]
                      : [
                          <Link
                            onClick={this.onGoClick.bind(this, _id)}
                            to={"/ClubPage/" + _id}
                            className="btn"
                          >
                            Go To Club
                          </Link>,
                        ]
                  }
                >
                  <Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={name}
                    description={
                      <div>
                        <span className="card-title">{name}</span>
                        <p className="w3-opacity">Category: {category}</p>
                        <p className="w3-opacity">Location: {location}</p>
                        <p style={{ marginTop: "20px" }}>{description}</p>
                      </div>
                    }
                  />
                </Card>
              </Col>
            )
          )}
        </Row>
      </div>
    );
  }
}

ClubsList.propTypes = {
  getClubs: PropTypes.func.isRequired,
  getClub: PropTypes.func.isRequired,
  deleteClub: PropTypes.func.isRequired,
  editClub: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  clubs: state.clubs,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getClubs,
  deleteClub,
  getClub,
  editClub,
})(ClubsList);
