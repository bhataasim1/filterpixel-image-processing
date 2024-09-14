import React, { createContext, useState, useContext } from "react";

interface ImageContextType {
  image: string | null;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
  preview: string | null;
  setPreview: React.Dispatch<React.SetStateAction<string | null>>;
  operations: ImageOperations;
  setOperations: React.Dispatch<React.SetStateAction<ImageOperations>>;
}

interface ImageOperations {
  brightness?: number;
  saturation?: number;
  rotate?: number;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [operations, setOperations] = useState<ImageOperations>({});

  return (
    <ImageContext.Provider
      value={{
        image,
        setImage,
        preview,
        setPreview,
        operations,
        setOperations,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImageContext must be used within an ImageProvider");
  }
  return context;
};
