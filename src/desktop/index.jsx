import * as React from "react";
import { Layout, message } from "antd";
import PageHeader from "../common/PageHeader.component";
import SideFilter from "./SideFilter.component";
import Sorter from "./Sorter.component";
import ListingComponent from "../common/listing-component";
const { Content } = Layout;

class DesktopShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
      cartItems: [],
      cartValue: 0,
      sortState: null
    };
  }

  handlePriceFilter = range => {
    let items = [...this.props.items];
    let filteredItems = items.filter(
      item => item.price.actual >= range[0] && item.price.actual <= range[1]
    );
    this.setState(
      {
        items: filteredItems
      },
      () => {
        this.handleSorter();
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

  render() {
    const { items, cartValue } = this.state;
    return (
      <>
        <Layout>
          <PageHeader cartValue={cartValue} />
          <Layout style={{ height: "100vh", background: "#f1f3f6" }}>
            <SideFilter filterHandler={this.handlePriceFilter} />
            <Content style={{ paddingTop: "80px" }}>
              <Sorter handleSorter={this.handleSorter} />
              <ListingComponent
                items={items}
                addToCart={this.addToCartHandler}
              />
            </Content>
          </Layout>
          {/* <Footer>Footer</Footer> */}
        </Layout>
      </>
    );
  }
}

export default DesktopShoppingCart;
