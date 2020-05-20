import * as React from "react";
import { Row, Col } from "antd";
import Item from "./item";

const ListingComponent = props => {
  const { items } = props;
  return (
    <>
      <Row>
        {items.map(item => {
          return (
            <Col span={3} offset={2} style={{ marginBottom: "20px" }}>
              <Item item={item} addToCart={props.addToCart} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default ListingComponent;
