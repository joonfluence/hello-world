import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getADList, getPostList } from "../api";
import "../Style/main.scss";
import Filter from "./Filter";
import Nav from "./Nav";

const Main = () => {
  const [type, setType] = useState("1");
  // category_id : 1 => apple
  // category_id : 2 => banana
  // category_id : 3 => coconut
  const [limit, setLimit] = useState(10);
  const [list, setList] = useState([]);
  const [adList, setAdList] = useState([]);

  const fetchPostList = async (pageNum, order, categoryNum, limitNum) => {
    let temp = await getPostList(pageNum, order, categoryNum, limitNum);
    setList(temp);
  };

  const fetchADList = async (pageNum, limitNum) => {
    let temp = await getADList(pageNum, limitNum);
    setAdList(temp);
  };

  useEffect(() => {
    fetchPostList(1, "asc", Number(type), limit);
    fetchADList(1, limit);
  }, [type, limit]);

  const infiniteScroll = () => {
    let scrollHeight = document.documentElement.scrollHeight;
    let scrollTop = document.documentElement.scrollTop;
    let clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight === scrollHeight) {
      setLimit(limit + 10);
    } else if (scrollTop < 1) {
      setLimit(10);
    }
  };

  window.addEventListener("scroll", infiniteScroll);

  return (
    <main>
      <Nav />
      <div className="main__wrapper">
        <div className="main__login">
          <span>로그인</span>
        </div>
        <div className="main__container">
          <Filter type={type} setType={setType} />
          {list.map((item, index) => (
            <div className="main__content" key={index}>
              <Link key={index} to={`/` + item.id}>
                <div>
                  <div className="main__content--header">
                    <div>카테고리 : {item.category_id}</div>
                    <div>유저번호 : {item.user_id}</div>
                    <div>{item.created_at}</div>
                  </div>
                  <h3>{item.title}</h3>
                </div>
                <div>{item.contents}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      {/* {adList.map((item, index) => (
        <div key={index}>{item.contents}</div>
      ))} */}
    </main>
  );
};

export default Main;
