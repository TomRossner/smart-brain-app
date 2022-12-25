import React, { createContext, useState } from 'react';

export const ImageContext = createContext({
    imageURL: null,
    setImageURL: () => {}
});

export const ImageProvider = ({children}) => {
    const [imageURL, setImageURL] = useState(null);
    const value = {imageURL, setImageURL};
  return (
    <ImageContext.Provider value={value}>{children}</ImageContext.Provider>
  )
}