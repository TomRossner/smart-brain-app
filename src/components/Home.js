import React, { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ImageContext } from '../contexts/ImageContext';

const Home = () => {
    const {currentUser} = useContext(AuthContext);
    const {imageURL, setImageURL} = useContext(ImageContext);
    const [inputFieldValue, setInputFieldValue] = useState("");

    const handleFileUpload = (e) => {
      const reader = new FileReader();
      const filesLength = e.target.files.length;
      reader.addEventListener("load", () => setImageURL(reader.result));
      if (filesLength) reader.readAsDataURL(e.target.files[0]);
      return reader.removeEventListener("load", () => {});
    };

    const handleInputChange = (e) => setInputFieldValue(e.target.value);
    const handleAddImg = () => {
      if (!inputFieldValue) return;
      setImageURL(inputFieldValue);
      return setInputFieldValue("");
    };
    

  return (
    <div className='container'>
        <div className='input-container'>
        {currentUser ? <p>{currentUser.name.toUpperCase()}, your current rank is {currentUser.entries}</p> : null}
            <div className='insert-img-url'>
              <input type="text" placeholder='Insert image URL' value={inputFieldValue} onChange={handleInputChange}/>
              <button type='button' id='add-img' className='btn' onClick={handleAddImg}>Add</button>
            </div>
            <div className='upload-from-computer'>
              <span className='or'>OR</span>
              <label className='btn' htmlFor='uploadFromComputer'>Upload from computer</label>
            </div>
            <input
              type="file"
              placeholder='Insert image URL'
              id='uploadFromComputer'
              accept='image/png, image/jpg, image/jpeg'
              onChange={handleFileUpload}
            />
        </div>

        <div className='image-container'>
            {imageURL ? <button type='button' className='btn'>Detect</button> : null}
            <img src={imageURL} alt=""/>
        </div>
    </div>
  )
}

export default Home;