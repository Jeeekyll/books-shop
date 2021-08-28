import {axiosInstance} from "./index";

//CATEGORIES endpoints methods
const endpoint = 'categories';

export const categoriesAPI = {

  getCategories: async () => {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  },

  getCategory: async (slug) => {
    const response = await axiosInstance.get(`${endpoint}/${slug}`);
    return response.data;
  },
}