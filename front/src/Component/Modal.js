import React from "react";
import "../Style/Modal.scss";

const Modal = ({
  modalOpen,
  onChangeType,
  onSubmitModal,
  setModalOpen,
  category,
}) => {
  console.log(modalOpen);

  return (
    <div className="modal">
      <div className="modal__background"></div>
      <div className="modal__wrapper">
        <div className="modal__btn" onClick={() => setModalOpen(false)}>
          <div className="modal__btn--close">X</div>
        </div>
        <div className="modal__container">
          <h2 className="modal__form--name">필터</h2>
          <form className="modal__form" onSubmit={onSubmitModal}>
            <div className="modal__container--input">
              <input
                className="modal__form--input"
                type="checkbox"
                id="type_1"
                checked={category === "1"}
                onChange={onChangeType}
                value="1"
              ></input>
              <label htmlFor="type_1">apple</label>
            </div>
            <div className="modal__container--input">
              <input
                className="modal__form--input"
                type="checkbox"
                id="type_2"
                checked={category === "2"}
                onChange={onChangeType}
                value="2"
              ></input>
              <label htmlFor="type_2">banana</label>
            </div>
            <div className="modal__container--input">
              <input
                className="modal__form--input"
                type="checkbox"
                id="type_3"
                checked={category === "3"}
                onChange={onChangeType}
                value="3"
              ></input>
              <label htmlFor="type_3">coconut</label>
            </div>
            <div className="modal__container--input">
              <button className="modal__btn--submit" type="submit">
                저장하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
