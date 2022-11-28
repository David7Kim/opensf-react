import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
function UpdateProfile() {
  //각 input 등의 값을 state에 저장한다.
  const [firstnm, setfirstnm] = useState("");
  const [lastnm, setlastnm] = useState("");
  const [email, setemail] = useState("");
  const [id, setid] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpw, setconfirmpw] = useState("");
  const [prevPwCheck, setPrevPwCheck] = useState("");
  const [userInfo, setUserInfo] = useState([]);
  const fileInput = useRef(null);
  const [image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");

  //세션에 User-account가 남아 있지 않다면 로그인 화면으로 이동
  useEffect(() => {
    let url = "/userinfo";

    const fetchData = async () => {
      const result = await axios.get(url);
      result.data.password = "";
      //user정보, 이름 , 성 , 이메일 정보 등 셋팅
      setUserInfo(result);
      setImage(result.data.userProfilePicPath);
      setfirstnm(result.data.userProfileId.firstName);
      setlastnm(result.data.userProfileId.lastName);
      setemail(result.data.userProfileId.email);
      setid(result.data.userProfileId.userAccount);
      //console.log(result);
      if (result.data.userProfileId.userAccount === "" || result.data.userProfileId.userAccount === undefined || result.length === 0) {
        // getUserInfo()
        navigate("/login");
      }
    };
    fetchData();
  }, []);

  //계정 만들기후 Navigate
  const navigate = useNavigate("");

  //input의 State를 변경하는 함수 생성

  //이메일 state 변경 이벤트
  const onEmail = (e) => {
    setemail(e.currentTarget.value);
  };
  //패스워드 state 변경 이벤트
  const onPassword = (e) => {
    setpassword(e.currentTarget.value);
  };
  //패스워드 확인 state 변경 이벤트
  const onConfirmpw = (e) => {
    setconfirmpw(e.currentTarget.value);
  };
  //이전 패스워드 확인 state 변경 이벤트
  const onPrevPWCheck = (e) => {
    setPrevPwCheck(e.currentTarget.value);
    checkPrevPasswordCheck();
  };

  //Submit 시 Validate check 함수 (수정 필요 작동 안됨)
  const validate = () => {
    let result = false;
    if (password !== confirmpw) {
      alert("비밀번호가 같지 않습니다.");
      return result;
    } else {
      result = true;
      return result;
    }
  };
  const checkPrevPasswordCheck = (password) => {};
  //계정 Insert(create) 함수
  const updateUserAccount = () => {
    //axios를 이용하여 api 호출
    //일단은 Validate필요하기에 이부분 냅두기
    let validateKey = validate();

    if (validateKey) {
      axios({
        url: "/regist/account/update",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        method: "POST",
        data: {
          profile_pic: image,
          user_account: userInfo.data.userProfileId.userAccount,
          email: email,
          password: password,
        },
      })
        //계정 생성 성공 , 실패 조건
        .then((res) => {
          console.log(res);
          navigate("/home");
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
          <div className="signup_title">프로필 수정</div>
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
              <div className="signup_name">
                <input type="text" placeholder="성" value={lastnm} readOnly />
                <input type="text" placeholder="이름" value={firstnm} readOnly />
              </div>
              <div className="signup_email">
                <input type="email" placeholder="이메일" value={email} onChange={onEmail} />
              </div>
              <div className="signup_id">
                <input type="text" placeholder="아이디" value={id} readOnly />
              </div>
              {/* <div className="signup_password">
                <input
                  type="password"
                  placeholder="이전 비밀번호 확인 "
                  onChange={onPrevPWCheck}
                />
              </div> */}
              <div className="signup_password">
                <input type="password" placeholder="패스워드" onChange={onPassword} />
              </div>
              <div className="signup_confirm_pw">
                <input type="password" placeholder="패스워드 확인" onChange={onConfirmpw} />
              </div>

              <div className="signup_btn">
                <input type="button" value="수정" onClick={updateUserAccount} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UpdateProfile;
