import React from "react";
import { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Calendar.css";
import { getUserSession } from "../utils/open-sf-utils";

function CalendarModifyPop({ detailState, closeDetail, scheduleId, scheduleUserId }) {
  //Layout label 값
  let defaultSettings = {
    calTitle: "일정보기",
    calCancelBtn: "취소",
    calModifyBtn: "수정",
    calConfirmBtn: "확인",
    calDeleteBtn: "삭제",
    calScheduleTitle: "일정명",
    startDateTitle: "시작",
    endDateTitle: "종료",
    attendenceTitle: "참석자",
    detailState: detailState,
    //CalendarApp => CalendarDetailList에서 보낸 props
    scheduleId: scheduleId,
    scheduleUserId: scheduleUserId,
  };

  /**
   * 시작일자,종료일자,참석자,내용 State초기화
   */
  const [scheduleTitle, setScheduleTitle] = useState(""); //스케줄 제목
  const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD")); //시작일
  const [startTime, setStartTime] = useState(moment().format("HH:mm")); //시작시간
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD")); //종료일
  const [endTime, setEndTime] = useState(moment().format("HH:mm")); //종료시간
  const [attendence, setAttendence] = useState(""); //참석자
  const [contents, setContents] = useState(""); //내용

  const [readonly, setReadonly] = useState(true); //Readonly
  const [editable, setEditable] = useState(false); //변경버튼
  const [confirm, setConfirm] = useState(false); //확인버튼
  const [modifyBtn, setModifyBtn] = useState(true); //수정 버튼
  const [cancelBtn, setCancelBtn] = useState(false); //취소버튼
  const navigate = useNavigate();

  /**
   * 시작일자,종료일자,참석자,내용의 값 변경 감지 함수
   */
  //제목 변경감지
  const onChageSchedule = (e) => {
    setScheduleTitle(e.currentTarget.value);
  };
  //시작일자 변경감지
  const onChageStartDate = (e) => {
    if (startDate > endDate) {
      setStartDate(moment().format("YYYY-MM-DD"));
    } else {
      setStartDate(e.currentTarget.value);
    }
  };
  //시작시간 변경감지
  const onChageStartTime = (e) => {
    setStartTime(e.currentTarget.value);
  };
  //종료일자 변경감지
  const onChageEndDate = (e) => {
    if (endDate < startDate) {
      setEndDate(startDate);
    } else {
      setEndDate(e.currentTarget.value);
    }
  };
  //종료시간 변경감지
  const onChageEndTime = (e) => {
    setEndTime(e.currentTarget.value);
  };
  //참석자 변경감지
  const onChageAttendence = (e) => {
    setAttendence(e.currentTarget.value);
  };
  //내용 변경감지
  const onChageContents = (e) => {
    setContents(e.currentTarget.value);
  };
  //수정 버튼 클릭시 readonly 해제 , 확인버튼 표시
  const readOnlyRelease = () => {
    setReadonly(false);
    setConfirm(true);
    setModifyBtn(false);
    setCancelBtn(true);
  };
  const readOnlyHold = () => {
    setReadonly(true);
    setConfirm(false);
    setModifyBtn(true);
    setCancelBtn(false);
  };
  /**
   * 함수명: deleteSchedule
   * 작성자: tykim
   * 작성일 : 2022-10-26
   * 내용 : scheduleId를 넘겨주어 scheduleDate를 삭제합니다.
   * param : scheduleId
   *
   */
  const deleteSchedule = () => {
    let url = "/calendar/delete/";
    axios
      .delete(url, { data: { scheduleId: scheduleId } })
      .then((resp) => {
        console.log("일정을 삭제합니다.", resp);
        closeDetail();
        window.location.reload();
      })
      .catch((error) => {
        console.log("일정 삭제를 실패했습니다.", error);
      });
  };

  /**
   * 함수명:modifySchedule
   * 작성자: tykim
   * 작성일 : 2022-10-26
   * 내용 : scheduleId와 RequestBody를 넘겨주어 scheduleData를 업데이트 합니다.
   * param : scheduleData
   */
  const modifySchedule = (e) => {
    let baseUrl = "/calendar/modify/schedule";

    //validate조건이 true일 경우에 axios통신을 한다.

    // if (validate() === true) {
    axios
      .post(baseUrl, {
        id: defaultSettings.scheduleId, //스케줄 Id
        title: scheduleTitle, //스케줄 제목
        contents: contents, //스케줄 내용
        attendence: attendence, //스케줄 참석자
        startDate: startDate, //스케줄 시작일자
        userid: defaultSettings.scheduleUserId, //스케줄 작성자 id값
        startTime: startTime, // 스케줄 시작시간
        endDate: endDate, // 스케줄 종료일자
        endTime: endTime, // 스케줄 종료시간
      })
      .then((resp) => {
        console.log(resp);

        if (resp.data === "SUCCESS") {
          console.log("스케줄 등록에 성공 하였습니다.");
          navigate("/Calendar");

          //아닐 경우 Fail 리턴 , FailMessgae출력
        } else if (resp.data === "FAIL") {
          console.log("스케줄 등록에 실패 하였습니다.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    //팝업 close
    closeDetail();
    // }
  };
  /**
   *
   * 함수명 : validate
   * 작성자 : tykim
   * 내용 : 시작일,종료일,시간 등 값을 입력하지 않았을 경우
   *        아래 Validate 함수를 실행합니다.
   */
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
  /**
   * 스케줄 클릭시 ScheduleId를 넘겨받아 schedule을 getData하여
   * 수정 팝업 부분에 출력해줍니다.
   */
  useEffect(() => {
    let url = "/calendar/modify/schedule/" + defaultSettings.scheduleId;
    let sessionUser = getUserSession();

    const fetchData = async () => {
      const result = await axios.get(url);

      //유저 정보가 존재하지 않을경우 로그인 페이지
      if (
        sessionUser.userInfo[0].data.userProfileId.id === "" ||
        sessionUser.userInfo[0].data.userProfileId.id === undefined ||
        sessionUser.userInfo[0].length === 0
      ) {
        navigate("/Login");
      }
      //세션 유저 정보와 게시판 유저 정보와 같은 경우 editable true
      if (result.data.id === "" || result.data.id === undefined) {
        // closeDetail();
      } else {
        if (sessionUser.userInfo[0].data.userProfileId.id === defaultSettings.scheduleUserId) {
          setEditable(true); //수정,삭제 버튼 조건
        }
        //제목,날짜, 시간 등에 불러온 값을 setting해줍니다.
        setScheduleTitle(result.data.scheduleTitle);
        setStartDate(moment(result.data.startDate).format("YYYY-MM-DD"));
        setStartTime(result.data.startTime);
        setEndDate(moment(result.data.endDate).format("YYYY-MM-DD"));
        setEndTime(result.data.endTime);
        setAttendence(result.data.attendence);
        setContents(result.data.contents);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="modify_box">
      <div className="calendar_modify_box">
        {/** 스케줄 상단 제목표기,취소,확인 버튼 영역*/}
        <div className="cal_add_header">
          <div className="menu_bar">
            <div className="cal_add_ico_cancel" onClick={closeDetail}>
              X
            </div>
            <div className="menu_title">{defaultSettings.calTitle}</div>
            {confirm && (
              <div className="cal_add_confirm_btn" onClick={modifySchedule}>
                {defaultSettings.calConfirmBtn}
              </div>
            )}
          </div>
        </div>
        <div className="cal_add_body">
          {/** 스케줄 제목 input 영역*/}
          <div className="schedule_name">
            <div className="sch_title">{defaultSettings.calScheduleTitle}</div>
            <div className="sch_input_txt">
              <input name="scheduleTitle" type="text" onChange={onChageSchedule} value={scheduleTitle} readOnly={readonly}></input>
            </div>
          </div>
          {/** 스케줄 시작일자,시간 input 영역*/}
          <div className="shcedule_start">
            <div className="sch_st_title">{defaultSettings.startDateTitle}</div>
            <div className="start_date">
              <input name="startDate" type="date" onChange={onChageStartDate} value={startDate} readOnly={readonly}></input>
            </div>
            <div className="start_time">
              <input name="startTime" type="time" onChange={onChageStartTime} value={startTime} readOnly={readonly}></input>
            </div>
          </div>
          {/** 스케줄 종료일자,시간 input 영역*/}
          <div className="shcedule_end">
            <div className="sch_ed_title">{defaultSettings.endDateTitle}</div>
            <div className="end_date">
              <input name="endDate" type="date" onChange={onChageEndDate} value={endDate} min={startDate} readOnly={readonly} />
            </div>
            <div className="end_time">
              <input name="endTime" type="time" onChange={onChageEndTime} value={endTime} readOnly={readonly} />
            </div>
          </div>
          {/** 스케줄 참석자 input 영역*/}
          <div className="shcedule_attendence">
            <div className="sch_atd_title">{defaultSettings.attendenceTitle}</div>
            <div className="attendence_name">
              <input name="attendence" type="text" onChange={onChageAttendence} value={attendence} readOnly={readonly}></input>
            </div>
          </div>
          {/** 스케줄 내용 input 영역*/}
          <div className="shcedule_contents">
            <div className="shcedule_txtarea">
              <textarea name="contents" placeholder="내용을 입력하세요." onChange={onChageContents} value={contents} readOnly={readonly}></textarea>
            </div>
          </div>
        </div>
      </div>
      <div>
        {/** 수정,삭제 버튼 영역*/}
        {editable && (
          <div className="editable_box">
            {modifyBtn && (
              <div className="editable_btn" onClick={readOnlyRelease}>
                <div>{defaultSettings.calModifyBtn}</div>
              </div>
            )}
            {cancelBtn && (
              <div className="editable_btn" onClick={readOnlyHold}>
                <div>{defaultSettings.calCancelBtn}</div>
              </div>
            )}
            <div className="editable_btn" onClick={deleteSchedule}>
              <div>{defaultSettings.calDeleteBtn}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CalendarModifyPop;
