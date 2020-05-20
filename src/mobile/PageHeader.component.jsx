import * as React from "react";
import { Row, Col, Layout } from "antd";
import { StarFilled } from "@ant-design/icons";
import Search from "./Search.component";
import Cart from "./Cart.component";

const { Header } = Layout;

class PageHeader extends React.Component {
  cartCheckoutHandler = () => {
    this.props.cartCheckoutPageHandler();
  };
  render() {
    const { cartValue } = this.props;
    return (
      <>
        <Header
          style={{
            background: "#354da5",
            position: "fixed",
            zIndex: 1,
            padding: "4px 20px",
            width: "100%"
          }}
        >
          <Row justify="space-between">
            <Col xs={2} span={8}>
              <StarFilled style={{ fontSize: "28px", color: "#f1ce4d" }} />
            </Col>
            <Col>
              <Row style={{ marginRight: "20px" }}>
                <Col style={{ marginRight: "12px" }}>
                  {this.props.showSearch && (
                    <Search onChangeHandler={this.props.onChangeHandler} />
                  )}
                </Col>
                <Col onClick={this.cartCheckoutHandler}>
                  <Cart cartValue={cartValue} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Header>
      </>
    );
  }
}

export default PageHeader;
