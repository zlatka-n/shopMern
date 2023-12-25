import { axiosInstance } from './axios';

export const getSuggestions = async (keyword: string) => {
  try {
    const { data } = await axiosInstance.get<any>(
      `suggestions?keyword=${keyword}`
    );
    return data;
  } catch (err) {
    throw err;
  }
};
