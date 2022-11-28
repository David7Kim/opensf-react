import React, { useState, useEffect } from "react";
import "../calendar/Calendar.css";
import "./Board.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BoardAddPop({ leftFunc, rightFunc }) {
  const validate = () => {};
  //const [title, setTitle] = useState(""); //제목
  const [contents, setContents] = useState(""); //글내용
  const [userInfo, setUserInfo] = useState([]);
  const navigate = useNavigate();

  //세션 사용자 정보를 불러옵니다.
  useEffect(() => {
    let url = "/userinfo";
    const fetchData = async () => {
      const result = await axios.get(url);

      if (
        result.data.userProfileId.userAccount === "" ||
        result.data.userProfileId.userAccount === undefined ||
        result.length === 0
      ) {
        navigate("/login");
      } else {
        setUserInfo(result);
        console.log(result);
      }
    };
    fetchData();
  }, []);

  //글내용 값 입력 이벤트
  const onChangeContents = (e) => {
    setContents(e.currentTarget.value);
  };
  const addPost = (e) => {
    let baseUrl = "/post/addPost";
    let date = new Date();
    axios
      .post(baseUrl, {
        board_id: "1", //세션 게시판 아이디 받아와서 넣을예정
        //title: title,
        contents: contents,
        writer: userInfo.data.userProfileId.userAccount,
        created_date: date,
        updated_date: date,
      })
      .then((resp) => {
        console.log(resp);
        if (resp.data === "SUCCESS") {
          console.log("글 등록에 성공 하였습니다.");
          rightFunc();
          //아닐 경우 Fail 리턴 , FailMessgae출력
        } else if (resp.data === "FAIL") {
          console.log("글 등록에 실패 하였습니다.");
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("글 등록에 실패 하였습니다.");
      });
  };

  return (
    <div className="post_add_box">
      <div className="post_add_header">
        <div className="post_menu_bar">
          <div className="post_add_ico_cancel" onClick={leftFunc}>
            X
          </div>
          <div className="menu_title">글등록</div>
          <div className="post_add_confirm_btn" onClick={addPost}>
            확인
          </div>
        </div>
      </div>
      <div className="post_add_body">
        {/* <div className="post_title_input">
          <div className="post_title">제목</div>
          <div className="post_input_txt">
            <input type="text" onChange={onChangeTitle} />
          </div>
        </div> */}
        <div className="post_contents">
          <div className="post_txtarea">
            <textarea
              placeholder="무슨 생각을 하고 계신가요?"
              onChange={onChangeContents}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default BoardAddPop;
