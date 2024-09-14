import React from "react";
import { useImageContext } from "../context/useImageContext";


const ImagePreview: React.FC = () => {
  const { preview } = useImageContext();

//   console.log("ImagePreview rendered", `http://localhost:3000/${preview}`);

  return (
    <div className="h-64 bg-gray-100 flex items-center justify-center">
      {preview ? (
        <img
          src={preview}
          alt="Preview"
          className="max-h-full max-w-full object-contain"
        />
      ) : (
        <span>No image preview</span>
      )}
    </div>
  );
};

export default ImagePreview;
