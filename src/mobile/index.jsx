import * as React from "react";
import { Row, Col, Layout, message } from "antd";
import PageHeader from "./PageHeader.component";
import Filter from "./Filter.component";
import Sorter from "./Sorter.component";
import {
  CaretUpOutlined,
  CaretDownOutlined,
  FilterFilled
} from "@ant-design/icons";
import ListingComponent from "./listing-component";
import Checkout from "./Checkout.component";
const { Content } = Layout;

class MobileShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
      cartItems: [],
      cartValue: 0,
      filterRange: [1000, 100000],
      sortState: null,
      searchText: "",
      onCheckoutPage: false,
      isFilterVisible: false,
      isSorterVisible: false
    };
  }

  handlePriceFilter = range => {
    if (!range) {
      range = this.state.filterRange;
    }
    let items = [...this.props.items];
    let filteredItems = items.filter(
      item => item.price.actual >= range[0] && item.price.actual <= range[1]
    );
    this.setState(
      {
        items: filteredItems,
        filterRange: range
      },
      () => {
        this.handleSorter();
        this.onSearchInputChangeHandler();
      }
    );
    console.log("filter", range);
  };

  addToCartHandler = item => {
    let { cartValue, cartItems } = this.state;
    cartValue++;
    if (cartItems.length > 0) {
      let itemFound = false;
      for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].item.name === item.name) {
          cartItems[i].count++;
          itemFound = true;
          break;
        }
      }
      if (!itemFound) {
        cartItems.push({
          item: item,
          count: 1
        });
      }
    } else {
      cartItems.push({
        item: item,
        count: 1
      });
    }
    this.setState({
      cartValue,
      cartItems: cartItems
    });
    message.success("Added to cart successfully", 1);
  };

  handleSorter = value => {
    if (!value) {
      value = this.state.sortState;
    }
    let items = [...this.state.items];
    if (value === "highToLow") {
      items.sort((a, b) =>
        a.price.actual > b.price.actual
          ? -1
          : b.price.actual > a.price.actual
          ? 1
          : 0
      );
    } else if (value === "lowToHigh") {
      items.sort((a, b) =>
        a.price.actual > b.price.actual
          ? 1
          : b.price.actual > a.price.actual
          ? -1
          : 0
      );
    } else if (value === "discount") {
      items.sort((a, b) =>
        a.discount > b.discount ? 1 : b.discount > a.discount ? -1 : 0
      );
    }

    this.setState({
      items: items,
      sortState: value
    });
  };

  onSearchInputChangeHandler = value => {
    if (!value) {
      value = this.state.searchText;
    }
    let range = this.state.filterRange;
    let items = [...this.props.items];
    let priceFilterAppliedItems = items.filter(
      item => item.price.actual >= range[0] && item.price.actual <= range[1]
    );
    let filteredItems = priceFilterAppliedItems.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    this.setState(
      {
        items: filteredItems,
        searchText: value
      },
      () => {
        this.handleSorter();
      }
    );
  };

  cartCheckoutPageHandler = () => {
    console.log(this.state.cartItems);
    let cartItems = [...this.state.cartItems];
    if (cartItems.length > 0) {
      this.setState({
        onCheckoutPage: true
      });
    }
  };

  backToMainPage = () => {
    console.log("inside back function");
    this.setState({
      onCheckoutPage: false
    });
  };

  removeItem = (item, count) => {
    let { cartItems, cartValue } = this.state;
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].item.name === item.name) {
        cartValue = cartValue - count;
        cartItems.splice(i, 1);
        break;
      }
    }
    this.setState({
      cartValue,
      cartItems
    });
  };

  updateItemCount = (type, item) => {
    let { cartItems, cartValue } = this.state;
    let indexOfitem = null;
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].item.name === item.name) {
        indexOfitem = i;
        break;
      }
    }
    if (type === "subtract") {
      cartItems[indexOfitem].count -= 1;
      cartValue -= 1;
      if (cartItems[indexOfitem].count === 0) {
        cartItems.splice(indexOfitem, 1);
      }
    } else if (type === "add") {
      cartItems[indexOfitem].count += 1;
      cartValue += 1;
    }
    this.setState({
      cartValue,
      cartItems
    });
  };

  openFilterModal = () => {
    this.setState({
      isFilterVisible: true
    });
  };

  openSorterModal = () => {
    this.setState({
      isSorterVisible: true
    });
  };

  closeModal = () => {
    this.setState({
      isFilterVisible: false,
      isSorterVisible: false
    });
  };

  render() {
    const {
      items,
      cartValue,
      onCheckoutPage,
      cartItems,
      isFilterVisible,
      isSorterVisible
    } = this.state;
    return (
      <>
        <Layout>
          <PageHeader
            cartValue={cartValue}
            onChangeHandler={this.onSearchInputChangeHandler}
            showSearch={!onCheckoutPage}
            cartCheckoutPageHandler={this.cartCheckoutPageHandler}
          />
          <Layout style={{ background: "#f1f3f6" }}>
            {!onCheckoutPage && isFilterVisible && (
              <Filter
                closeModal={this.closeModal}
                modalVisible={isFilterVisible}
                range={this.state.filterRange}
                filterHandler={this.handlePriceFilter}
              />
            )}
            <Row style={{ marginTop: "85px" }} justify="space-between">
              <Col xs={10} offset={1}>
                <Row>
                  <Col>
                    <CaretUpOutlined />
                    <CaretDownOutlined />
                  </Col>
                  <Col
                    onClick={this.openSorterModal}
                    style={{ fontWeight: 600 }}
                  >
                    Sort
                  </Col>
                </Row>
              </Col>
              <Col xs={6}>
                <Row>
                  <Col>
                    <FilterFilled />
                  </Col>
                  <Col
                    style={{ fontWeight: 600 }}
                    onClick={this.openFilterModal}
                  >
                    Filter
                  </Col>
                </Row>
              </Col>
            </Row>

            <Content style={{ paddingTop: "15px" }}>
              {!onCheckoutPage && (
                <>
                  {isSorterVisible && (
                    <Sorter
                      modalVisible={isSorterVisible}
                      closeModal={this.closeModal}
                      handleSorter={this.handleSorter}
                    />
                  )}
                  <ListingComponent
                    items={items}
                    addToCart={this.addToCartHandler}
                  />
                </>
              )}
              {onCheckoutPage && (
                <Checkout
                  updateItemCount={this.updateItemCount}
                  removeItem={this.removeItem}
                  backToMainPage={this.backToMainPage}
                  cartItems={cartItems}
                />
              )}
            </Content>
          </Layout>
          {/* <Footer>Footer</Footer> */}
        </Layout>
      </>
    );
  }
}

export default MobileShoppingCart;
