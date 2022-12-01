import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function MainHome() {
  //로그인  리다이렉트
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState([]);
  const [userPic, setUserPic] = useState("");
  const [userIsAdmin, setUserIsAdmin] = useState("");

  //프로필 설정 화면(팝업으로 변경 할 예정임)
  const settingProfile = () => {
    navigate("/user/update");
  };
  //로그아웃
  const logOut = () => {
    sessionOut();
    navigate("/login");
  };
  //캘린더 화면
  const calendar = () => {
    navigate("/calendar");
  };
  //게시판 화면
  const board = () => {
    navigate("/board");
  };
  //관리자 화면
  const admin = () => {
    navigate("/set/admin");
  };
  //세션초기화
  const sessionOut = () => {
    axios({
      url: "/logout",
      method: "POST",
    });
  };
  //세션에 User-account가 남아 있지 않다면 로그인 화면으로 이동
  useEffect(() => {
    let url = "/userinfo";
    const fetchData = async () => {
      const result = await axios.get(url);
      //유저 정보가 존재하지 않을경우 로그인 페이지
      if (
        result.data === "" ||
        result.data.userProfileId.userAccount === "" ||
        result.data.userProfileId.userAccount === undefined ||
        result.length === 0
      ) {
        navigate("/login");
      } else {
        setUserInfo(result);
        setUserPic(result.data.userProfilePicPath);
        setUserIsAdmin(result.data.userIsAdmin);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="home_box">
      <div className="home_header">
        <div className="profile_box">
          {/**계정 정보 세팅 */}
          <img className="profile_pic" onClick={settingProfile} src={process.env.PUBLIC_URL + userPic} alt=""></img>
          {/**사용자 이름  */}
          <div className="profile_txt_box">
            <div className="profile_name">{userInfo.length === 0 ? "" : userInfo.data.userProfileId.userName}</div>
            {/**사용자 계정  */}
            <div className="profile_account">{userInfo.length === 0 ? "" : userInfo.data.userProfileId.userAccount}</div>
            {/**로그아웃 버튼  */}
            {userInfo.length !== 0 && (
              <div className="profile_logout" onClick={logOut}>
                로그아웃
              </div>
            )}
          </div>
        </div>

        <div className="home_body">
          <div className="home_body_box">
            <table className="tbl_home_body">
              <thead>
                <tr>
                  {/**캘린더 버튼 */}
                  <td>
                    <div onClick={calendar}>
                      <img src={require("../images/icn_calendar.png")}></img>
                      <div className="home_li_txt">캘린더</div>
                    </div>
                  </td>
                  {/*게시판 버튼 */}
                  <td>
                    <div onClick={board}>
                      <img src={require("../images/icn_board.png")}></img>
                      <div className="home_li_txt">게시판</div>
                    </div>
                  </td>
                  {/**Admin 관리자가 아닐경우 관리자 메뉴버튼은 false로 한다. */}
                  {userIsAdmin && (
                    <td>
                      <div onClick={admin}>
                        <img src={require("../images/icn_board.png")}></img>
                        <div className="home_li_txt">관리자</div>
                      </div>
                    </td>
                  )}
                  {userIsAdmin && (
                    <td>
                      <div onClick={admin}>
                        <img src={require("../images/icn_board.png")}></img>
                        <div className="home_li_txt">계정 생성</div>
                      </div>
                    </td>
                  )}
                </tr>
              </thead>
            </table>
          </div>
        </div>
        {/*하단 영역 */}
        <div className="home_footer">
          <div className="home_footer_box">2022 @ ioss.co.kr | tykim</div>
        </div>
      </div>
    </div>
  );
}
export default MainHome;
