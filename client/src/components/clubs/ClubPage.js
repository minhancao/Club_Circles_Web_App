import React, { Component } from "react";
import "./ClubPage.css";
import axios from "axios";
import { connect } from "react-redux";
import {
  getClubs,
  getClub,
  putClub,
  deleteClub,
  deleteClubEvent,
  editClub,
  editClubEvent,
  deleteClubAnnouncement,
  deleteClubDiscussion,
  addDiscussionComment,
  deleteClubDiscussionComment,
} from "../../actions/clubActions";
import PropTypes from "prop-types";
import {
  Skeleton,
  Switch,
  Card,
  Avatar,
  Button,
  Icon,
  Comment,
  Tooltip,
  List,
  Form,
  Input,
  Layout,
} from "antd";
import EventModal from "./EventModal";
import AnnouncementModal from "./AnnouncementModal";
import DiscussionModal from "./DiscussionModal";
import CommentModal from "./CommentModal";
import NewModal from "./NewModal";
import moment from "moment";
import { Link } from "react-router-dom";

const { Sider, Content } = Layout;
const { TextArea } = Input;

const { Meta } = Card;

const onMouseOver = (event) => {
  const el = event.target;
  el.style.color = "#40E0D0";
};

const onMouseOut = (event) => {
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
  require.context("../images", false, /\.(png|jpe?g|svg)$/)
);

const imagesUsers = importAll(
  require.context("../images/users", false, /\.(png|jpe?g|svg)$/)
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
    console.log(this.props.match.params.clubId);
    let curr = this.props.match.params.clubId || "";
    this.props.getClubs();
    this.state = {
      display: "home",
      button1: "#C0C0C0",
      button2: "white",
      button3: "white",
      button4: "white",
      button5: "white",
      button6: "white",
      club: {},
      membersArray: [],
      clubId: curr,
      comment: "",
      submitting: false,
      editMode: false,
      clubName: "",
      category: "",
      location: "",
      description: "",
      about: "",
      collapsed: false,
      isDesktop: false,
    };
    this.updatePredicate = this.updatePredicate.bind(this);
  }

  componentDidMount() {
    this.updatePredicate();
    window.addEventListener("resize", this.updatePredicate);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePredicate);
  }

  updatePredicate() {
    this.setState({ isDesktop: window.innerWidth > 1200 });
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  onApplyChanges = (club1) => {
    const item = {
      name: this.state.clubName ? this.state.clubName : club1.name,
      about: this.state.about ? this.state.about : club1.about,
      description: this.state.description
        ? this.state.description
        : club1.description,
      location: this.state.location ? this.state.location : club1.location,
      category: this.state.category ? this.state.category : club1.category,
    };
    this.props.editClub(this.state.clubId, item);
    this.setState({
      editMode: false,
      clubName: "",
      about: "",
      description: "",
      location: "",
      category: "",
    });
  };

  onNewEvent = () => {
    const tempPush = {
      events: {
        name: "TestEvent123",
        dateOfEvent: "2019-06-29",
        description: "Test Event Description",
      },
    };
    this.props.putClub(this.state.clubId, tempPush);
  };

  onNewAnnouncement = () => {
    const tempPush = {
      announcements: {
        name: "Announcement Test",
        announcement: "Announcement description...",
      },
    };
    this.props.putClub(this.state.clubId, tempPush);
  };

  deleteEvent = (id) => {
    this.props.deleteClubEvent(this.state.clubId, id);
  };
  deleteAnnouncement = (id) => {
    this.props.deleteClubAnnouncement(this.state.clubId, id);
  };

  deleteDiscussion = (id) => {
    this.props.deleteClubDiscussion(this.state.clubId, id);
  };

  handleDiscussionCommentChange = (e) => {
    this.setState({ comment: e.target.value });
  };

  handleDiscussionCommentSubmit = (discussionId) => {
    this.setState({ submitting: true });
    setTimeout(() => {
      const { user } = this.props.auth;
      const item = { username: user.name, comment: this.state.comment };
      console.log(this.state.clubId);
      console.log(discussionId);
      this.props.addDiscussionComment(this.state.clubId, discussionId, item);
      this.setState({
        submitting: false,
      });
    }, 1000);
  };

  onDeleteClick = (id) => {
    this.props.deleteClub(id);
  };

  // Render the content
  renderForm = (club1) => {
    // What page should show?
    console.log(club1);
    console.log(this.props.auth);
    switch (this.state.display) {
      case "home":
        return (
          <div //Home
            className="useFont"
            style={{ paddingTop: "33px", color: "grey", fontSize: "18px" }}
          >
            {this.state.editMode &&
            this.props.auth.isAuthenticated &&
            club1.president === this.props.auth.user.name ? (
              <div>
                Club name:{" "}
                <Input
                  defaultValue={club1.name}
                  onChange={(e) => this.setState({ clubName: e.target.value })}
                ></Input>
              </div>
            ) : (
              <b
                style={{ fontWeight: "600", fontSize: "48px", color: "black" }}
              >
                {club1.name}
              </b>
            )}
            <br />
            Category:{" "}
            {this.state.editMode &&
            this.props.auth.isAuthenticated &&
            club1.staff.indexOf(this.props.auth.user.name) > -1 ? (
              <Input
                defaultValue={club1.category}
                onChange={(e) => this.setState({ category: e.target.value })}
              ></Input>
            ) : (
              club1.category
            )}
            <br />
            <br />
            Location:{" "}
            {this.state.editMode &&
            this.props.auth.isAuthenticated &&
            club1.staff.indexOf(this.props.auth.user.name) > -1 ? (
              <Input
                defaultValue={club1.location}
                onChange={(e) => this.setState({ location: e.target.value })}
              ></Input>
            ) : (
              club1.location
            )}{" "}
            <br />
            <br />
            Description:{" "}
            {this.state.editMode &&
            this.props.auth.isAuthenticated &&
            club1.staff.indexOf(this.props.auth.user.name) > -1 ? (
              <Input
                defaultValue={club1.description}
                onChange={(e) => this.setState({ description: e.target.value })}
              ></Input>
            ) : (
              club1.description
            )}
            <br />
            <br />
            {this.state.editMode &&
            this.props.auth.isAuthenticated &&
            club1.staff.indexOf(this.props.auth.user.name) > -1 ? (
              <Button onClick={() => this.onApplyChanges(club1)}>
                Apply Changes
              </Button>
            ) : null}
            {this.state.editMode &&
            this.props.auth.isAuthenticated &&
            club1.president === this.props.auth.user.name ? (
              <Button danger onClick={() => this.onDeleteClick(club1._id)}>
                <Link to={"/clubspage"}>Delete Club</Link>
              </Button>
            ) : null}
          </div>
        );

      case "about":
        return (
          <div //About
            className=" useFont"
            style={{ paddingTop: "20px", color: "grey", fontSize: "18px" }}
          >
            <b style={{ fontWeight: "600", fontSize: "48px", color: "black" }}>
              About
            </b>
            <br />
            Club President: {club1.president}
            <br />
            <br />
            About:{" "}
            {this.state.editMode &&
            this.props.auth.isAuthenticated &&
            club1.staff.indexOf(this.props.auth.user.name) > -1 ? (
              <Input
                defaultValue={club1.about}
                onChange={(e) => this.setState({ about: e.target.value })}
              ></Input>
            ) : (
              club1.about
            )}
            <br />
            <br />
            {this.state.editMode &&
            this.props.auth.isAuthenticated &&
            club1.staff.indexOf(this.props.auth.user.name) > -1 ? (
              <Button onClick={() => this.onApplyChanges(club1)}>
                Apply Changes
              </Button>
            ) : null}
          </div>
        ); //pass method to child

      case "announcements":
        return (
          <div //Announcements
            className=" useFont"
            style={{ paddingTop: "20px", color: "grey", fontSize: "18px" }}
          >
            <b style={{ fontWeight: "600", fontSize: "48px", color: "black" }}>
              Announcements
            </b>
            <br />
            {this.state.editMode &&
            this.props.auth.isAuthenticated &&
            club1.staff.indexOf(this.props.auth.user.name) > -1 ? (
              <NewModal
                clubId={this.state.clubId}
                modalType="announcement"
              ></NewModal>
            ) : null}
            {club1.announcements.map(({ name, announcement, date, _id }) => (
              <Card
                style={{ width: "300", marginTop: 16 }}
                actions={
                  this.state.editMode &&
                  this.props.auth.isAuthenticated &&
                  club1.staff.indexOf(this.props.auth.user.name) > -1
                    ? [
                        <AnnouncementModal
                          name={name}
                          clubId={this.state.clubId}
                          announcementId={_id}
                        ></AnnouncementModal>,
                        <div onClick={() => this.deleteAnnouncement(_id)}>
                          <Icon type="delete"></Icon>
                        </div>,
                      ]
                    : null
                }
              >
                <Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={
                    <div>
                      {name} - Posted on: {date}
                    </div>
                  }
                  description={<div>{announcement}</div>}
                />
              </Card>
            ))}
          </div>
        ); //pass method to child

      case "discussions":
        return (
          <div //Discussions
            className=" useFont"
            style={{ paddingTop: "20px", color: "grey", fontSize: "18px" }}
          >
            <b style={{ fontWeight: "600", fontSize: "48px", color: "black" }}>
              Discussions
            </b>
            {this.state.editMode &&
            this.props.auth.isAuthenticated &&
            club1.staff.indexOf(this.props.auth.user.name) > -1 ? (
              <NewModal
                clubId={this.state.clubId}
                modalType="discussion"
              ></NewModal>
            ) : null}
            <br />
            {club1.discussions.map(
              ({ _id, name, username, discussion, comments, date }) => (
                <Card
                  style={{ width: "300", marginTop: 16 }}
                  actions={
                    this.state.editMode &&
                    this.props.auth.isAuthenticated &&
                    club1.staff.indexOf(this.props.auth.user.name) > -1
                      ? [
                          <DiscussionModal
                            name={name}
                            clubId={this.state.clubId}
                            discussionId={_id}
                          ></DiscussionModal>,
                          <div onClick={() => this.deleteDiscussion(_id)}>
                            <Icon type="delete"></Icon>
                          </div>,
                        ]
                      : null
                  }
                >
                  <Meta
                    title={
                      <div>
                        {name} - Posted by {username} on {date}
                      </div>
                    }
                    description={
                      <div>
                        <div>Discussion: {discussion}</div>
                        <List
                          className="comment-list"
                          header=""
                          itemLayout="horizontal"
                          dataSource={comments}
                          renderItem={(item) => (
                            <li>
                              <Comment
                                actions={
                                  this.props.auth.isAuthenticated &&
                                  item.username === this.props.auth.user.name
                                    ? [
                                        <div style={{ cursor: "pointer" }}>
                                          <CommentModal
                                            clubId={this.state.clubId}
                                            discussionId={_id}
                                            commentId={item._id}
                                          ></CommentModal>
                                        </div>,
                                        <div
                                          style={{ cursor: "pointer" }}
                                          onClick={this.props.deleteClubDiscussionComment.bind(
                                            this,
                                            this.state.clubId,
                                            _id,
                                            item._id
                                          )}
                                        >
                                          <Tooltip title="Delete">
                                            <Icon type="delete"></Icon>
                                          </Tooltip>
                                        </div>,
                                      ]
                                    : null
                                }
                                author={
                                  <div>
                                    {item.username} - Posted on {item.date}
                                  </div>
                                }
                                content={item.comment}
                              />
                            </li>
                          )}
                        />

                        {this.props.auth.isAuthenticated ? (
                          <Comment
                            content={
                              <div>
                                <Form.Item>
                                  <TextArea
                                    rows={4}
                                    onChange={
                                      this.handleDiscussionCommentChange
                                    }
                                  />
                                </Form.Item>
                                <Form.Item>
                                  <Button
                                    htmlType="submit"
                                    loading={this.state.submitting}
                                    onClick={this.handleDiscussionCommentSubmit.bind(
                                      this,
                                      _id
                                    )}
                                    type="primary"
                                  >
                                    Add Comment
                                  </Button>
                                </Form.Item>
                              </div>
                            }
                          />
                        ) : null}
                      </div>
                    }
                  />
                </Card>
              )
            )}
          </div>
        ); //pass method to child

      case "events":
        return (
          <div //Events
            className=" useFont"
            style={{ paddingTop: "20px", color: "grey", fontSize: "18px" }}
          >
            <b style={{ fontWeight: "600", fontSize: "48px", color: "black" }}>
              Events
            </b>
            <br />
            {this.state.editMode &&
            this.props.auth.isAuthenticated &&
            club1.staff.indexOf(this.props.auth.user.name) > -1 ? (
              <NewModal clubId={this.state.clubId} modalType="event"></NewModal>
            ) : null}
            {club1.events.map(
              ({ name, description, dateOfEvent, date, _id }) => (
                <Card
                  style={{ width: "300", marginTop: 16 }}
                  actions={
                    this.state.editMode &&
                    this.props.auth.isAuthenticated &&
                    club1.staff.indexOf(this.props.auth.user.name) > -1
                      ? [
                          <EventModal
                            name={name}
                            clubId={this.state.clubId}
                            eventId={_id}
                          ></EventModal>,
                          <div onClick={() => this.deleteEvent(_id)}>
                            <Icon type="delete"></Icon>
                          </div>,
                        ]
                      : null
                  }
                >
                  <Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={
                      <div>
                        {name} - Posted on {date}
                      </div>
                    }
                    description={
                      <div>
                        <div>Date of Event: {dateOfEvent}</div>
                        <div>Description: {description}</div>
                      </div>
                    }
                  />
                </Card>
              )
            )}
          </div>
        ); //pass method to child

      case "members":
        return (
          <div //Members
            className=" useFont"
            style={{ paddingTop: "20px", color: "grey", fontSize: "18px" }}
          >
            <b style={{ fontWeight: "600", fontSize: "48px", color: "black" }}>
              Members
            </b>
            <br />
            {club1.members.map((member) => (
              <div>
                <img
                  alt="some alt"
                  style={{
                    display: "inline-block",
                    width: "60px",
                    height: "60px",
                    borderRadius: "100%",
                    paddingRight: "5px",
                  }}
                  src={imagesUsers[(member + ".png").toString().toLowerCase()]}
                />
                {member}
              </div>
            ))}
          </div>
        ); //pass method to child

      default:
        return (
          <div //Home
            className=" useFont hide"
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
      button6: "white",
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
      (item) => item._id === this.state.clubId
    );
    return (
      <div>
        {club1 && (
          <div style={{ paddingTop: "58px" }}>
            <Layout>
              <Sider
                width={this.state.isDesktop ? "15%" : "70%"}
                theme="light"
                breakpoint="lg"
                collapsedWidth="0"
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
              >
                <ul style={{ listStyle: "none" }}>
                  {this.props.auth.isAuthenticated &&
                  club1.staff.indexOf(this.props.auth.user.name) > -1 ? (
                    <div>
                      <Switch
                        checked={this.state.editMode}
                        onChange={() =>
                          this.setState({ editMode: !this.state.editMode })
                        }
                      />
                      Edit Mode
                    </div>
                  ) : null}
                  <li>
                    <div
                      className="btn sideMenuBtns"
                      style={{
                        backgroundColor: this.state.button1,
                        boxShadow: "none",
                      }}
                      onMouseEnter={(event) => onMouseOver(event)}
                      onMouseOut={(event) => onMouseOut(event)}
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
                        boxShadow: "none",
                      }}
                      onMouseEnter={(event) => onMouseOver(event)}
                      onMouseOut={(event) => onMouseOut(event)}
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
                        boxShadow: "none",
                      }}
                      onMouseEnter={(event) => onMouseOver(event)}
                      onMouseOut={(event) => onMouseOut(event)}
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
                        boxShadow: "none",
                      }}
                      onMouseEnter={(event) => onMouseOver(event)}
                      onMouseOut={(event) => onMouseOut(event)}
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
                        boxShadow: "none",
                      }}
                      onMouseEnter={(event) => onMouseOver(event)}
                      onMouseOut={(event) => onMouseOut(event)}
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
                        boxShadow: "none",
                      }}
                      onMouseEnter={(event) => onMouseOver(event)}
                      onMouseOut={(event) => onMouseOut(event)}
                      onClick={this.members}
                    >
                      Members
                    </div>
                  </li>
                </ul>
              </Sider>
              <Layout style={{ overflowY: "hidden" }}>
                <Content style={{ margin: "0 16px" }}>
                  <div
                    style={{
                      minHeight: 360,
                      height: "93vh",
                      paddingLeft: "30px",
                    }}
                  >
                    {this.renderForm(club1)}
                  </div>
                </Content>
              </Layout>
            </Layout>
          </div>
        )}
      </div>
    );
  }
}

ClubPage.propTypes = {
  getClubs: PropTypes.func.isRequired,
  getClub: PropTypes.func.isRequired,
  putClub: PropTypes.func.isRequired,
  deleteClub: PropTypes.func.isRequired,
  deleteClubEvent: PropTypes.func.isRequired,
  editClub: PropTypes.func.isRequired,
  editClubEvent: PropTypes.func.isRequired,
  deleteClubAnnouncement: PropTypes.func.isRequired,
  deleteClubDiscussion: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  clubs: state.clubs,
  membersArray: state.clubs.club.members,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getClubs,
  getClub,
  putClub,
  deleteClub,
  deleteClubEvent,
  editClub,
  editClubEvent,
  deleteClubAnnouncement,
  deleteClubDiscussion,
  addDiscussionComment,
  deleteClubDiscussionComment,
})(ClubPage);
