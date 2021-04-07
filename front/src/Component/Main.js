import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPostList, getADList } from "../api";
import "../Style/main.scss";
import "../Style/Ad.scss";
import "../Style/Modal.scss";
import Ad from "./Ad";
import Filter from "./Filter";
import Nav from "./Nav";

const Main = () => {
  const [type, setType] = useState([1, 2, 3]);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState("asc");
  const [list, setList] = useState([]);
  const [adList, setAdList] = useState([]);
  const [timer, changeTimer] = useState(true);

  const CATEGORY_ID_1 = "apple";
  const CATEGORY_ID_2 = "banana";
  const CATEGORY_ID_3 = "coconut";

  const fetchADList = async (pageNum, limitNum) => {
    const temp = await getADList(pageNum, limitNum);
    setAdList(temp);
  };

  const fetchPostList = async (pageNum, order, categoryNum, limitNum) => {
    const temp = await getPostList(pageNum, order, categoryNum, limitNum);
    setList(temp);
  };

  const checkIsAd = (i) => i % 4 === 2;

  useEffect(() => {
    fetchADList(1, limit);
  }, [limit]);

  useEffect(() => {
    fetchPostList(1, order, type, limit);
  }, [type, limit, order]);

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
    <>
      <Nav />
      <main className="main">
        <div className="main__wrapper">
          <div className="main__login">
            <span>로그인</span>
          </div>
          <div className="main__wrapper--container">
            <Filter
              type={type}
              setType={setType}
              order={order}
              setOrder={setOrder}
            />
            {list.length > 0 &&
              list.map((item, i) => (
                <div className="main__wrapper--ad">
                  <div className="main__wrapper--content" key={item.id}>
                    <Link to={`/` + item.id}>
                      <div className="main__header">
                        <div className="main__header--top">
                          <div className="main__header--category">
                            {item.category_id === 1
                              ? CATEGORY_ID_1
                              : item.category_id === 2
                              ? CATEGORY_ID_2
                              : CATEGORY_ID_3}
                          </div>
                          <div className="main__header--id">{item.id}</div>
                        </div>
                        <div className="main__header--line"></div>
                        <div className="main__header--bottom">
                          <div className="main__header--userID">
                            {item.user_id}
                          </div>
                          <div className="main__header--vertical"></div>
                          <div className="main__header--date">
                            created_at({item.created_at.substring(0, 10)})
                          </div>
                        </div>
                      </div>
                      <div className="main__content">
                        <h3 className="main__content--title">{item.title}</h3>
                        <div className="main__content--description">
                          {item.contents}
                        </div>
                      </div>
                    </Link>
                  </div>
                  {adList.length > 0 && checkIsAd(i) ? (
                    <Ad item={adList[(i - 2) / 4]} />
                  ) : null}
                </div>
              ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Main;
