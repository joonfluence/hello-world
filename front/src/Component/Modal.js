import React, { useState } from "react";

const Modal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [type, setType] = useState("");

  const onChangeType = (e) => {
    setType(e.target.value);
  };

  const onSubmitModal = () => {
    // 여기서 해당 카테고리의 데이터를 받아와야 한다.
    // getPostList(1, "asc", type, 100);
  };

  return (
    <div>
      <button onClick={() => setModalOpen(true)}>필터</button>
      {modalOpen && (
        <div>
          <div className="modal__background"></div>
          <div className="modal__wrapper">
            <div
              className="modal__close__btn"
              onClick={() => setModalOpen(false)}
            >
              <div>X</div>
            </div>
            <div className="content__container">
              <h2>조회를 원하는 달을 선택하세요</h2>
              <form onSubmit={onSubmitModal}>
                <label>category_name</label>
                <input
                  className="form__input"
                  type="radio"
                  name="year"
                  onChange={onChangeType}
                  value="1"
                ></input>
                <label>category_name</label>
                <input
                  className="form__input"
                  type="radio"
                  name="month"
                  onChange={onChangeType}
                  value="2"
                ></input>
                <label>category_name</label>
                <input
                  className="form__input"
                  type="radio"
                  name="month"
                  onChange={onChangeType}
                  value="2"
                ></input>
                <button type="submit">전송</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
