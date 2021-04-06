import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { getPostDetail } from "../api";
import "../Style/detail.scss";
import Nav from "./Nav";

const Detail = ({
  match: {
    params: { id },
  },
}) => {
  const [detail, setDetail] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchPostDetail = async (id) => {
    const temp = await getPostDetail(id);
    console.log(temp);
    setDetail(temp);
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    fetchPostDetail(id);
  }, []);

  return (
    <>
      {loading ? (
        <div>로딩중...</div>
      ) : (
        <div>
          <Nav />
          <div className="detail__wrapper">
            <div className="detail__content">
              <div className="detail__content--title">{detail.title}</div>
              <div className="detail__content--description">
                {detail.contents}
              </div>
              <div className="detail__content--date">
                created_at({detail.created_at.substring(0, 10)})
              </div>
            </div>
            <div className="reply__container">
              <div className="reply__number">
                {`답변 ` + detail.reply.length}
              </div>
              {detail.reply.map((item, i) => (
                <div className="reply__content">
                  <div className="reply__content--name">{item.user.name}</div>
                  <hr />
                  <div className="reply__content--description">
                    {item.contents}
                  </div>
                  <div className="reply__content--date">
                    created_at({item.created_at.substring(0, 10)})
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default withRouter(Detail);
