import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function UserList(userInfo) {
  const navigate = useNavigate();
  const setAdmin = (target) => {};
  return (
    <div className="set_admin_user_box">
      {/* 체크 박스 */}
      <div className="chk_user_list_box">
        <input className="chk_user_list" type="checkbox"></input>
      </div>
      {/* 프로필 사진 */}
      <div className="set_admin_user_pic_box">
        <img className="user_pic" src={process.env.PUBLIC_URL + userInfo.userInfo.userProfilePicPath} alt=""></img>
      </div>
      {/* 이름 */}
      <div className="user_name">{userInfo.userInfo.userProfileId.userName}</div>
      {/* 권한 */}
      <div className="user_is_admin_box">{userInfo.userInfo.userIsAdmin !== null ? "관리자" : "일반"}</div>
    </div>
  );
}
export default UserList;
