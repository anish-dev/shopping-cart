import * as React from "react";
import { Modal, Radio } from "antd";

class Sorter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lowToHighSort: false,
      highToLowSort: false,
      discountSort: false,
      selectedSorteValue: ""
    };
  }

  selectSorter = e => {
    this.setState({
      selectedSorteValue: e.target.value
    });
  };

  handleSorterClick = () => {
    const value = this.state.selectedSorteValue;
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
    this.props.closeModal();
  };
  closeModal() {
    this.props.closeModal();
  }
  render() {
    return (
      <>
        <Modal
          title="Sort Options"
          centered
          visible={this.props.modalVisible}
          okText="Apply"
          onOk={() => this.handleSorterClick()}
          onCancel={() => this.closeModal()}
        >
          <Radio.Group onChange={this.selectSorter}>
            <Radio style={radioStyle} value={"highToLow"}>
              Price -- High Low
            </Radio>
            <Radio style={radioStyle} value={"lowToHigh"}>
              Price -- Low High
            </Radio>
            <Radio style={radioStyle} value={"discount"}>
              Discount
            </Radio>
          </Radio.Group>
        </Modal>
      </>
    );
  }
}

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px",
  color: "#919191",
  fontSize: "14px",
  fontWeight: 700,
  cursor: "pointer"
};

export default Sorter;
