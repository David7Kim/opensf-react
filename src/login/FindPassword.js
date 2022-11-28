import { useState } from "react";
function FindPassword() {
  const [inputs, setInputs] = useState({
    email: "",
    id: "",
  });
  const { email, id } = inputs;
  const onChange = (e) => {
    const { value } = e.target;
    setInputs({
      ...inputs,
      [email]: value,
      [id]: value,
    });
  };

  return (
    <div className="find_password_parent_box">
      <div className="find_password_box">
        <div className="find_password_box_tw">
          <div className="find_password_title">비밀번호 찾기</div>
          <div className="find_password_input">
            <form>
              <div className="find_password_email">
                <input type="email" placeholder="이메일" onChange={onChange} />
              </div>
              <div className="find_password_id">
                <input type="text" placeholder="아이디" onChange={onChange} />
              </div>
              <div className="find_password_btn">
                <input type="submit" value="비밀번호 찾기" />
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <div className="already_account">이미 계정이 있으신가요?</div> */}
    </div>
  );
}
export default FindPassword;
