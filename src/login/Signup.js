import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
function SignUp() {
  //각 input 등의 값을 state에 저장한다.
  const [firstnm, setfirstnm] = useState(""); //사용자 이름
  const [lastnm, setlastnm] = useState(""); //사용자 성
  const [email, setemail] = useState(""); //사용자 이메일
  const [id, setid] = useState(""); //사용자 아이디
  const [password, setpassword] = useState(""); //비밀번호
  const [confirmpw, setconfirmpw] = useState(""); //비밀번호 확인
  const fileInput = useRef(null);
  // const formData = new FormData();
  const [image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");

  //계정 만들기후 Navigate
  const navigate = useNavigate("/login");

  //input의 State를 변경하는 함수 생성

  //사용자 이름 변경 감지
  const onFirstName = (e) => {
    setfirstnm(e.currentTarget.value);
  };
  //사용자 성 변경 감지
  const onLastName = (e) => {
    setlastnm(e.currentTarget.value);
  };
  //사용자 이메일 변경 감지
  const onEmail = (e) => {
    setemail(e.currentTarget.value);
  };
  //사용자 아이디 변경 감지
  const onId = (e) => {
    setid(e.currentTarget.value);
  };
  //사용자 비밀번호 변경 감지
  const onPassword = (e) => {
    setpassword(e.currentTarget.value);
  };
  //사용자 비밀번호확인 변경 감지
  const onConfirmpw = (e) => {
    setconfirmpw(e.currentTarget.value);
  };

  //Submit 시 Validate check 함수 (수정 필요 작동 안됨)
  const validate = () => {
    const result = true;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!firstnm || firstnm === "") {
      return false;
    }
    if (!lastnm || lastnm === "") {
      return false;
    }
    if (!id || id === "") {
      return false;
    }
    if (!password || password === "") {
      console.log("비밀번호를 입력해주세요.");
      return false;
    }
    if (!confirmpw || confirmpw === "") {
      console.log("비밀번호를 입력해주세요.");
      return false;
    }

    if (password !== confirmpw) {
      result = false;
      alert("비밀번호가 같지 않습니다.");
      return result;
    }

    if (!email || email === "") {
      setemail("Cannot be blank");
      //이메일 정규식 표현이 옳지 않을시
      return false;
    }
    return true;
  };
  //계정 생성 함수
  const makeUserAccount = () => {
    //axios를 이용하여 api 호출
    // let validateKey = validate();
    // if (validateKey) {
    axios({
      url: "regist/account",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      method: "POST",
      data: {
        usr_profile: image,
        user_name: lastnm + firstnm,
        user_account: id,
        first_nm: firstnm,
        last_nm: lastnm,
        email: email,
        password: password,
      },
    })
      //계정 생성 성공 , 실패 조건
      .then((res) => {
        console.log(res);
        if (res.data === "ACCOUNT" || res.data === "EMAIL") {
          alert(res.data + "(이)가 이미 가입된 " + res.data + "입니다.");
        } else {
          navigate("/Home");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // }
  };
  const onImgChange = async (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    } else {
      //업로드 취소할 시
      setImage(
        //임시로 사용중인 이미지 나중에 제거할 예정
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      );
      return;
    }
    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <div className="signup_parent_box">
      <div className="signup_box">
        <div className="signup_box_tw">
          <div className="signup_title">계정 생성</div>
          <div className="signup_input">
            <form>
              <div className="signup_profile_pic">
                <img
                  className="signup_img"
                  src={image}
                  style={{ width: "150px", height: "150px" }}
                  onClick={() => {
                    fileInput.current.click();
                  }}
                  alt=""
                />
                <input type="file" accept="image/*" style={{ display: "none" }} onChange={onImgChange} ref={fileInput} />
              </div>
              {/**성, 이름 , 이메일, 아이디 input */}
              <div className="signup_name">
                <input type="text" placeholder="성" onChange={onLastName} />
                <input type="text" placeholder="이름" onChange={onFirstName} />
              </div>
              <div className="signup_email">
                <input type="email" placeholder="이메일" onChange={onEmail} />
              </div>
              <div className="signup_id">
                <input type="text" placeholder="아이디" onChange={onId} />
              </div>
              {/**계정 패스워드 input */}
              <div className="signup_password">
                <input type="password" placeholder="패스워드" onChange={onPassword} />
              </div>
              {/**계정 패스워드 확인 input */}
              <div className="signup_confirm_pw">
                <input type="password" placeholder="패스워드 확인" onChange={onConfirmpw} />
              </div>
              {/**계정 생성 버튼 */}
              <div className="signup_btn">
                <input type="button" value="만들기" onClick={makeUserAccount} />
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <div className="already_account">이미 계정이 있으신가요?</div> */}
    </div>
  );
}
export default SignUp;
