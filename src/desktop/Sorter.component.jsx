import * as React from "react";
import { Row, Col } from "antd";

class Sorter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lowToHighSort: false,
      highToLowSort: false,
      discountSort: false
    };
  }

  handleSorterClick = value => {
    if (value === "highToLow") {
      this.setState({
        lowToHighSort: false,
        highToLowSort: true,
        discountSort: false
      });
    } else if (value === "lowToHigh") {
      this.setState({
        lowToHighSort: true,
        highToLowSort: false,
        discountSort: false
      });
    } else if (value === "discount") {
      this.setState({
        lowToHighSort: false,
        highToLowSort: false,
        discountSort: true
      });
    } else {
      this.setState({
        lowToHighSort: false,
        highToLowSort: false,
        discountSort: false
      });
    }
    this.props.handleSorter(value);
  };
  render() {
    const { lowToHighSort, highToLowSort, discountSort } = this.state;
    return (
      <>
        <Row
          justify="start"
          align="middle"
          style={{ height: "50px", marginBottom: "30px" }}
        >
          <Col
            span={2}
            offset={1}
            style={{
              marginLeft: "34px",
              fontSize: "20px",
              fontWeight: 600
            }}
          >
            Sort By
          </Col>
          <Col
            span={3}
            style={sortStyle}
            onClick={() => this.handleSorterClick("highToLow")}
          >
            <span className={highToLowSort ? "sorter-focus" : ""}>
              Price -- High Low
            </span>
          </Col>
          <Col
            span={3}
            style={sortStyle}
            onClick={() => this.handleSorterClick("lowToHigh")}
          >
            <span className={lowToHighSort ? "sorter-focus" : ""}>
              Price -- Low High
            </span>
          </Col>
          <Col
            span={3}
            style={sortStyle}
            onClick={() => this.handleSorterClick("discount")}
          >
            <span className={discountSort ? "sorter-focus" : ""}>Discount</span>
          </Col>
        </Row>
      </>
    );
  }
}

const sortStyle = {
  color: "#919191",
  fontSiz: "14px",
  fontWeight: 700,
  cursor: "pointer"
};

export default Sorter;
