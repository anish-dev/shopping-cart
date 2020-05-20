import * as React from "react";
import { Row, Col } from "antd";

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: props.cartItems
    };
  }
  calculatePriceDetails = items => {
    let itemCount = 0;
    let totalDiscount = 0;
    let totalPrice = 0;
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      itemCount += item.count;
      totalPrice += item.item.price.display * item.count;
      totalDiscount +=
        (item.item.price.display - item.item.price.actual) * item.count;
    }
    let total = totalPrice - totalDiscount;
    let countResult = itemCount + " " + (itemCount > 1 ? "items" : "item");
    return [countResult, totalDiscount, totalPrice, total];
  };
  render() {
    const { cartItems } = this.state;
    const [
      countResult,
      totalDiscount,
      totalPrice,
      total
    ] = this.calculatePriceDetails(cartItems);
    console.log("cartItems", cartItems);
    if (cartItems.length === 0) {
      this.props.backToMainPage();
      return null;
    }
    return (
      <>
        <Row style={{ height: "50px" }}>
          <Col
            span={4}
            offset={2}
            style={{
              fontSize: "16px",
              fontWeight: 600,
              cursor: "pointer",
              paddingTop: "80px"
            }}
            onClick={this.props.backToMainPage}
          >
            {"<"}Back
          </Col>
        </Row>
        <Row
          style={{ background: "#f1f3f6", paddingTop: "80px" }}
          justify="space-around"
        >
          <Col span={20}>
            {cartItems.map(item => {
              const count = item.count;
              item = item.item;
              return (
                <Row
                  align="middle"
                  style={{
                    background: "#fff",
                    marginBottom: "10px",
                    padding: "10px",
                    border: "1px solid #a5a5a5"
                  }}
                >
                  <Col span={8}>
                    <img src={item.image} alt="" style={{ height: "130px" }} />
                  </Col>
                  <Col xs={14} style={{ marginTop: "10px" }}>
                    <Row style={{ marginBottom: "10px" }}>
                      <Col>{item.name}</Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <span style={{ fontWeight: 600 }}>
                          &#8377;{item.price.actual}
                        </span>
                        <span
                          style={{
                            fontWeight: 600,
                            fontSize: "12px",
                            color: "#8d8d8d",
                            marginLeft: "4px",
                            textDecoration: "line-through"
                          }}
                        >
                          {item.price.display}
                        </span>
                      </Col>
                      <Col span={12} style={{ textAlign: "right" }}>
                        <span
                          style={{
                            fontSize: "12px",
                            width: "100%",
                            fontWeight: 600,
                            color: "#8d8d8d"
                          }}
                        >
                          {item.discount}% off
                        </span>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "10px" }}>
                      <Col offset={1}>
                        <Row>
                          <Col
                            onClick={() =>
                              this.props.updateItemCount("subtract", item)
                            }
                            style={styles.counterSign}
                          >
                            -
                          </Col>
                          <Col style={styles.count}>{count}</Col>
                          <Col
                            onClick={() =>
                              this.props.updateItemCount("add", item)
                            }
                            style={styles.counterSign}
                          >
                            +
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "10px" }}>
                      <Col
                        style={{ fontWeight: 700, cursor: "pointer" }}
                        offset={1}
                        onClick={() => this.props.removeItem(item, count)}
                      >
                        Remove
                      </Col>
                    </Row>
                  </Col>
                </Row>
              );
            })}
          </Col>
          <Col
            span={20}
            style={{
              background: "#fff",
              border: "1px solid #a5a5a5",
              height: "196px",
              marginBottom: "10px"
            }}
          >
            <Row style={styles.priceDetailsTitle}>
              <Col>PRICE DETAILS</Col>
            </Row>
            <Row style={styles.priceDiscountRow}>
              <Col span={12}>Price({countResult})</Col>
              <Col>:</Col>
              <Col span={10} style={{ textAlign: "right" }}>
                &#8377;{totalPrice}
              </Col>
            </Row>
            <Row style={styles.priceDiscountRow}>
              <Col span={12}>Discount</Col>
              <Col>:</Col>
              <Col span={10} style={{ textAlign: "right" }}>
                &#8377;{totalDiscount}
              </Col>
            </Row>
            <Row style={styles.totalRow}>
              <Col span={13}>Total Payable</Col>
              <Col span={10} style={{ textAlign: "right" }}>
                &#8377;{total}
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    );
  }
}

const styles = {
  counterSign: {
    border: "1px solid #9d9d9d",
    borderRadius: "59px",
    width: "29px",
    textAlign: "center",
    fontSize: "18px",
    marginRight: "10px",
    color: "#9d9d9d",
    fontWeight: 500,
    cursor: "pointer"
  },
  count: {
    border: "1px solid #9d9d9d",
    width: "25px",
    textAlign: "center",
    height: "27px",
    marginRight: "10px",
    fontWeight: 600
  },
  priceDetailsTitle: {
    height: "41px",
    borderBottom: "1px solid #eaeaea",
    color: "#969696",
    fontWeight: 600,
    padding: "7px",
    fontSize: "16px"
  },
  priceDiscountRow: {
    height: "40px",
    padding: "7px",
    marginTop: "10px"
  },
  totalRow: {
    height: "50px",
    padding: "7px",
    borderTop: "1px solid #a5a5a5",
    fontWeight: 600
  }
};

export default Checkout;
