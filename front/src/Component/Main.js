import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getADList, getPostList } from "../api";
import "../Style/main.scss";
import Filter from "./Filter";
import Nav from "./Nav";

const Main = () => {
  const [type, setType] = useState([1, 2, 3]);
  // category_id : 1 => apple
  // category_id : 2 => banana
  // category_id : 3 => coconut
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState("asc");
  const [list, setList] = useState([]);
  const [adList, setAdList] = useState([]);
  const [feed, setFeed] = useState([]);

  const fetchPostList = async (pageNum, order, categoryNum, limitNum) => {
    let temp = await getPostList(pageNum, order, categoryNum, limitNum);
    setList(temp);
  };

  const fetchADList = async (pageNum, limitNum) => {
    let temp = await getADList(pageNum, limitNum);
    setAdList(temp);
  };

  const sliceContent = (limit) => {
    let temp = [];
    let oddNum = 0;
    let oddNumber = 0;
    let evenNumber = 0;
    let oddAdNum = 0;
    let evenAdNum = 0;

    if (limit % 20 !== 0) {
      // 10, 30, 50, 70, 90, 110 ...
      // 2, 3, 4, 5, ...
      // 10, 15, 20, 25 ...
      // 0, 5, 10, 15 ...
      console.log("실행됨");
      oddNum = Math.floor(limit / 20) + 2;
      oddAdNum = Math.floor(limit / 20) * 5;
      oddNumber = oddNum * 5;
    } else {
      // 20, 40, 60, 80 ...
      // 2, 3, 4, 5, ...
      // 12, 17, 22, 27 ...
      // 2, 7, 12, 17 ...
      console.log("실행됨2");
      oddNum = Math.floor((limit - 10) / 20) + 2;
      oddAdNum = Math.floor((limit - 10) / 20) * 5;
      oddNumber = oddNum * 5;

      evenNumber = oddNumber + 2;
      evenAdNum = oddAdNum + 2;
    }

    if (limit % 20 !== 0) {
      temp = [
        ...list.slice(limit - oddNumber, limit - oddNumber + 3),
        ...adList.slice(oddAdNum, oddAdNum + 1),
        ...list.slice(limit - oddNumber + 3, limit - oddNumber + 6),
        ...adList.slice(oddAdNum + 1, oddAdNum + 2),
        ...list.slice(limit - oddNumber + 6, limit - oddNumber + 8),
      ];
    } else {
      temp = [
        ...list.slice(limit - evenNumber, limit - evenNumber + 1),
        ...adList.slice(evenAdNum, evenAdNum + 1),
        ...list.slice(limit - evenNumber + 1, limit - evenNumber + 4),
        ...adList.slice(evenAdNum + 1, evenAdNum + 2),
        ...list.slice(limit - evenNumber + 4, limit - evenNumber + 7),
        ...adList.slice(evenAdNum + 2, evenAdNum + 3),
      ];
    }

    return temp;
  };

  console.log(sliceContent(limit));

  useEffect(() => {
    // console.log("실행됨5");
    fetchPostList(1, order, type, limit);
    fetchADList(1, limit);
  }, [type, limit, order]);

  // 초기 렌더링
  useEffect(() => {
    setFeed(feed.concat(sliceContent(limit)));
  }, [list]);

  window.addEventListener("scroll", () => {
    let scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    let scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    let clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight === scrollHeight) {
      setLimit(limit + 10);
    } else if (scrollTop < 1) {
      // setLimit(10);
      // setFeed(feed.concat(...sliceContent(0, 0, adList)));
      // setFeedIndex(0);
      // setAdIndex(0);
    }
  });

  return (
    <main>
      <Nav />
      <div className="main__wrapper">
        <div className="main__login">
          <span>로그인</span>
        </div>
        <div className="main__container">
          <Filter
            type={type}
            setType={setType}
            order={order}
            setOrder={setOrder}
          />
          <>
            {feed.map((item, index) => (
              <div className="main__content" key={index}>
                {item.category_id ? (
                  <Link key={index} to={`/` + item.id}>
                    <div>
                      <div className="main__content--header">
                        <div>카테고리 : {item.category_id}</div>
                        <div>유저번호 : {item.user_id}</div>
                        <div>{item.created_at}</div>
                      </div>
                    </div>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.contents}</p>
                    </div>
                  </Link>
                ) : (
                  <div className="main__AD">
                    <img
                      className="main__AD--image"
                      src={`https://cdn.comento.kr/assignment/${item.img}`}
                      alt="cat"
                    />
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.contents}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </>
        </div>
      </div>
    </main>
  );
};

export default Main;
