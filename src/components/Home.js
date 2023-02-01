import React, { useEffect, useRef, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ImageContext } from '../contexts/ImageContext';
import { httpService, updateUser } from '../http/frontRequests';
import BoundingBox from './BoundingBox';

const Home = () => {
    const {currentUser, setCurrentUser} = useContext(AuthContext);
    const {imageURL, setImageURL} = useContext(ImageContext);
    const [inputFieldValue, setInputFieldValue] = useState("");
    const [boundingBoxes, setBoundingBoxes] = useState([]);
    const imgRef = useRef(null);
    const {post} = httpService;
    const [error, setError] = useState("");

    const handleFileUpload = (e) => {
      const reader = new FileReader();
      const filesLength = e.target.files.length;
      reader.addEventListener("load", () => setImageURL(reader.result));
      if (filesLength) reader.readAsDataURL(e.target.files[0]);
      if (boundingBoxes.length) resetBoundingBoxes();
      return reader.removeEventListener("load", () => {});
    }

    const handleInputChange = (e) => setInputFieldValue(e.target.value);

    const handleAddImage = () => {
      if (!inputFieldValue) return;
      if (boundingBoxes.length) resetBoundingBoxes();
      if (error) resetError();
      setImageURL(inputFieldValue);
      return setInputFieldValue("");
    }

    const resetBoundingBoxes = () => setBoundingBoxes([]);
    const resetError = () => setError("");

    const predictImage = async () => {
      try {
        const {data: {results}} = await post(imageURL.substring(0, 5) === "https"
        ? "/predict"
        : "/predict-bytes", {
          imageURL: imageURL
        });
        const calculatedResults = results[0].map(result => {
          const {region_info: {bounding_box}} = result;
          return calculateFaceLocation(bounding_box);
        });
        if (error) resetError();
        setBoundingBoxes(calculatedResults);
      } catch ({response: {data: {error}}}) {
        return setError(error);
      }
    }

    const handleDetect = async () => {
      setCurrentUser({...currentUser, predictions: currentUser.predictions + 1});
      await predictImage();
      return await updateUser(currentUser);
    }

    const calculateFaceLocation = (face) => {
      const image = imgRef.current;
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        left: face.left_col * width,
        top: face.top_row * height,
        right: width - (face.right_col * width),
        bottom: height - (face.bottom_row * height)
      }
    }

  return (
    <div className='container'>
        <div className='input-container'>
        {currentUser ?
        <>
          <h2>Welcome back, {currentUser.name.substring(0, 1).toUpperCase() + currentUser.name.substring(1, currentUser.name.length)}.</h2>
          <p> So far, you have made {currentUser.predictions} submissions</p>
        </> : null}
            <div className='insert-img-url'>
              <input type="text" placeholder='Insert image URL' value={inputFieldValue} onChange={handleInputChange}/>
              <button type='button' id='add-img' className='btn' onClick={handleAddImage}>Add</button>
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
        {error && <p className='error'>{error}</p>}
        {imageURL ? <button type='button' id='detect' className='btn' onClick={handleDetect}>Detect</button> : null}
        <div className='image-container'>
            <img src={imageURL} ref={imgRef} alt=""/>
            {boundingBoxes.map((box, index) => <BoundingBox key={index} box={box}/>)}
        </div>
    </div>
  )
}

export default Home;