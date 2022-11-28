import React from "react";
import { useState, useEffect } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Calendar.css";

function CalendarAddPop({ closeAdd }) {
  //Layout label 값
  let defaultSettings = {
    calTitle: "일정등록",
    calConfirmBtn: "확인",
    calScheduleTitle: "일정명",
    startDateTitle: "시작",
    endDateTitle: "종료",
    attendenceTitle: "참석자",
    display: "false",
  };

  //State 선언
  const [userInfo, setUserInfo] = useState([]); //사용자 계정 정보
  const [scheduleTitle, setScheduleTitle] = useState(""); //스케줄 제목
  const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD")); //시작일자
  const [startTime, setStartTime] = useState(moment().format("HH:mm")); //시작시간
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD")); //종료일자
  const [endTime, setEndTime] = useState(moment().format("HH:mm")); //종료시간
  const [attendence, setAttendence] = useState(""); //참석자
  const [contents, setContents] = useState(""); //내용

  const navigate = useNavigate();

  //Input값 Change 이벤트 함수

  //스케줄 제목 변경감지
  const onChageSchedule = (e) => {
    setScheduleTitle(e.currentTarget.value);
  };
  //스케줄 시작일자 변경감지
  const onChageStartDate = (e) => {
    if (startDate > endDate) {
      setStartDate(moment().format("YYYY-MM-DD"));
    } else {
      setStartDate(e.currentTarget.value);
    }
  };
  //스케줄 시작시간 변경감지
  const onChageStartTime = (e) => {
    setStartTime(e.currentTarget.value);
  };
  //스케줄 종료일자 변경감지
  const onChageEndDate = (e) => {
    if (endDate < startDate) {
      setEndDate(startDate);
    } else {
      setEndDate(e.currentTarget.value);
    }
  };
  //스케줄 종료시간 변경감지
  const onChageEndTime = (e) => {
    setEndTime(e.currentTarget.value);
  };
  //스케줄 참석자 변경감지
  const onChageAttendence = (e) => {
    setAttendence(e.currentTarget.value);
  };
  //스케줄 내용 변경감지
  const onChageContents = (e) => {
    setContents(e.currentTarget.value);
  };
  //세션유저를 가져와 셋팅
  useEffect(() => {
    let url = "/userinfo";
    const fetchData = async () => {
      const result = await axios.get(url);
      //사용자 정보가 없을경우 로그인 페이지로 이동
      if (
        result.data === "" ||
        result.data.userProfileId.userAccount === "" ||
        result.data.userProfileId.userAccount === undefined ||
        result.length === 0
      ) {
        navigate("/login");
      } else {
        //사용자 정보를 세팅

        setUserInfo(result);
        console.log(result);
      }
    };
    fetchData();
  }, []);
  const addSchedule = () => {
    let baseUrl = "/calendar/add/schedule";

    //validate조건이 true일 경우에 axios통신을 한다.
    // if (validate() == true) {
    if (validate() === true) {
      axios
        .post(baseUrl, {
          title: scheduleTitle, //스케줄 제목
          contents: contents, //스케줄 내용
          schedule_ownder: userInfo.data.userProfileId.userAccount, //스케줄 작성자 계정
          userid: userInfo.data.userProfileId.id, //스케줄 작성자 id값
          attendence: attendence, // 스케줄 참석자
          startDate: startDate, // 스케줄 시작일자
          startTime: startTime, // 스케줄 시작 시간
          endDate: endDate, // 스케줄 종료일자
          endTime: endTime, // 스케줄 종료시간
        })
        .then((resp) => {
          if (resp.data === "SUCCESS") {
            closeAdd();
            //아닐 경우 Fail 리턴 , FailMessgae출력
          } else if (resp.data === "FAIL") {
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //일정등록시 필요한 Validate 함수
  const validate = () => {
    let codeType = true;
    if (scheduleTitle === "") {
      console.log("scheduleTitle 값을 입력 해주세요.");
      codeType = false;
    } else if (startDate === "") {
      console.log("startDate 값을 입력 해주세요.");
      codeType = false;
    } else if (startTime === "") {
      console.log("startTime 값을 입력 해주세요.");
      codeType = false;
    } else if (endDate === "") {
      console.log("endDate 값을 입력 해주세요.");
      codeType = false;
    } else if (endTime === "") {
      console.log("endTime 값을 입력 해주세요.");
      codeType = false;
    } else if (attendence === "") {
      console.log("attendence 값을 입력 해주세요.");
      codeType = false;
    } else if (contents === "") {
      console.log("contents 값을 입력 해주세요.");
      codeType = false;
    }
    return codeType;
  };

  return (
    <div className="add_box">
      <div className="calendar_add_box">
        <div className="cal_add_header">
          <div className="menu_bar">
            {/**캘린더 상단 제목, 취소,확인버튼 */}
            <div className="cal_add_ico_cancel" onClick={closeAdd}>
              X
            </div>
            <div className="menu_title">{defaultSettings.calTitle}</div>
            <div className="cal_add_confirm_btn" onClick={addSchedule}>
              {defaultSettings.calConfirmBtn}
            </div>
          </div>
        </div>
        {/**캘린더 바디 (제목,시작일자 ,종료일자 등) */}
        <div className="cal_add_body">
          {/**캘린더 제목*/}
          <div className="schedule_name">
            <div className="sch_title">{defaultSettings.calScheduleTitle}</div>
            <div className="sch_input_txt">
              <input name="scheduleTitle" type="text" onChange={onChageSchedule} value={scheduleTitle}></input>
            </div>
          </div>
          {/**캘린더 시작일자*/}
          <div className="shcedule_start">
            <div className="sch_st_title">{defaultSettings.startDateTitle}</div>
            <div className="start_date">
              <input name="startDate" type="date" onChange={onChageStartDate} value={startDate}></input>
            </div>
            {/**캘린더 시작시간*/}
            <div className="start_time">
              <input name="startTime" type="time" onChange={onChageStartTime} value={startTime}></input>
            </div>
          </div>
          {/**캘린더 종료일자*/}
          <div className="shcedule_end">
            <div className="sch_ed_title">{defaultSettings.endDateTitle}</div>
            <div className="end_date">
              <input name="endDate" type="date" onChange={onChageEndDate} value={endDate} min={startDate} />
            </div>
            {/**캘린더 종료시간*/}
            <div className="end_time">
              <input name="endTime" type="time" onChange={onChageEndTime} value={endTime} />
            </div>
          </div>
          {/**캘린더 참석자*/}
          <div className="shcedule_attendence">
            <div className="sch_atd_title">{defaultSettings.attendenceTitle}</div>
            <div className="attendence_name">
              <input name="attendence" type="text" onChange={onChageAttendence} value={attendence}></input>
            </div>
          </div>
          {/**캘린더 내용*/}
          <div className="shcedule_contents">
            <div className="shcedule_txtarea">
              <textarea name="contents" placeholder="내용을 입력하세요." onChange={onChageContents} value={contents}></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarAddPop;
