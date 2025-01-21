import React, { createContext, PropsWithChildren, useContext, useState } from 'react';

// Define the context type
interface CameraContextType {
  picture: string;
  setPicture: (img: string) => void;
}

// Initialize the context with a proper default value
const CameraContext = createContext<CameraContextType>({
  picture: "",
  setPicture: () => {}
});

export const CameraProvider = ({ children }: PropsWithChildren) => {
  const [picture, setPicture] = useState("");

  return (
    <CameraContext.Provider value={{ picture, setPicture }}>
      {children}
    </CameraContext.Provider>
  );
};

export default CameraProvider;

// Custom hook to use the CameraContext
export const useCameraImage = () => useContext(CameraContext);
