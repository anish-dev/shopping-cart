import * as React from "react";
import { Row, Col, Layout, Slider, Button } from "antd";

const { Sider } = Layout;

class SideFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueRange: [1000, 100000]
    };
  }
  handleChange = value => {
    this.setState({
      valueRange: value
    });
  };
  handleFilterChange = () => {
    this.props.filterHandler(this.state.valueRange);
  };
  render() {
    return (
      <>
        <Sider
          style={{
            background: "transparent",
            border: "1px solid #d4d5de",
            paddingTop: "80px",
            paddingLeft: "12px"
          }}
        >
          <div style={{ fontSize: "16px", fontWeight: 700 }}>Filters</div>
          <Row
            justify="space-between"
            style={{ marginRight: "15px", marginTop: "15px" }}
          >
            <Col style={{ color: "#919191" }}>
              &#8377;{this.state.valueRange[0]}
            </Col>
            <Col style={{ color: "#919191" }}>
              &#8377;{this.state.valueRange[1]}
            </Col>
          </Row>
          <Row>
            <Col span={22}>
              <Slider
                range
                step={100}
                defaultValue={this.state.valueRange}
                onChange={this.handleChange}
                value={this.state.valueRange}
                min={1000}
                max={100000}
              />
            </Col>
          </Row>
          <Row justify="center">
            <Col style={{ marginTop: "-10px", color: "#919191" }}>Price</Col>
          </Row>
          <Row justify="center" style={{ marginTop: "15px" }}>
            <Col>
              <Button
                onClick={this.handleFilterChange}
                type="primary"
                style={{ borderRadius: "20px", fontWeight: 700 }}
              >
                Apply
              </Button>
            </Col>
          </Row>
        </Sider>
      </>
    );
  }
}

export default SideFilter;
