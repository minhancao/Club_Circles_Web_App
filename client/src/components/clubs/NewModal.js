import React, { Component } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { putClub } from "../../actions/clubActions";

const { TextArea } = Input;

class NewModal extends Component {
  state = {
    visible: false,
    name: "",
    description: "",
    category: "",
    location: "",
    currentUser: this.props.auth.user,
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      const { user } = this.props.auth;
      let newItem = {};

      if (this.props.modalType === "discussion") {
        newItem = {
          discussions: {
            username: user.name,
            name: values.name,
            discussion: values.discussion,
            comments: [],
          },
        };
      }

      if (this.props.modalType === "event") {
        newItem = {
          events: {
            name: values.name,
            dateOfEvent: values.dateOfEvent,
            description: values.description,
          },
        };
      }

      if (this.props.modalType === "announcement") {
        newItem = {
          announcements: {
            name: values.name,
            announcement: values.announcement,
          },
        };
      }

      // Add item via addItem action
      this.props.putClub(this.props.clubId, newItem);

      // Close modal
      this.handleCancel();
      form.resetFields();
      message.success(
        this.props.modalType + " " + values.name + " successfully created!"
      );
    });
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  render() {
    const DiscussionModalForm = Form.create({ name: "form_in_modal" })(
      class extends React.Component {
        render() {
          const { visible, onCancel, onCreate, form, user } = this.props;
          const { getFieldDecorator } = form;
          return (
            <Modal
              visible={visible}
              title="New discussion"
              okText="Create"
              onCancel={onCancel}
              onOk={onCreate}
            >
              <Form layout="vertical">
                <Form.Item label="Posting user">
                  <Input
                    type="textarea"
                    disabled="true"
                    value={user.user.name ? user.user.name : ""}
                  />
                </Form.Item>
                <Form.Item label="Topic">
                  {getFieldDecorator("name", {
                    rules: [
                      {
                        required: true,
                        message: "Please input the topic of the discussion!",
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
                <Form.Item label="Discussion">
                  {getFieldDecorator("discussion")(<TextArea rows={4} />)}
                </Form.Item>
              </Form>
            </Modal>
          );
        }
      }
    );

    const EventModalForm = Form.create({ name: "form_in_modal" })(
      class extends React.Component {
        render() {
          const { visible, onCancel, onCreate, form, user } = this.props;
          const { getFieldDecorator } = form;
          return (
            <Modal
              visible={visible}
              title="New event"
              okText="Create"
              onCancel={onCancel}
              onOk={onCreate}
            >
              <Form layout="vertical">
                <Form.Item label="Posting user">
                  <Input
                    type="textarea"
                    disabled="true"
                    value={user.user.name ? user.user.name : ""}
                  />
                </Form.Item>
                <Form.Item label="Name of Event">
                  {getFieldDecorator("name", {
                    rules: [
                      {
                        required: true,
                        message: "Please input the topic of the event!",
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
                <Form.Item label="Date of Event">
                  {getFieldDecorator("dateOfEvent")(<Input></Input>)}
                </Form.Item>
                <Form.Item label="Description">
                  {getFieldDecorator("description")(<Input></Input>)}
                </Form.Item>
              </Form>
            </Modal>
          );
        }
      }
    );

    const AnnouncementModalForm = Form.create({ name: "form_in_modal" })(
      class extends React.Component {
        render() {
          const { visible, onCancel, onCreate, form, user } = this.props;
          const { getFieldDecorator } = form;
          return (
            <Modal
              visible={visible}
              title="New announcement"
              okText="Create"
              onCancel={onCancel}
              onOk={onCreate}
            >
              <Form layout="vertical">
                <Form.Item label="Posting user">
                  <Input
                    type="textarea"
                    disabled="true"
                    value={user.user.name ? user.user.name : ""}
                  />
                </Form.Item>
                <Form.Item label="Name of Announcement">
                  {getFieldDecorator("name", {
                    rules: [
                      {
                        required: true,
                        message: "Please input the topic of the announcement!",
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
                <Form.Item label="Announcement">
                  {getFieldDecorator("announcement")(<Input></Input>)}
                </Form.Item>
              </Form>
            </Modal>
          );
        }
      }
    );

    return (
      <div>
        {this.props.modalType === "discussion" ? (
          <div>
            <Button type="primary" onClick={this.showModal}>
              New Discussion
            </Button>
            <DiscussionModalForm
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              user={this.props.auth ? this.props.auth : null}
            />
          </div>
        ) : null}
        {this.props.modalType === "event" ? (
          <div>
            <Button type="primary" onClick={this.showModal}>
              New Event
            </Button>
            <EventModalForm
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              user={this.props.auth ? this.props.auth : null}
            />
          </div>
        ) : null}
        {this.props.modalType === "announcement" ? (
          <div>
            <Button type="primary" onClick={this.showModal}>
              New Announcement
            </Button>
            <AnnouncementModalForm
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              user={this.props.auth ? this.props.auth : null}
            />
          </div>
        ) : null}
      </div>
    );
  }
}
NewModal.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.item,
  auth: state.auth,
});

export default connect(mapStateToProps, { putClub })(NewModal);
