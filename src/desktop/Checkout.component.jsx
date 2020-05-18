import * as React from "react";
import { Row, Col } from "antd";

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //   valueRange: this.props.range
    };
  }

  render() {
    return (
      <>
        <Row>
          <Col></Col>
        </Row>
        <Row>
          <Col>first</Col>
          <Col>second</Col>
        </Row>
      </>
    );
  }
}

export default Checkout;
