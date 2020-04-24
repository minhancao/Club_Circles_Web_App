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
  Tooltip,
} from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editClubDiscussionComment } from "../../actions/clubActions";
import { USER_LOADING } from "../../actions/types";

class CommentModal extends Component {
  state = {
    visible: false,
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
      console.log(this.props);
      const editItem = {
        username: user.name,
        comment: values.comment,
      };
      console.log(editItem);
      // Add item via addItem action
      this.props.editClubDiscussionComment(
        this.props.clubId,
        this.props.discussionId,
        this.props.commentId,
        editItem
      );

      // Close modal
      this.handleCancel();
      form.resetFields();
      message.success("Comment successfully editted!");
    });
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  render() {
    const { name, clubId, eventId } = this.props;
    const CollectionCreateForm = Form.create({ name: "form_in_modal" })(
      class extends React.Component {
        render() {
          const { visible, onCancel, onCreate, form, user } = this.props;
          const { getFieldDecorator } = form;
          return (
            <Modal
              visible={visible}
              title={"Editting Comment"}
              okText="Confirm"
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
                <Form.Item label="Comment">
                  {getFieldDecorator("comment")(<Input type="textarea" />)}
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
          <Tooltip title="Edit">
            <Icon type="edit" />
          </Tooltip>
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
CommentModal.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.item,
  auth: state.auth,
});

export default connect(mapStateToProps, { editClubDiscussionComment })(
  CommentModal
);
