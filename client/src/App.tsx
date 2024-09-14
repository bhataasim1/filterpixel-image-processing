import React from "react";
import ImageUpload from "./components/ImageUpload";
import ImagePreview from "./components/ImagePreview";
import ImageControls from "./components/ImageControls";
import { ImageProvider } from "./context/useImageContext";

const App: React.FC = () => {
  return (
    <ImageProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Image Processing App</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <ImageUpload />
            <ImageControls />
          </div>
          <ImagePreview />
        </div>
      </div>
    </ImageProvider>
  );
};

export default App;
