import React, { Component } from "react";
import { connect } from "react-redux";
import { getClubs, deleteClub, getClub } from "../../actions/clubActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../../App.css";
import { Card, Icon, Avatar, Row, Col } from "antd";
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

const onMouseOver2 = event => {
  const el = event.target;
  el.style.opacity = "0.6";
};

const onMouseOut2 = event => {
  const el = event.target;
  el.style.color = "white";
  el.style.opacity = "1.0";
};

class ClubsList extends Component {
  componentDidMount() {
    this.props.getClubs();
  }

  onDeleteClick = id => {
    this.props.deleteClub(id);
  };

  onGoClick = id => {
    this.props.getClub(id);
    console.log(this.props.clubs.club.members);
  };

  render() {
    const { clubs } = this.props.clubs;
    return (
      <div className="w3-content w3-padding" style={{ maxWidth: "1920px" }}>
        <div className="w3-container w3-padding-32" id="about">
          <h3 className="w3-border-bottom w3-border-light-grey w3-padding-16">
            My Clubs
          </h3>
          <p>
            Manage your clubs by creating a new club, leaving a club, or editing
            a club.
          </p>
        </div>

        <ClubModal></ClubModal>

        <Row>
          {clubs.map(
            ({ _id, name, description, category, location, members }) => (
              <Col span={8} key={_id}>
                <Card
                  style={{ width: 300 }}
                  cover={
                    <img
                      alt="some alt"
                      src={images["los_angeles.jpeg"]}
                      style={{ width: "100%", height: "auto" }}
                    />
                  }
                  actions={[
                    <Link
                      onClick={this.onGoClick.bind(this, _id)}
                      to={{
                        pathname: "/ClubPage",
                        clubId: _id
                      }}
                      style={{
                        fontFamily: "Avenir Next",
                        fontWeight: "600",
                        backgroundColor: "#40E0D0",
                        width: "160px",
                        height: "35px",
                        borderRadius: "100px",
                        letterSpacing: "1.5px",
                        textTransform: "none",
                        boxShadow: "none"
                      }}
                      className="btn"
                      onMouseEnter={event => onMouseOver2(event)}
                      onMouseOut={event => onMouseOut2(event)}
                    >
                      Go To Club
                    </Link>,
                    <Icon type="edit" />,
                    <Icon type="ellipsis" />
                  ]}
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
  getClub: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  clubs: state.clubs
});

export default connect(
  mapStateToProps,
  { getClubs, deleteClub, getClub }
)(ClubsList);
