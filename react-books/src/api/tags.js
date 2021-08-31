import { axiosInstance } from "./index";

//TAGS endpoints methods
const endpoint = "tags";

export const tagsAPI = {
  getTags: async () => {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  },
};
