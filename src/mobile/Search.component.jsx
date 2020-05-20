import * as React from "react";
import { Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearchInput: false
    };
  }
  searchClickHandler = () => {
    this.setState({
      showSearchInput: !this.state.showSearchInput
    });
  };
  onSearchInputChangeHandler = e => {
    console.log(e.target.value);
    this.props.onChangeHandler(e.target.value);
  };
  render() {
    const { showSearchInput } = this.state;
    return (
      <>
        <Row>
          <Col className="search-input">
            {showSearchInput && (
              <input
                type="text"
                name="search"
                onChange={this.onSearchInputChangeHandler}
                placeholder="Search by name"
                autoComplete="off"
              />
            )}
          </Col>
          <Col>
            <SearchOutlined
              onClick={this.searchClickHandler}
              style={{ fontSize: "24px", color: "#fff", cursor: "pointer" }}
            />
          </Col>
        </Row>
      </>
    );
  }
}

export default Search;
