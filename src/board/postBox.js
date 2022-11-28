import React from "react";
import moment from "moment";
import Comments from "../components/Comments";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function PostBox({ live, postList, seedetail, goBack }) {
  const [commentViewState, setCommentsViewState] = useState(false);
  const [userPic, setUserPic] = useState("");
  const navigate = useNavigate();

  //세션에 User-account가 남아 있지 않다면 로그인 화면으로 이동
  useEffect(() => {
    let url = "/user/info/" + postList.userId.id;
    const fetchData = async () => {
      const result = await axios.get(url);
      // 유저 정보가 존재하지 않을경우 로그인 페이지
      if (result.data.userProfileId.userAccount === "" || result.data.userProfileId.userAccount === undefined || result.length === 0) {
        navigate("/login");
      } else {
        // 사용자 프로필 사진 설정
        setUserPic(result.data.userProfilePicPath);
        console.log(result);
      }
    };
    fetchData();
  }, []);
  //댓글 창 state 변경 함수
  const showCommentsView = () => {
    if (commentViewState === true) {
      setCommentsViewState(false);
    } else {
      setCommentsViewState(true);
    }
  };

  return (
    <div
      className="postList_box"
      data-postid={postList.id}
      onClick={() => {
        console.log("상세보기입니다.");
      }}
      ref={live}
    >
      <div className="post_user_box">
        {/* 프로필 사진 , 이름 , 날짜 */}
        <img className="post_user_pic" src={process.env.PUBLIC_URL + userPic} alt=""></img>
        <div className="post_user_txt_box">
          <div className="post_user_name">{postList.writer}</div>
          <div className="post_date">{moment(postList.updatedDate).format("YYYY년 MM월 DD일")}</div>
          <div className="post_title">{postList.title}</div>
        </div>
        <div className="post_edit">편집</div>
      </div>
      {/* 게시글 내용 */}
      <div className="post_contents">{postList.contents}</div>
      {/* 댓글 */}
      <div className="post_show_comments" onClick={showCommentsView}>
        댓글
      </div>
      {commentViewState !== false && <Comments placeholder="댓글을 입력하세요." />}
    </div>
  );
}
export default PostBox;
