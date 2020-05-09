import React from "react";
import { Layout } from "antd";
import ToggleNavbar from "./navbar/ToggleNavbar";

const { Content, Footer } = Layout;

class CustomLayout extends React.Component {
  render() {
    return (
      <div>
        <Layout className="layout">
          <ToggleNavbar />
          <Content style={{ padding: "0 0px", backgroundColor: "#40E0D0" }}>
            <div style={{ background: "#fff", padding: 0, minHeight: 280 }}>
              {this.props.children}
            </div>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default CustomLayout;
