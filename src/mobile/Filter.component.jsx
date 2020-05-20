import * as React from "react";
import { Row, Col, Slider, Button, Modal } from "antd";

// const { Sider } = Layout;

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueRange: this.props.range
    };
  }
  handleChange = value => {
    this.setState({
      valueRange: value
    });
  };
  handleFilterChange = () => {
    this.props.filterHandler(this.state.valueRange);
    this.props.closeModal();
  };
  closeModal() {
    this.props.closeModal();
  }
  render() {
    return (
      <>
        <Modal
          title="Filter Options"
          centered
          visible={this.props.modalVisible}
          okText="Apply"
          onOk={() => this.handleFilterChange(false)}
          onCancel={() => this.closeModal()}
        >
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
          {/* <Row justify="center" style={{ marginTop: "15px" }}>
            <Col>
              <Button
                onClick={this.handleFilterChange}
                type="primary"
                style={{ borderRadius: "20px", fontWeight: 700 }}
              >
                Apply
              </Button>
            </Col>
          </Row> */}
        </Modal>
        {/* <Sider
          style={{
            background: "transparent",
            border: "1px solid #d4d5de",
            paddingTop: "80px",
            paddingLeft: "12px"
          }}
        >
          <div style={{ fontSize: "16px", fontWeight: 700 }}>Filters</div>
        </Sider> */}
      </>
    );
  }
}

export default Filter;
