import React from "react";
import "./Component.css";
class OpenSFSearch extends React.Component {
  static defaultProps = {
    placeholder: "텍스트를 입력해주세요.",
  };
  render() {
    return (
      <div className="search_bar">
        <div>
          <input type="text" placeholder={this.props.placeholder}></input>
        </div>
        <div className="search_btn_box">
          <div className="search_txt_clear">x</div>
          <div className="search_btn">search</div>
        </div>
      </div>
    );
  }
}
export default OpenSFSearch;
