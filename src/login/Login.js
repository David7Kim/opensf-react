import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
//import { getUserSession, getUserInfo } from "../utils/open-sf-utils";

import axios from "axios";
function Login() {
  const [userAccount, setUserAccount] = useState(""); //계정
  const [userPassword, setUserPassword] = useState(""); //비밀번호
  const [loginFailMessage, setLoginFailMessage] = useState(false); //로그인 실패시 메세지

  //로그인  리다이렉트
  const navigate = useNavigate();

  //계정 이벤트 함수
  const onChangeAccount = (e) => {
    setUserAccount(e.currentTarget.value);
    setLoginFailMessage(false);
  };

  //패스워드 이벤트 함수
  const onChangePassword = (e) => {
    setUserPassword(e.currentTarget.value);
    setLoginFailMessage(false);
  };
  //Enter Key press 시 로그인
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onLogin();
    }
  };
  // //계정찾기
  // const findAccount = () => {
  //   navigate("/find/account");
  // };
  // //가입하기
  // const signUp = () => {
  //   navigate("/signup");
  // };

  //계정 로그인 함수
  const onLogin = () => {
    //호출 url
    let url = "/login";
    //api 호출
    axios
      .post(url, {
        user_account: userAccount,
        user_password: userPassword,
      })
      .then((resp) => {
        console.log("onLogin() Response :", resp);
        //Message가 Success 리턴일 경우 로그인 navigate
        if (resp.data === "SUCCESS") {
          console.log("로그인 하였습니다.");
          navigate("/home");

          //아닐 경우 Fail 리턴 , FailMessgae출력
        } else if (resp.data === "FAIL") {
          console.log("로그인에 실패 하였습니다.");
          setLoginFailMessage(true);
        }
      })
      .catch((error) => {
        console.log("onLogin() ErrorMessage :", error);
      });
  };

  return (
    <div className="login_box">
      <div className="login_logo">
        <h1>OpenSales</h1>
      </div>
      <div className="login_form">
        <fieldset className="login_field">
          <form method="post" onKeyPress={onKeyPress}>
            <div className="account_txt">아이디</div>
            <div className="account_input">
              <input type="text" placeholder="아이디" onChange={onChangeAccount} value={userAccount}></input>
            </div>
            <div className="password_txt">비밀번호</div>
            <div className="password_input">
              <input type="password" placeholder="비밀번호" onChange={onChangePassword}></input>
            </div>
            {loginFailMessage === true && <div className="login_error_msg">아이디 비밀번호를 다시 확인해주세요.</div>}
            <div className="find_account_div">
              {/* <span className="find_account" onClick={findAccount}>
                아이디 찾기
              </span> */}
            </div>
            <br />
            <div className="submit_btn">
              <input className="button_submit" type="button" value="로그인" onClick={onLogin}></input>
            </div>
          </form>
        </fieldset>
        {/* <div className="sign_up">
          <div className="ment_signup">아직도 계정이 없으신가요?</div>
          <div className="link_signup" onClick={signUp}>
            SignUp
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Login;
