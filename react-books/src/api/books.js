import {axiosInstance} from "./index";

//BOOKS endpoints methods
const endpoint = 'books';

export const booksAPI = {
  getBooks: async (page = 1) => {
    const response = await axiosInstance
      .get(endpoint, {
        params: {
          page: page,
        }
      });
    return response.data;
  },

  getBook: async (slug) => {
    const response = await axiosInstance
      .get(`${endpoint}/${slug}`);
    return response.data;
  },

}