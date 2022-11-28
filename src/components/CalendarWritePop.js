import React from "react";
import "./Component.css";
class CalendarWritePop extends React.Component {
  render() {
    return (
      <div className="m_pop_box">
        <div className="m_header">
          <div className="m_header m_txt">확인</div>
        </div>
        <div className="m_contents"></div>
        <div className="m_footer">
          <div className="m_close_btn">X</div>
          <span className="confirm_btn">
            <a>확인</a>
          </span>
          <span className="cancel_btn">
            <a>취소</a>
          </span>
        </div>
      </div>
    );
  }
}
export default CalendarWritePop;
