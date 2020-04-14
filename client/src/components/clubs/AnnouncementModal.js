import React, { Component } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Icon,
  Checkbox,
  Radio,
  message,
} from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editClubAnnouncement } from "../../actions/clubActions";
import { USER_LOADING } from "../../actions/types";

class AnnouncementModal extends Component {
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
      const editItem = {
        name: values.name,
        announcement: values.announcement,
      };

      // Add item via addItem action
      this.props.editClubAnnouncement(
        this.props.clubId,
        this.props.announcementId,
        editItem
      );

      // Close modal
      this.handleCancel();
      form.resetFields();
      message.success("Event " + values.name + " successfully editted!");
    });
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { user } = this.props.auth;
    const newItem = {
      name: this.state.name,
      description: this.state.description,
      category: this.state.category,
      location: this.state.location,
      president: user.name,
      staff: [user.name],
      members: [user.name, "minhancao", "ryanhong", "randytau"],
    };

    // Add item via addItem action
    this.props.addClub(newItem);

    // Close modal
    this.handleCancel();
  };

  render() {
    const { name, clubId, eventId } = this.props;
    const CollectionCreateForm = Form.create({ name: "form_in_modal" })(
      class extends React.Component {
        render() {
          const { visible, onCancel, onCreate, form } = this.props;
          const { getFieldDecorator } = form;
          return (
            <Modal
              visible={visible}
              title={"Editting Announcement: " + name}
              okText="Confirm"
              onCancel={onCancel}
              onOk={onCreate}
            >
              <Form layout="vertical">
                <Form.Item label="Name">
                  {getFieldDecorator("name")(<Input type="textarea" />)}
                </Form.Item>
                <Form.Item label="Announcement">
                  {getFieldDecorator("announcement")(<Input type="textarea" />)}
                </Form.Item>
              </Form>
            </Modal>
          );
        }
      }
    );
    return (
      <div>
        <div onClick={this.showModal}>
          <Icon type="edit" />
        </div>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          user={this.props.auth ? this.props.auth : null}
        />
      </div>
    );
  }
}
AnnouncementModal.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.item,
  auth: state.auth,
});

export default connect(mapStateToProps, { editClubAnnouncement })(
  AnnouncementModal
);
