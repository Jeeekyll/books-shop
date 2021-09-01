import { axiosInstance, getCsrfToken } from "./index";

//BOOKS endpoints methods
const endpoint = "books";

export const booksAPI = {
  getBooks: async (page = 1, sort = "date") => {
    const response = await axiosInstance.get(endpoint, {
      params: {
        page: page,
        sort: sort,
      },
    });
    return response.data;
  },

  getBook: async (slug) => {
    const response = await axiosInstance.get(`${endpoint}/${slug}`);
    return response.data;
  },

  createBook: async (data, token) => {
    await getCsrfToken();
    const response = await axiosInstance.post(endpoint, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  deleteBook: async (id, token) => {
    await getCsrfToken();
    const response = await axiosInstance.delete(`${endpoint}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  updateBook: async (id, data, token) => {
    await getCsrfToken();
    const response = await axiosInstance.post(`${endpoint}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};
