import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getADList, getPostList } from "../api";
import "../Style/main.scss";
import Filter from "./Filter";
import Nav from "./Nav";

const Main = () => {
  const [list, setList] = useState([]);
  const [loadingList, setLoadingList] = useState([]);
  const [adList, setAdList] = useState([]);
  let temp = [];

  const fetchPostList = async (pageNum, order, categoryNum, limitNum) => {
    let temp = await getPostList(pageNum, order, categoryNum, limitNum);
    console.log(temp);
    setList(temp);
  };

  const fetchADList = async () => {
    let temp = await getADList();
    setAdList(temp);
  };

  useEffect(() => {
    fetchPostList(1, "asc", 3, 1);
    // fetchADList();
  }, []);

  // category_id : 1 => apple
  // category_id : 2 => banana
  // category_id : 3 => coconut
  // 이걸로 바꿔서 return 해주면 됨. 따라서 category는 불러올 필요 없음.

  console.log(list);
  for (let i = 0; i < 10; i++) {
    temp.push(list[i]);
  }

  console.log(temp);
  // setLoadingList(temp);
  // console.log(adList);

  return (
    <main>
      <Nav />
      <div className="main__wrapper">
        <div className="main__login">
          <span>로그인</span>
        </div>
        <div className="main__container">
          <Filter />
          {list.map((item, index) => (
            <div>
              <Link key={index} to={`/` + item.id}>
                {item.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
      {adList.map((item, index) => (
        <div key={index}>{item.contents}</div>
      ))}
    </main>
  );
};

export default Main;
