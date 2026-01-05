import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const callApi = async (url, method = "POST", body = null) => {
  try {
    const response = await axios({
      method: method,                           
      url: `${API_BASE_URL}${url}`,
      data: body,                               
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
