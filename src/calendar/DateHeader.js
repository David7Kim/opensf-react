import React from "react";

export default class DateHeader extends React.Component {
  dateToArray = (dates) => {
    if (Array.isArray(dates)) {
      return dates;
    } else if (typeof dates == "string") {
      return dates.split(",");
    } else {
      return ["일", "월", "화", "수", "목", "금", "토"];
    }
  };
}
