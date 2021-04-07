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
    setOrder(e.target.attributes[1].value);
  };
  return (
    <div className="filter__wrapper">
      <div className="filter__order">
        <input
          id="asc"
          className="filter__order--checkbox"
          type="checkbox"
          checked={order === "asc"}
          value="asc"
          onChange={onChangeOrder}
        />
        <label className="filter__order--button" htmlFor="asc"></label>
        <span
          className="filter__order--label"
          value="asc"
          onClick={onChangeOrder}
        >
          오름차순
        </span>
      </div>
      <div className="filter__order">
        <input
          id="des"
          className="filter__order--checkbox"
          type="checkbox"
          checked={order === "des"}
          value="des"
          onChange={onChangeOrder}
        />
        <label className="filter__order--button" htmlFor="des"></label>
        <span
          className="filter__order--label"
          value="des"
          onClick={onChangeOrder}
        >
          내림차순
        </span>
      </div>
      <div className="filter__btn">
        <button
          className="filter__btn--open"
          onClick={() => setModalOpen(!modalOpen)}
        >
          필터
        </button>
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
