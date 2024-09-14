import React, { useState } from "react";
import { useImageContext } from "../context/useImageContext";
import { downloadImage, processImage } from "../services/apiServices";

const ImageControls: React.FC = () => {
  const { image, setPreview, operations, setOperations } = useImageContext();
  const [format, setFormat] = useState<string>("jpeg"); // Default format

  const adjustments = ["brightness", "saturation", "rotate"];

  const handleSliderChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedOperations = { ...operations, [name]: parseFloat(value) };
    setOperations(updatedOperations);

    if (image) {
      try {
        const result = await processImage(image, updatedOperations);
        // console.log("ImageControls result", result.preview);
        if (result && result.preview) {
          setPreview(result.preview);
        } else {
          console.error("Error: No preview returned from processImage.");
        }
      } catch (error) {
        console.error("Error processing image:", error);
      }
    }
  };

  const handleDownload = async () => {
    if (image) {
      try {
        const blob = await downloadImage(format);
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `processed_image.${format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading image:", error);
      }
    }
  };

  return (
    <div className="space-y-4">
      {adjustments.map((operation) => (
        <div key={operation}>
          <label
            htmlFor={operation}
            className="block text-sm font-medium text-gray-700 capitalize"
          >
            {operation}
          </label>
          <input
            type="range"
            id={operation}
            name={operation}
            step="0.1"
            value={
              operations[operation as keyof typeof operations] ||
              (operation === "rotate" ? 0 : 1)
            }
            min={
              operation === "brightness" || operation === "saturation"
                ? "0"
                : "-180"
            }
            max={
              operation === "brightness" || operation === "saturation"
                ? "2"
                : "180"
            }
            onChange={handleSliderChange}
            className="w-full cursor-pointer"
          />
        </div>
      ))}
      <div className="mt-4">
        <label
          htmlFor="format"
          className="block text-sm font-medium text-gray-700"
        >
          Select Format
        </label>
        <select
          id="format"
          name="format"
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className="w-full mt-1 border-gray-300 rounded-md shadow-sm"
        >
          <option value="jpeg">JPEG</option>
          <option value="png">PNG</option>
        </select>
      </div>
      <button
        onClick={handleDownload}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Download Processed Image
      </button>
    </div>
  );
};

export default ImageControls;
