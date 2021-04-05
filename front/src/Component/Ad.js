import React from "react";
import "../Style/Ad.scss";

const Ad = ({ item }) => {
  return (
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
  );
};

export default Ad;
