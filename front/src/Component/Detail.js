import React, { useContext, useEffect } from "react";
import { withRouter } from "react-router";
import ListContext from "../Context/List";
import "../Style/detail.scss";
import Content from "./Content";

const Detail = ({
  match: {
    params: { id },
  },
}) => {
  const { state } = useContext(ListContext);

  useEffect(() => {
    console.log(state.list);
    // 여기서 call을 해줘야 한다. 혹은 Context에서 보관 중인 상태를 불러와야 한다.
    // 그리고 해당 정보를 불러와줘야 한다.
    // 여기서 id와 일치한 item만 렌더링해주면 된다.
    // 여기서 context를 활용할 수 있을 것이다.
    // const {
    // } = props;
    // console.log(id);
  }, []);

  return (
    <div>
      {state.list.map((item, i) => (
        <>
          {parseInt(id) === item.id ? (
            <div className="main__content" key={item.id}>
              <Content item={item} />
            </div>
          ) : null}
        </>
      ))}
    </div>
  );
};
export default withRouter(Detail);
