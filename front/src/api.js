import axios from "axios";

const api = axios.create({
  baseURL: "https://problem.comento.kr",
  header: {
    Accept: "application/json",
  },
});

export const getPostList = async (pageNum, order, categoryNum, limitNum) => {
  const {
    data: { data },
  } = await api.get("/api/list", {
    params: {
      page: pageNum,
      ord: order,
      category: categoryNum,
      limit: limitNum,
    },
  });
  return data;
};

export const getPostDetail = async (id) => {
  const {
    data: { data },
  } = await api.get("/api/view", {
    params: {
      id,
    },
  });
  return data;
};

export const getCategoryList = async () => {
  const {
    data: { category },
  } = await api.get("/api/category");
  return category;
};

export const getADList = async (pageNum, limitNum) => {
  const {
    data: { data },
  } = await api.get("/api/ads", {
    params: {
      page: pageNum,
      limit: limitNum,
    },
  });
  return data;
};
