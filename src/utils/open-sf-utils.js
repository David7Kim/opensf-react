import axios from "axios";

//날짜 포맷 함수 (필요 없을수도)
export function today(argDate, type) {
  let currentDate = new Date(argDate);
  //년도
  let year = currentDate.getFullYear();

  //월
  let month = currentDate.getMonth() + 1 > 9 ? currentDate.getMonth() + 1 : "0" + (currentDate.getMonth() + 1);
  //일
  let day = currentDate.getDate() > 9 ? currentDate.getDate() : "0" + currentDate.getDate();

  // 현재날짜  년도 + 월 + 일
  let today = "";
  // type 1 : 년,월,일
  // type 2 : -(대시) 출력
  if (type === "1") {
    today = year + "년 " + month + "월 " + day + "일";
  } else if (type === "2") {
    today = year + "-" + month + "-" + day;
  }
  return today;
}

//로그인 한 유저의 SessionAttribute를 가져오는 함수
export function getUserSession() {
  let url = "/userinfo";
  let result = [];
  axios.get(url, {}).then((res) => {
    res.data.password = "";
    result.push(res);
  });
  return { userInfo: result };
}

//사용자의 정보를 가져옵니다.
export function getUserInfo(state, userId) {
  let url = "/user/info/" + userId;
  let result = [];
  axios.get(url, {}).then((res) => {
    result.push(res);
    state.setState({ userPictureInfo: result });
  });
  // return result;
}
