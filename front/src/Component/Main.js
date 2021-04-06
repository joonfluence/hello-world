import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPostList, getADList } from "../api";
import "../Style/main.scss";
import "../Style/Ad.scss";
import Ad from "./Ad";
import Filter from "./Filter";
import Nav from "./Nav";

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState([1, 2, 3]);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState("asc");
  const [list, setList] = useState([]);
  const [adList, setAdList] = useState([]);
  const [timer, changeTimer] = useState(true);

  const CATEGORY_ID_1 = "apple";
  const CATEGORY_ID_2 = "banana";
  const CATEGORY_ID_3 = "coconut";

  const checkIsAd = (i) => i % 4 === 2;
  const fetchPostList = async (pageNum, order, categoryNum, limitNum) => {
    const temp = await getPostList(pageNum, order, categoryNum, limitNum);
    setList(temp);
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
              {list.map((item, i) => (
                <>
                  <div className="main__content--wrapper" key={item.id}>
                    <Link to={`/` + item.id}>
                      <div className="main__header">
                        <div>
                          <div className="main__header--container">
                            <div className="main__header--category">
                              {item.category_id === 1
                                ? CATEGORY_ID_1
                                : item.category_id === 2
                                ? CATEGORY_ID_2
                                : CATEGORY_ID_3}
                            </div>
                            <div className="main__header--id">{item.id}</div>
                          </div>
                          <div className="main__header--container">
                            <div className="main__header--userID">
                              {item.user_id}
                            </div>
                            <div className="main__header--date">
                              created_at({item.created_at.substring(0, 10)})
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="main__content--container">
                        <h3 className="main__content--title">{item.title}</h3>
                        <div className="main__content--description">
                          {item.contents}
                        </div>
                      </div>
                    </Link>
                  </div>
                  {checkIsAd(i) ? <Ad item={adList[(i - 2) / 4]} /> : null}
                </>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Main;
