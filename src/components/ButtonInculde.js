import React from "react";
import "./Component.css";
class ButtonAdd extends React.Component {
  static defaultProps = {
    name: "추가",
  };
  render() {
    return (
      <div className="btn_include">
        <a>{this.props.name}</a>
      </div>
    );
  }
}
export default ButtonAdd;
