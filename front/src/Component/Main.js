import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPostList, getADList } from "../api";
import "../Style/main.scss";
import "../Style/Ad.scss";
import Ad from "./Ad";
import Filter from "./Filter";
import Nav from "./Nav";
import ListContext, { ListConsumer } from "../Context/List";
import Content from "./Content";

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState([1, 2, 3]);
  // category_id : 1 => apple
  // category_id : 2 => banana
  // category_id : 3 => coconut
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState("asc");
  const { state, actions } = useContext(ListContext);
  const [adList, setAdList] = useState([]);
  const [timer, changeTimer] = useState(true);

  const checkIsAd = (i) => i % 4 === 2;
  const fetchPostList = async (pageNum, order, categoryNum, limitNum) => {
    const temp = await getPostList(pageNum, order, categoryNum, limitNum);
    actions.setList(temp);
  };

  const fetchADList = async (pageNum, limitNum) => {
    const temp = await getADList(pageNum, limitNum);
    setAdList(temp);
  };

  useEffect(() => {
    fetchPostList(1, order, type, limit);
  }, [type, limit, order]);

  useEffect(() => {
    fetchADList(1, limit);
  }, [limit]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    const scrollEvent = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollHeight - scrollTop - clientHeight < 100) {
        if (timer) {
          setTimeout(() => changeTimer(false), 2000);
        } else {
          changeTimer(true);
          setLimit(limit + 10);
        }
      }
    };
    window.addEventListener("scroll", scrollEvent);
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, [timer]);

  return (
    <main>
      {loading ? (
        <div>로딩중...</div>
      ) : (
        <div>
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
              {state.list.map((item, i) => (
                <div className="main__content" key={item.id}>
                  <Link to={`/` + item.id}>
                    <Content item={item} />
                  </Link>
                  {checkIsAd(i) ? <Ad item={adList[(i - 2) / 4]} /> : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Main;
