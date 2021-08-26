import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  withCredentials: true,
  headers: {
    "Accept": "application/json"
  }
});

//to init Sanctum csrf
const getCsrfToken = async () => {
  return await axiosInstance
    .get('sanctum/csrf-cookie');
};

//USER endpoints methods
export const userAPI = {
  getUser: async (token) => {
    const response = await axiosInstance
      .get('api/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
    return response.data;
  },

  logout: async (token) => {
    await getCsrfToken();
    const response = await axiosInstance
      .post('api/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
    return response.data;
  },

  login: async (data) => {
    await getCsrfToken();
    const response = await axiosInstance
      .post('api/login', {...data});
    return response.data;
  },

  register: async (data) => {
    await getCsrfToken();
    const response = await axiosInstance
      .post('api/register', {...data});
    return response.data;
  },

};

//BOOKS endpoints methods
export const booksAPI = {
  getBooks: async (page = 1) => {
    const response = await axiosInstance
      .get(`api/books`, {
        params: {
          page: page,
        }
      });
    return response.data;
  },

  getBook: async (slug) => {
    const response = await axiosInstance
      .get(`api/books/${slug}`);
    return response.data;
  },


}

//CATEGORIES endpoints methods

export const categoriesAPI = {

  getCategories: async () => {
    const response = await axiosInstance.get('api/categories');
    return response.data;
  },

  getCategory: async (slug) => {
    //const response =
  }

}

export default axiosInstance;
