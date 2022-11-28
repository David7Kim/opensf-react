import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

// type RandomImageType = {
//   id: string;
//   author: string;
//   width: number;
//   height: number;
//   url: string;
//   download_url: string;
// };
export default function ScrollPaging() {
  const [randomImageList, setRandomImageList] = useState([]);
  const [page, setPage] = useState(0);

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    console.log("스크롤 이벤트 발생");

    if (scrollTop + clientHeight >= scrollHeight) {
      console.log("페이지 끝에 스크롤이 닿았음");
      setPage((prev) => prev + 1);
    }
  };

  const getRandomImageThenSet = async () => {
    console.log("fetching 함수 호출됨");
    try {
      // const { data } = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=7`);
      const result = await axios.get(`chatter/post?page=${page}&size=5`).then((res) => {
        console.log(res);
      });
      // setRandomImageList(randomImageList.concat(data));
    } catch {
      console.error("fetching error");
    }
  };

  useEffect(() => {
    console.log("page ? ", page);
    getRandomImageThenSet();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* {randomImageList?.map((randomImage) => (
        <img key={randomImage.id} src={randomImage.download_url} alt="random" />
      ))} */}
    </>
  );
}

/*-------------------------스크롤 페이징 구현부분 - ------------------*/
