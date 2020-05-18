import * as React from "react";
import { Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

const Cart = props => {
  return (
    <>
      <Badge count={props.cartValue}>
        <ShoppingCartOutlined
          style={{ fontSize: "24px", color: "#fff", cursor: "pointer" }}
        />
      </Badge>
    </>
  );
};

export default Cart;
