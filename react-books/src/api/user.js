import {getCsrfToken} from "./index";
import {axiosInstance} from "./index";

//USER endpoints methods

export const userAPI = {
  getUser: async (token) => {
    const response = await axiosInstance
      .get('me', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
    return response.data;
  },

  logout: async (token) => {
    await getCsrfToken();
    const response = await axiosInstance
      .post('logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
    return response.data;
  },

  login: async (data) => {
    await getCsrfToken();
    const response = await axiosInstance
      .post('login', {...data});
    return response.data;
  },

  register: async (data) => {
    await getCsrfToken();
    const response = await axiosInstance
      .post('register', {...data});
    return response.data;
  },

  getAuthUser: async (token) => {
    await getCsrfToken();
    const response = await axiosInstance
      .get('user', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
    return response.data;
  }
};