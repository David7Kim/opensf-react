import React from "react";
import "./Component.css";

class OpenSfModal extends React.Component {
  static defaultProps = {
    title: "타이틀",
    contents: "",
    confirm: "확인",
    cancel: "취소",
    display: "none",
  };
  render() {
    return (
      <div className="m_pop_box">
        <div className="m_header">
          <div className="m_header m_txt">{this.props.title}</div>
        </div>
        <div className="m_contents">{this.props.contents}</div>
        <div className="m_footer">
          <div className="m_close_btn">X</div>
          <div className="confirm_btn">
            <a>{this.props.confirm}</a>
          </div>
          <div className="cancel_btn">
            <a>{this.props.cancel}</a>
          </div>
        </div>
      </div>
    );
  }
}
export default OpenSfModal;
