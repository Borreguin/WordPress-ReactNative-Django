import axios from "axios";

export const get = async (url) => {
  try {
    return await axios.get(url);
  } catch (error) {
    return error.response;
  }
};

export const post = async (url, body) => {
  try {
    return await axios.post(url, body);
  } catch (error) {
    return error.response;
  }
};
