import React from "react";

const Content = ({ item }) => {
  return (
    <div>
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
    </div>
  );
};

export default Content;
