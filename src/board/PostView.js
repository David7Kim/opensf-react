import "./Board.css";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BoardHeader from "../board/BoardHeader";
import axios from "axios";
function PostView() {
  let defaultSettings = {
    title: "",
  };
  const { state } = useLocation();
  const [postView, setPostView] = useState([]);
  //Propfile 사진 경로를 가져와서 넣어줍니다.
  const getPostPicPath = (userId) => {
    axios.get("/user/info/" + userId).then((res) => {
      return res.data;
    });
  };

  //postId를 가져와서 데이터를 불러옵니다.
  const getPost = () => {
    let postid = state;
    axios.get("/post/detail/view/" + postid).then((res) => {
      getPostPicPath();
      setPostView(res.data);
    });
  };

  useEffect(getPost, []);

  return (
    // 상단
    <div className="postview_box">
      {/* <div className="postview_header">
        <div className="postview_menu">
          <div className="back_btn">뒤로</div>
          <div className="board_title">Post</div>
        </div>
      </div> */}
      <BoardHeader title={defaultSettings.title} />
      {/* 내용 */}
      <div className="post_detail_content_box">
        <div className="post_detail_post">
          <img className="post_profile_pic" alt=""></img>
          <div className="post_writer">{postView.writer}</div>
          <div className="post_detail_content_title">{postView.title}</div>
          <div className="post_detail_content">{postView.contents}</div>
        </div>
      </div>
      {/* 주석 */}
      <div className="post_detail_comment_box"></div>
    </div>
  );
}

export default PostView;
