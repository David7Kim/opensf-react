import { React, useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import PostList from "./PostList";
import axios from "axios";
import BoardHeader from "../board/BoardHeader";
import BoardAddPop from "./BoardAddPop";

function BoardMain() {
  let defaultSettings = {
    title: "게시판",
  };
  //Navigate , postList , addPopState 선언
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);
  const [addPopState, setAddPopState] = useState(false);
  // const [lastIntersectingImage, setLastIntersectingImage] = useState < HTMLDivElement > null;
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();
  const [page, setPage] = useState(0);
  const [limitPage, setLimitPage] = useState();

  //게시글 가져오는 함수 (페이징 적용한 메소드)
  const getPostdata = useCallback(async () => {
    //데이터를 불러오기전 로딩 true (시각적으로 불러오는 gif 첨부)
    setLoading(true);
    await axios.get(`chatter/post?page=${page}&size=7`).then((res) => {
      console.log(res);
      setPostList((prevState) => [...prevState, res.data.content]);
      setLimitPage(res.data.totalPages);
    });
    //data호출이 완료 되었을 경우 로딩 false 이건뭐 간단하니깐 이미지만 하단에다 넣든가 하면될듯
    setLoading(false);
  }, [page]);
  //렌더시 Post Data를 호출하여 Document를 그려준다.
  useEffect(() => {
    getPostdata();
  }, [getPostdata]);
  //Page를 증가시킨다. (여기에 조건 추가하면될듯)
  useEffect(() => {
    if (inView && !loading) {
      //여기 부터 수정하면 될듯
      setPage((prevState) => prevState + 1);
    }
  }, [inView, loading]);

  //게시글 자세히 보기
  const getSeePostDetail = (e) => {
    console.log("postid is ", e.currentTarget.getAttribute("data-postid"));
    navigate("/post/detail/view", {
      state: e.currentTarget.getAttribute("data-postid"),
    });
  };
  //이전으로 돌아가기
  const goBack = () => {
    navigate("/home");
  };

  //게시글 등록 팝업 open
  const addPost = () => {
    setAddPopState(true);
  };
  //게시글 등록 팝업 close
  const closePost = () => {
    setAddPopState(false);
  };
  const turnOffLoad = () => {
    setLoading(true);
  };
  return (
    <div>
      {addPopState === true && <BoardAddPop leftFunc={closePost} rightFunc={closePost} />}
      <div className="board_box">
        {addPopState === false && (
          <BoardHeader leftFunc={goBack} rightFunc={addPost} title={defaultSettings.title} option={true} className={"board_header"} />
        )}
        <div className="board_contents">
          <PostList
            live={ref}
            postList={postList}
            seedetial={getSeePostDetail}
            /** 게시글 상세보기시 goBack기능을 넣으려고 하는것 같음? */
            goBack={goBack}
            limitPage={limitPage}
            turnOffLoad={turnOffLoad}
          />
        </div>
      </div>
    </div>
  );
}
export default BoardMain;
