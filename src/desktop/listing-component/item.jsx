import * as React from "react";
import { Row, Col, Button } from "antd";

const Item = props => {
  let item = props.item;
  const addToCart = item => {
    props.addToCart(item);
  };
  return (
    <>
      <Row>
        <Col>
          <img
            src={item.image}
            alt=""
            style={{ width: "100%", height: "209px" }}
          />
          <div style={{ fontWeight: 500, marginTop: "2px" }}>{item.name}</div>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <span style={{ fontWeight: 600 }}>&#8377;{item.price.actual}</span>
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
      <Row justify="center" style={{ marginTop: "12px" }}>
        <Col className="add-to-cart-btn">
          <Button
            onClick={() => addToCart(item)}
            shape="round"
            style={{
              background: "#edb046",
              fontSize: "12px",
              fontWeight: 600
            }}
          >
            Add to Cart
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Item;
