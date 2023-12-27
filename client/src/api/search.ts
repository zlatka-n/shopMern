import { axiosInstance } from './axios';

export const getSuggestions = async (keyword: string) => {
  try {
    const { data } = await axiosInstance.get<string[]>(
      `suggestions?keyword=${keyword}`
    );
    return data;
  } catch (err) {
    throw err;
  }
};
