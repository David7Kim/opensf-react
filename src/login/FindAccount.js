import { useState } from "react";
import axios from "axios";
function FindAccount() {
  const [message, setMessage] = useState(""); // 메세지 상태
  const [email, setEmail] = useState(""); //이메일

  //email State값 변경 함수
  const onChangeEmail = (e) => {
    setEmail(e.currentTarget.value);
  };

  //계정 찾기 함수
  const findAccount = () => {
    let url = "/regist/find/" + email;
    //api 호출
    axios.get(url, {}).then((res) => {
      if (res.data === "SUCCESS") {
        console.log("계정이 존재합니다.");
        setMessage("계정이 존재합니다.");
      } else {
        console.log("계정이 존재 하지 않습니다.");
        setMessage("계정이 존재 하지 않습니다.");
      }
    });
  };

  return (
    <div className="find_account_parent_box">
      <div className="find_account_box">
        <div className="find_account_box_tw">
          <div className="find_account_title">계정 찾기</div>
          <div className="find_account_input">
            <form>
              <div className="find_account_email">
                <input type="text" placeholder="이메일" onChange={onChangeEmail} value={email} />
              </div>
              <div className="message_find_account">{message}</div>
              <div className="find_account_btn">
                <input type="button" value="아이디 찾기" onClick={findAccount} />
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <div className="already_account">이미 계정이 있으신가요?</div> */}
    </div>
  );
}
export default FindAccount;
