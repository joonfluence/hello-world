import axios from "axios";

const api = axios.create({
  baseURL: "https://problem.comento.kr",
  header: {
    Accept: "application/json",
  },
});

export const getPostList = async () => {
  const postList = await api.get("/api/list", {
    params: {
      page: 1,
      ord: "asc",
      category: [1],
      limit: 3,
    },
  });
  return postList.data.data;
};

export const getCategoryList = async () => {
  const categoryList = await api.get("/api/category");
  return categoryList.data.category;
};

export const getADList = async () => {
  const ADList = await api.get("/api/ads", {
    params: {
      page: 1,
      limit: 1,
    },
  });
  return ADList.data.data;
};
