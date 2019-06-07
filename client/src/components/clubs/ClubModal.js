import React, { Component } from "react";
import { Button, Modal, Form, Input } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addClub } from "../../actions/clubActions";

class ClubModal extends Component {
  state = {
    modal: false,
    name: "",
    description: "",
    category: "",
    location: ""
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { user } = this.props.auth;
    const newItem = {
      name: this.state.name,
      description: this.state.description,
      category: this.state.category,
      location: this.state.location,
      president: user.name,
      staff: [user.name],
      members: [user.name, "minhancao", "ryanhong", "randytau"]
    };

    // Add item via addItem action
    this.props.addClub(newItem);

    // Close modal
    this.toggle();
  };

  render() {
    return (
      <div style={{ paddingTop: "100px", paddingLeft: "30px" }}>
        <button
          className="btn"
          href="#"
          style={{
            boxShadow: "none",
            borderRadius: "10px",
            backgroundColor: "#FF5A60"
          }}
          onClick={this.toggle}
        >
          Add a Club
        </button>

        <Modal isOpen={this.state.modal} toggle={this.toggle} style={{}}>
          <ModalHeader toggle={this.toggle}>Add To Clubs List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Club</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add a club name"
                  onChange={this.onChange}
                />
                <Input
                  type="text"
                  name="description"
                  id="item2"
                  placeholder="Add a description"
                  onChange={this.onChange}
                />
                <Input
                  type="text"
                  name="category"
                  id="item3"
                  placeholder="Add a category"
                  onChange={this.onChange}
                />
                <Input
                  type="text"
                  name="location"
                  id="item4"
                  placeholder="Add a club location"
                  onChange={this.onChange}
                />
                <Button
                  className="flow-text grey-text text-darken-1"
                  color="dark"
                  style={{
                    marginTop: "2rem",
                    backgroundColor: "red",
                    color: "white",
                    textTransform: "none"
                  }}
                >
                  Add Club
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
ClubModal.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addClub }
)(ClubModal);
