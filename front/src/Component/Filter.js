import React, { useState } from "react";
import "../Style/Modal.scss";
import Modal from "./Modal";

const Filter = ({ type, setType, order, setOrder }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState(type);

  const onChangeType = (e) => {
    setCategory(e.target.value);
  };

  const onSubmitModal = (e) => {
    e.preventDefault();
    setType([Number(category)]);
    setModalOpen(false);
  };

  const onChangeOrder = (e) => {
    setOrder(e.target.value);
  };
  return (
    <div className="filter__wrapper">
      <div className="filter__order">
        <input
          id="asc"
          type="radio"
          checked={order === "asc"}
          value="asc"
          onChange={onChangeOrder}
        />
        <label htmlFor="asc">오름차순</label>
      </div>
      <div className="filter__order">
        <input
          id="des"
          type="radio"
          checked={order === "des"}
          value="des"
          onChange={onChangeOrder}
        />
        <label htmlFor="des">내림차순</label>
      </div>
      <div className="filter__btn">
        <button onClick={() => setModalOpen(!modalOpen)}>필터</button>
        {modalOpen && (
          <Modal
            category={category}
            onChangeType={onChangeType}
            onSubmitModal={onSubmitModal}
            setModalOpen={setModalOpen}
          />
        )}
      </div>
    </div>
  );
};

export default Filter;
