import React from "react";

import moment from "moment";
import Header from "./Header";
import Calendar from "./Calendar";
import CalendarDetailList from "../components/CalendarDetailList";
import { useNavigate } from "react-router-dom";
import { getUserSession } from "../utils/open-sf-utils";
import { getUserInfo } from "../utils/open-sf-utils";
import CalendarAddPop from "../calendar/CalendarAddPop";
import CalendarModifyPop from "../calendar/CalendarModifyPop";

import "./Calendar.css";
import axios from "axios";

export function withNavigation(Component) {
  return (props) => <Component {...props} navigate={useNavigate()} />;
}

class CalendarApp extends React.Component {
  //Default state 설정
  state = {
    calendarMonth: moment(),
    today: moment(),
    selected: moment().format("YYYY-MM-DD"),
    selectedDate: moment().format("YYYY-MM-DD"),
    popupState: false,
    detailState: false,
    scheduleId: "",
    scheduleUserId: "",
  };

  static defaultProps = {
    clickFn: () => {},
  };
  componentDidMount() {
    //렌더시 현재요일의 스케줄 리스트를 가져옵니다.
    this.goToday();
  }
  //Calendar item Click시 날짜 변경
  changeSelected = (clickedDate) => {
    if (moment(clickedDate).isSame(this.state.selected, "day")) {
      this.props.clickFn(clickedDate);

      return;
    }
    //state setting
    this.setState({
      selected: clickedDate,
      selectedDate: clickedDate,
    });
    //properties clickFn settings
    this.props.clickFn(clickedDate);

    if (moment(clickedDate).isBefore(this.state.calendarMonth, "month")) {
      this.moveMonth(-1);
    } else if (moment(clickedDate).isAfter(this.state.calendarMonth, "month")) {
      this.moveMonth(1);
    }
    this.getSelectedDateList(clickedDate);
  };
  //캘린더 리스트를 가져옵니다
  getSelectedDateList = (selectedDate) => {
    let url = "/calendar/list/" + selectedDate;
    axios.get(url, {}).then((res) => {
      this.setState({ scheduleList: res.data });
    });
  };

  //캘린더 날짜를 변경합니다.
  moveMonth = (month) => {
    this.setState({
      calendarMonth: this.state.calendarMonth.add(month, "M"),
      selected: this.state.calendarMonth.startOf("month").format("YYYY-MM-DD"),
      selectedDate: this.state.calendarMonth.startOf("month").format("YYYY-MM-DD"),
    });
    this.getSelectedDateList(this.state.calendarMonth.format("YYYY-MM-DD"));
  };

  //스케줄 일정 클릭시 팝업
  // CalendarDetailList  -> calendarApp state값 넘겨주기
  onSeeDetailPop = (e) => {
    console.log(e.currentTarget);
    this.state.detail = true;
  };

  //오늘 날짜로 이동
  goToday = () => {
    this.setState({
      calendarMonth: moment(),
      selected: moment().format("YYYY-MM-DD"),
      selectedDate: moment().format("YYYY-MM-DD"),
    });
    this.getSelectedDateList(moment().format("YYYY-MM-DD"));
  };

  //스케줄 아이디 설정
  //일정 자세히 보기 (팝업)
  goDetail = (sheculdeId, scheduleUserId) => {
    this.setState({ detailState: true });
    this.setState({ scheduleId: sheculdeId });
    this.setState({ scheduleUserId: scheduleUserId });
  };

  //일정 보기 취소 (팝업 close)
  closeDetail = () => {
    this.setState({ detailState: false });
  };

  //메인 홈으로 이동
  goHome = () => {
    this.props.navigate("/home");
  };
  goLogin = () => {
    this.props.navigate("/login");
  };
  //일정 추가 화면 이동
  goAdd = () => {
    this.setState({ popupState: true });
  };

  closeAdd = () => {
    this.setState({ popupState: false });
    //close 될때 뭔가 refresh 되긴 해야 하는데 팝업에서 등록후 realtime으로 get할수 있는게 필요함...
    // this.props.navigate("/calendar");
    window.location.reload();
  };
  //setModifyData
  setModify = (value) => {
    this.setState({ modifyState: value });
  };
  render() {
    //여기에서도 로그인 세션이 없을경우 로그인 페이지로 넘겨줘야함
    // let userInfo = getUserSession();
    // if (userInfo.userInfo.length === 0 || userInfo.userInfo.data === "") {
    //   this.goLogin();
    // }
    return (
      <div>
        {/**캘린더 등록 버튼 클릭시 캘린더 팝업 보여줌*/}
        {this.state.popupState === true && <CalendarAddPop closeAdd={this.closeAdd} />}
        {/**캘린더 수정 버튼 클릭시 캘린더 팝업 보여줌*/}
        {this.state.detailState === true && (
          <CalendarModifyPop
            detailState={this.state.detailState}
            closeDetail={this.closeDetail}
            scheduleId={this.state.scheduleId}
            scheduleUserId={this.state.scheduleUserId}
          />
        )}
        <div className="calendar_box">
          {/* <div className="calendar_box" onLoad={this.goToday}> */}
          {/**캘린더 상단 타이틀, 오늘버튼,홈버튼*/}
          <div className="cal_header">
            <div className="menu_bar">
              <div className="btn_home" onClick={this.goHome}>
                <img src={require("../images/w_back-30.png")}></img>
              </div>
              <div className="menu_title">일정 목록</div>
              <div className="menu_today" onClick={this.goToday}>
                오늘
              </div>
            </div>
            {/**캘린더 현재월 표시*/}
            <div className="cal_title">
              <Header
                calendarMonth={this.state.calendarMonth.format("YYYY년 MM월")}
                today={this.state.today.format("YYYY-MM-DD")}
                moveMonth={this.moveMonth}
              />
            </div>
            {/**캘린더 표시*/}
            <Calendar YM={this.state.calendarMonth.format("YYYY-MM-DD")} selected={this.state.selected} changeSelected={this.changeSelected} />
          </div>
          {/**캘린더 일정 리스트 표시*/}
          <div className="cal_detail">
            <div className="cal_detail_title">
              <div className="selectedDate">{this.state.selectedDate}</div>
            </div>
            <div className="cal_detail_contents">
              {this.state.scheduleList &&
                this.state.scheduleList.map((schedule) => (
                  <CalendarDetailList
                    deleteState={this.deleteSchedule}
                    goDetail={this.goDetail}
                    schedule={schedule}
                    modifyState={this.setModify}
                    key={schedule.id}
                  />
                ))}
            </div>
          </div>
          {/**캘린더 등록 버튼*/}
          <div onClick={this.goAdd}>
            <div className="addCalendar">+</div>
            {/*이미지 버튼으롤 변경 add.png */}
          </div>
        </div>
      </div>
    );
  }
}
export default withNavigation(CalendarApp);
