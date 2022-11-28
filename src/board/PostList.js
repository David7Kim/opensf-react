import React from "react";
import "./Board.css";
import PostBox from "./postBox";
//PostBox를 그려줍니다.
function PostList({ live, postList, seedetial, goBack, turnOffLoad, limitPage }) {
  console.log(postList);

  return (
    <div className="list">
      {/* 스크롤을 내리면 postList안에 page 0,1,2,3 값이 list형태로 넣어진다. */}
      {postList &&
        // Page 값들을 map 해서 1페이지에 있는 리스트들을 출력한다.
        postList.map((post, idx) => (
          <React.Fragment key={"parent" + idx}>
            {postList.length - 1 === idx}
            {/* post안에 있는 data들을 map함수로 추출해온다. */}
            {post.map((pet, ide) => (
              <React.Fragment key={ide}>
                {/* ide(index)가 게시글의 크기만큼 되었을 경우 live 속성으로 page를 +1 증가시킨다. */}
                {post.length - 1 === ide ? (
                  <PostBox live={live} postList={pet} key={`calendar-week-${pet.id}`} seedetail={seedetial} goBack={goBack} />
                ) : (
                  //이제 여기서 값이 더이상 없을경우 출력하지 않는 조건을 넣어줘야 한다.

                  <PostBox postList={pet} key={`calendar-week-${pet.id}`} seedetail={seedetial} goBack={goBack} />
                )}
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
    </div>
  );
}
export default PostList;
