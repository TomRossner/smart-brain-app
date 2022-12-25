import React, { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ImageContext } from '../contexts/ImageContext';
import { stub, APP_ID, USER_ID, metadata } from '../index';

const Home = () => {
    const {currentUser} = useContext(AuthContext);
    const {imageURL, setImageURL} = useContext(ImageContext);
    const [inputFieldValue, setInputFieldValue] = useState("");

    const handleFileUpload = (e) => {
      const reader = new FileReader();
      const filesLength = e.target.files.length;
      reader.addEventListener("load", () => setImageURL(reader.result));
      if (filesLength) reader.readAsDataURL(e.target.files[0]);
      return reader.removeEventListener("load");
    };

    const handleInputChange = (e) => setInputFieldValue(e.target.value);
    const handleAddImg = () => {
      setImageURL(inputFieldValue);
      return setInputFieldValue("");
    };

    const handleDetect = () => {};


    stub.PostInputs(
      {
          user_app_id: {
              "user_id": USER_ID,
              "app_id": APP_ID
          },
          inputs: [
              { data: { image: { url: imageURL, allow_duplicate_url: true } } }
          ]
      },
      metadata,
      (err, response) => {
          if (err) {
              throw new Error(err);
          }
  
          if (response.status.code !== 10000) {
              console.log(response.status);
              throw new Error("Post inputs failed, status: " + response.status.description);
          }
      }
  
  );



  return (
    <div className='container'>
        <h1>Smart Brain</h1>
        <p>Face Recognition</p>
        <div className='input-container'>
        {currentUser ? <p>You current rank is {currentUser.entries}</p> : null}
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
            {imageURL ? <button type='button' className='btn' onClick={handleDetect}>Detect</button> : null}
            <img src={imageURL} alt=""/>
        </div>
    </div>
  )
}

export default Home;