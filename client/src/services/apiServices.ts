import axios from "axios";

const API_URL = "http://localhost:3000/api/image";

export type operations = {
  brightness?: number;
  saturation?: number;
  rotate?: number;
};

export const uploadImage = async (
  file: File
): Promise<{ filePath: string }> => {
  const formData = new FormData();
  formData.append("image", file);
  const response = await axios.post<{ filePath: string }>(
    `${API_URL}/upload`,
    formData
  );
  return response.data;
};

export const processImage = async (
  filePath: string,
  operations: operations
): Promise<{ preview: string }> => {
  const response = await axios.post<{ preview: string }>(`${API_URL}/process`, {
    filePath,
    operations,
  });
  return response.data;
};

export const downloadImage = async (
  format: string
): Promise<Blob> => {
  const response = await axios.get(`${API_URL}/download`, {
    params: {  format },
    responseType: "blob",
  });
  return response.data;
};
