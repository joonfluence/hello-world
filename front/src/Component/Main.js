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
  const [feedIndex, setFeedIndex] = useState(0);
  const [adIndex, setAdIndex] = useState(0);
  const [feed, setFeed] = useState([]);
  let feedTemp = [];

  const fetchPostList = async (pageNum, order, categoryNum, limitNum) => {
    let temp = await getPostList(pageNum, order, categoryNum, limitNum);
    setList(temp);
  };

  const fetchADList = async (pageNum, limitNum) => {
    let temp = await getADList(pageNum, limitNum);
    setAdList(temp);
  };

  const sliceContent = (index, adIndex, newItem) => {
    let temp = [
      ...list.slice(index, index + 3),
      ...newItem.slice(adIndex, adIndex + 1),
      ...list.slice(index + 3, index + 6),
      ...newItem.slice(adIndex + 1, adIndex + 2),
      ...list.slice(index + 6, index + 9),
      ...newItem.slice(adIndex + 2, adIndex + 3),
    ];
    return temp;
  };

  useEffect(() => {
    fetchPostList(1, order, type, limit);
    fetchADList(1, limit);
  }, [type, limit, order]);

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
      // setFeedIndex(feedIndex + 3);
      // setAdIndex(adIndex + 2);
      setLimit(limit + 10);
    } else if (scrollTop < 1) {
      // setLimit(10);
      // setFeedIndex(0);
      setAdIndex(0);
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
            {list.map((item, index) => (
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
