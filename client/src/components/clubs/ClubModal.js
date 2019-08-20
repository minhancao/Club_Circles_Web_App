import React, { Component } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Icon,
  Checkbox,
  Radio,
  message
} from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addClub } from "../../actions/clubActions";
import { USER_LOADING } from "../../actions/types";

class ClubModal extends Component {
  state = {
    visible: false,
    name: "",
    description: "",
    category: "",
    location: "",
    currentUser: this.props.auth.user
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
      const newItem = {
        name: values.name,
        description: values.description,
        category: values.category,
        location: values.location,
        president: user.name,
        staff: [user.name],
        members: [user.name, "minhancao", "ryanhong", "randytau"]
      };

      // Add item via addItem action
      this.props.addClub(newItem);

      // Close modal
      this.handleCancel();
      form.resetFields();
      message.success("Club " + values.name + " successfully created!");
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
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
    this.handleCancel();
  };

  render() {
    const CollectionCreateForm = Form.create({ name: "form_in_modal" })(
      class extends React.Component {
        render() {
          const { visible, onCancel, onCreate, form, user } = this.props;
          const { getFieldDecorator } = form;
          return (
            <Modal
              visible={visible}
              title="Create a new club"
              okText="Create"
              onCancel={onCancel}
              onOk={onCreate}
            >
              <Form layout="vertical">
                <Form.Item label="President">
                  <Input
                    type="textarea"
                    disabled="true"
                    value={user.user.name ? user.user.name : ""}
                  />
                </Form.Item>
                <Form.Item label="Name">
                  {getFieldDecorator("name", {
                    rules: [
                      {
                        required: true,
                        message: "Please input the title of the club!"
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
                <Form.Item label="Description">
                  {getFieldDecorator("description")(<Input type="textarea" />)}
                </Form.Item>
                <Form.Item label="Category">
                  {getFieldDecorator("category")(<Input type="textarea" />)}
                </Form.Item>
                <Form.Item label="Location">
                  {getFieldDecorator("location")(<Input type="textarea" />)}
                </Form.Item>

                <Form.Item label="About">
                  {getFieldDecorator("about")(<Input type="textarea" />)}
                </Form.Item>
                <Form.Item className="collection-create-form_last-form-item">
                  {getFieldDecorator("modifier", {
                    initialValue: "public"
                  })(
                    <Radio.Group>
                      <Radio value="public">Public</Radio>
                      <Radio value="private">Private</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
              </Form>
            </Modal>
          );
        }
      }
    );
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Create New Club
        </Button>
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
