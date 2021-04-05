import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getADList, getPostList } from "../api";
import "../Style/main.scss";
import "../Style/Ad.scss";
import Ad from "./Ad";
import Filter from "./Filter";
import Nav from "./Nav";

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState([1, 2, 3]);
  // category_id : 1 => apple
  // category_id : 2 => banana
  // category_id : 3 => coconut
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState("asc");
  const [list, setList] = useState([]);
  const [adList, setAdList] = useState([]);
  let timer = 1;

  const fetchPostList = async (pageNum, order, categoryNum, limitNum) => {
    let temp = await getPostList(pageNum, order, categoryNum, limitNum);
    setList(temp);
  };

  const fetchADList = async (pageNum, limitNum) => {
    let temp = await getADList(pageNum, limitNum);
    setAdList(temp);
  };

  const checkIsAd = (i) => {
    if (i % 4 === 2) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    setLoading(false);
    fetchPostList(1, order, type, limit);
  }, [type, limit, order]);

  useEffect(() => {
    fetchADList(1, limit);
  }, [limit]);

  const scrollEvent = () => {
    let scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    let scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    let clientHeight = document.documentElement.clientHeight;

    if (scrollHeight - scrollTop - clientHeight < 100) {
      // 여기서 쓰로틀링을 적용해주자.
      if (timer) {
        timer = setTimeout(function () {
          timer = null;
        }, 100);
        console.log("실행되나?");
      } else {
        setLimit(limit + 10);
        return;
      }
    }
  };

  window.addEventListener("scroll", scrollEvent);

  return (
    <main>
      {loading ? (
        <div>로딩중</div>
      ) : (
        <>
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
                {list.map((item, i) => (
                  <div>
                    <div className="main__content" key={i}>
                      <Link key={i} to={`/` + item.id}>
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
                    </div>
                    {checkIsAd(i) ? <Ad item={adList[(i - 2) / 4]} /> : null}
                  </div>
                ))}
              </>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Main;
