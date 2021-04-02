import React from "react";
import "../Style/Filter.scss";
import Modal from "./Modal";

const Filter = () => {
  return (
    <div className="filter__wrapper">
      <div>
        <input type="radio" /> 오름차순
      </div>
      <div>
        <input type="radio" /> 내림차순
      </div>
      <div>
        <Modal />
      </div>
    </div>
  );
};

export default Filter;
