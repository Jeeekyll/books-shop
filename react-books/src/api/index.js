import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  withCredentials: true,
  headers: {
    "Accept": "application/json"
  }
});

//to init Sanctum csrf
export const getCsrfToken = async () => {
  return await axios
    .get('http://127.0.0.1:8000/sanctum/csrf-cookie', {
      withCredentials: true,
    });
};
