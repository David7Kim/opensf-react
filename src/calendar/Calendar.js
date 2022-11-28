import React from "react";
import "./Calendar.css";
import moment from "moment";

class DateHeader extends React.Component {
  dateToArray = (dates) => {
    if (Array.isArray(dates)) {
      return dates;
    } else if (typeof dates === "string") {
      return dates.split(",");
    } else {
      return ["일", "월", "화", "수", "목", "금", "토"];
    }
  };

  mapArrayToDate = (dateArray) => {
    try {
      if (dateArray.length !== 7) {
        // console.log(new Error("dates props must be had 7 date"));
        dateArray = ["일", "월", "화", "수", "목", "금", "토"];
      }

      return dateArray.map((date, index) => {
        const className = () => {
          let className = "calendar_date";
          if (index === 0) {
            return className + " date-sun";
          } else if (index === 6) {
            return className + " date-sat";
          } else {
            return className + " date-weekday";
          }
        };
        return (
          <div className={className()} key={"RCA-header-" + date}>
            {date}
          </div>
        );
      });
    } catch {
      throw new Error("날짜는 String 또는 컴포넌트가 되어야 합니다.");
    }
  };

  render() {
    return <div className="cal_head">{this.mapArrayToDate(this.dateToArray(this.props.dates))}</div>;
  }
}
//주
class Week extends React.Component {
  state = {};
  Days = (firstDayFormat, WeekIndex) => {
    const _days = [];

    for (let i = 0; i < 7; i++) {
      const Day = moment(firstDayFormat).add("d", i);
      _days.push({
        yearMonthDayFormat: Day.format("YYYY-MM-DD"),
        getDay: Day.format("D"),
        isHolyDay: false,
        WeekIndex,
      });
    }

    return _days;
  };

  mapDaysToComponents = (Days, calendarMonthYear, selectedDayFormat, fn = () => {}) => {
    //selected 되어진 월로 비교하여 스타일을 적용합니다.
    const thisMonth = moment(selectedDayFormat);
    return Days.map((dayInfo, i) => {
      let className = "date-weekday-label";

      if (!thisMonth.isSame(dayInfo.yearMonthDayFormat, "month")) {
        className = "date-notThisMonth";
      } else if (i === 0) {
        className = "date-sun";
      } else if (i === 6) {
        className = "date-sat";
      }
      if (moment(dayInfo.yearMonthDayFormat).isSame(selectedDayFormat, "day")) {
        className = "selected";
      }

      return (
        <div
          className={"cal_list_item " + className}
          key={`RCA-${dayInfo.WeekIndex}-${i}-day`}
          onClick={() => fn(dayInfo.yearMonthDayFormat)}
          onDoubleClick={(e) => console.log(dayInfo.yearMonthDayFormat)}
        >
          <label className="cal_list_item-label">{dayInfo.getDay}</label>

          {/* <label className="RCA-calendar-day">{dayInfo.getDay}</label> */}
        </div>
      );
    });
  };
  render() {
    return (
      <div className="calendar_week">
        {this.mapDaysToComponents(
          this.Days(this.props.firstDayOfThisWeekformat, this.props.weekIndex),
          this.props.ymOfThisCalendar,
          this.props.selected,
          this.props.fn
        )}
      </div>
    );
  }
}

export default class Calendar extends React.Component {
  Weeks = (monthYear, selected, clickFn) => {
    const firstDayOfMonth = moment(monthYear).startOf("month");
    const firstDateOfMonth = firstDayOfMonth.get("d");
    const firstDayOfWeek = firstDayOfMonth.clone().add("d", -firstDateOfMonth);
    const _Weeks = [];

    for (let i = 0; i < 6; i++) {
      _Weeks.push(
        <Week
          key={`calendar-week-${i}`}
          firstDayOfThisWeekformat={firstDayOfWeek
            .clone()
            .add("d", i * 7)
            .format("YYYY-MM-DD")}
          selected={selected}
          fn={clickFn}
        />
      );
    }
    return _Weeks;
  };

  render() {
    return (
      <div className="calendar-container">
        <DateHeader dates={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]} />
        {this.Weeks(this.props.YM, this.props.selected, this.props.changeSelected)}
      </div>
    );
  }
}
