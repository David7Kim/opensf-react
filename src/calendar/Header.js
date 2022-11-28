import React from "react";
import "./Calendar.css";
export default class Header extends React.Component {
  render() {
    return (
      <div className="header_box">
        <div
          className="prevBtn"
          onClick={() => {
            this.props.moveMonth(-1);
          }}
        >
          <img src={require("../images/b_back-30.png")} />
        </div>
        <div className="calendar_header">{this.props.calendarMonth}</div>
        <div
          className="nextBtn"
          onClick={() => {
            this.props.moveMonth(+1);
          }}
        >
          <img src={require("../images/b_next-30.png")} />
        </div>
      </div>
    );
  }
}
