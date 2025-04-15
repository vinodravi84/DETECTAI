import axios from "axios";

const apiUrl = "http://127.0.0.1:8000/api/predict";

export const predictImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(apiUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in predicting image:", error);
    throw error;
  }
};
