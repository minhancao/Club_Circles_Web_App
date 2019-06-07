import React, { Component } from "react";
import ClubsList from "./components/clubs/ClubsList";
import ClubModal from "./components/clubs/ClubModal";
import "./App.css";

class ClubsPage extends Component {
  render() {
    return (
      <div className="App">
        <div className="leftCol">
          <ClubModal className="leftCol" />
        </div>
        <div>
          <ClubsList className="rightCol" />
        </div>
      </div>
    );
  }
}

export default ClubsPage;
