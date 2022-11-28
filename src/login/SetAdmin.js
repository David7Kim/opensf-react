import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserList from "./UserList ";
import "./Login.css";
import axios from "axios";

function SetAdmin() {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    let url = "/user/infoes";
    const fetchData = async () => {
      const result = await axios.get(url);
      //유저 정보가 존재하지 않을경우 로그인 페이지
      //   if (
      //     result.data === "" ||
      //     result.data.userProfileId.userAccount === "" ||
      //     result.data.userProfileId.userAccount === undefined ||
      //     result.length === 0
      //   ) {
      //     navigate("/login");
      //   } else {
      //     setUserList();
      console.log(result);
      setUserList(result.data);

      //   }
    };
    fetchData();
  }, []);
  //전체선택
  const checkAll = (e) => {
    console.log(e);
  };

  //메인 홈으로 이동
  const goHome = () => {
    navigate("/home");
  };
  return (
    <div>
      <div className="set_admin_box">
        <div className="set_admin_top">
          <div className="go_home" onClick={goHome}>
            <img src={require("../images/w_back-30.png")}></img>
          </div>
          <div className="set_admin_title">관리자 설정</div>
        </div>
        <div className="set_admin_header_box">
          <div className="set_admin_state_box">
            <div className="chk_all" onClick={checkAll}>
              전체선택
            </div>
            <div className="btn_admin">관리자 설정</div>
          </div>
          {/* 사용자 목록 가져와서 출력합니다. */}
          {userList.length !== 0 ? userList.map((user) => <UserList userInfo={user} key={`user_id-${user.id}`} />) : ""}
        </div>
      </div>
    </div>
  );
}
export default SetAdmin;
