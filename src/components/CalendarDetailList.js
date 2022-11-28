import React from "react";
import "./Component.css";
import { getUserInfo } from "../utils/open-sf-utils";
class CalendarDetailList extends React.Component {
  //Default Propperties settings
  static defaultProps = {
    post_picture: "",
    post_user_name: "",
    post_date: "",
    post_contents: "",
    schedules: "",
    scheduleUserProfile: "",
  };

  componentDidMount() {
    getUserInfo(this, this.props.schedule.scheduleUserId);
  }

  render() {
    let scheduleId = this.props.schedule.schedule_calendarid.id;
    let scheduleUserId = this.props.schedule.scheduleUserId;
    let writer = this.props.schedule.schedule_calendarid.scheduleMan;
    //프로필 사진 설정 (null 값일 경우 빈값으로 넣는다.)
    let profilePic = this.state === null ? "" : this.state.userPictureInfo[0].data.userProfilePicPath;
    return (
      <div
        className="calendar_list_box"
        data-date-id={scheduleId}
        data-date-writer={writer}
        data-date-userid={scheduleUserId}
        onClick={() => this.props.goDetail(scheduleId, scheduleUserId)}
      >
        <img className="calendar_user_pic" alt="" src={process.env.PUBLIC_URL + profilePic} />
        <div className="calendar_list_txt_box">
          <div className="calendar_user_box">
            <div className="calendar_user_name">{this.props.schedule.scheduleMan}</div>
            <div className="calendar_post_contents">{this.props.schedule.schedule_calendarid.scheduleTitle}</div>
          </div>
        </div>
      </div>
    );
  }
}
export default CalendarDetailList;
