import React from "react";
import { useImageContext } from "../context/useImageContext";
import { uploadImage } from "../services/apiServices";
import { toast } from "react-hot-toast";

const ImageUpload: React.FC = () => {
  const { setImage, setPreview } = useImageContext();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const result = await uploadImage(file); 
      console.log("ImageUpload result", result);

      if (result.filePath) {
        setImage(result.filePath);
        setPreview(`http://localhost:3000/${result.filePath}`);
        toast.success("Image uploaded successfully!");
      }
    }
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        accept="image/png,image/jpeg"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-violet-50 file:text-violet-700
                   hover:file:bg-violet-100"
      />
    </div>
  );
};

export default ImageUpload;
