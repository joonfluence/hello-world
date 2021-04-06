import React from "react";
import "../Style/Ad.scss";

const Ad = ({ item }) => {
  return (
    <div className="main__AD">
      <div className="main__AD--container">
        <img
          className="main__AD--image"
          src={`https://cdn.comento.kr/assignment/${item.img}`}
          alt="cat"
        />
      </div>
      <div className="main__AD--container">
        <div className="main__AD--title">{item.title}</div>
        <p className="main__AD--description">{item.contents}</p>
      </div>
    </div>
  );
};

export default Ad;
