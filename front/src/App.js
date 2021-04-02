import React, { useEffect, useState } from "react";
import "./App.scss";
import axios from "axios";

function App() {
  const [list, setList] = useState([]);
  const api = axios.create({
    baseURL: "https://problem.comento.kr",
    header: {
      Accept: "application/json",
    },
  });

  const getPostList = async () => {
    const temp = await api.get("/api/list", {
      params: {
        page: 1,
        ord: "asc",
        category: [1],
        limit: 10,
      },
    });
    setList(temp.data.data);
    console.log(list);
  };

  const getCategoryList = async () => {
    const categoryList = await api.get("/api/category");
  };

  useEffect(() => {
    getPostList();
  }, []);

  // getCategoryList();

  return (
    <div className="App">
      {list.map((item, index) => (
        <div key={index}>
          <li> {item.id}</li>
          <li> {item.contents}</li>
          <li> {item.title}</li>
        </div>
      ))}
    </div>
  );
}

export default App;
