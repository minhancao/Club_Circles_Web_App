import React, { Component } from "react";
import ClubsList from "./components/clubs/ClubsList";
import ClubModal from "./components/clubs/ClubModal";
import "./App.css";

class ClubsPage extends Component {
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

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };
  render() {
    return (
      <div className="App">
        
        <div>
          <ClubsList className="rightCol" />
        </div>
      </div>
    );
  }
}

export default ClubsPage;
