import { axiosInstance } from './axios';
import { Book } from './types';

export const getSuggestions = async (keyword: string) => {
  try {
    const { data } = await axiosInstance.get<Book[]>(
      `suggestions?keyword=${keyword}`
    );
    return data;
  } catch (err) {
    throw err;
  }
};
