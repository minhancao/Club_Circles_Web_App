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
          <Content style={{ padding: "0 0px" }}>
            <div style={{ background: "#fff", padding: 0, minHeight: 280 }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Club Circles ©2019 Created by minhancao
          </Footer>
        </Layout>
      </div>
    );
  }
}

export default CustomLayout;
