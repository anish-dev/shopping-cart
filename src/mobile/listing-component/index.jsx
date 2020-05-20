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
            <Col xs={10} offset={1} style={{ marginBottom: "20px" }}>
              <Item item={item} addToCart={props.addToCart} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default ListingComponent;
