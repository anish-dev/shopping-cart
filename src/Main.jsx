import React from "react";
import DesktopShoppingCart from "./desktop/index";
import MobileShoppingCart from "./mobile/index";

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      width: window.innerWidth,
      cartValue: 0,
      cartItems: []
    };
  }

  componentWillMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  componentDidMount() {
    fetch(`./cart.json`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    const { width, data } = this.state;
    const isMobile = width <= 500;
    if (data) {
      if (isMobile) {
        return (
          <div style={{ background: "#f1f3f6" }}>
            <MobileShoppingCart items={data.items} />
          </div>
        );
      } else {
        return (
          <>
            <DesktopShoppingCart items={data.items} />
          </>
        );
      }
    } else {
      return null;
    }
  }
}

export default Main;
