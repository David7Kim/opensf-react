import React from "react";

class ButtonConfirm extends React.Component {
  static defaultProps = {
    name: "확인",
  };
  render() {
    return <div className="btn_confirm">{this.props.name}</div>;
  }
}
export default ButtonConfirm;
