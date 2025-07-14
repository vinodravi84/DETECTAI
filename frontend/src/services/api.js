import axios from "axios";

const apiUrl = "https://vinod1122-detectai.hf.space/api/predict";

export const predictImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  console.log("API URL:", apiUrl);


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
