import axios from "axios";

const api = axios.create({
  baseURL: "https://problem.comento.kr",
  header: {
    Accept: "application/json",
  },
});

export const getPostList = async (pageNum, order, categoryNum, limitNum) => {
  const postList = await api.get("/api/list", {
    params: {
      page: pageNum,
      ord: order,
      category: categoryNum,
      limit: limitNum,
    },
  });
  return postList.data.data;
};

export const getCategoryList = async () => {
  const categoryList = await api.get("/api/category");
  return categoryList.data.category;
};

export const getADList = async (pageNum, limitNum) => {
  const ADList = await api.get("/api/ads", {
    params: {
      page: pageNum,
      limit: limitNum,
    },
  });
  return ADList.data.data;
};
