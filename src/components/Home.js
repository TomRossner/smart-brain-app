import React, { useRef, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ImageContext } from '../contexts/ImageContext';
import { httpService } from '../utils/api';
import BoundingBox from './BoundingBox';

const Home = () => {
    const {currentUser} = useContext(AuthContext);
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
    };

    const handleInputChange = (e) => setInputFieldValue(e.target.value);

    const handleAddImg = () => {
      if (!inputFieldValue) return;
      if (boundingBoxes.length) resetBoundingBoxes();
      if (error) resetError();
      setImageURL(inputFieldValue);
      return setInputFieldValue("");
    };

    const resetBoundingBoxes = () => setBoundingBoxes([]);
    const resetError = () => setError("");

    const predictImage = async () => {
      try {
        const {data: {results}} = await post("/predict", {
          imageURL: imageURL
        });
        const calculatedResults = results[0].map(result => {
          const {region_info: {bounding_box}} = result;
          return calculateFaceLocation(bounding_box)
        });
        if (error) resetError();
        setBoundingBoxes(calculatedResults);
      } catch ({response: {data: {error}}}) {
        return setError(error);
      }
    }

    const predictImageViaBytes = async () => {
      try {
        await post("/predict-bytes", {
          imageURL: imageURL
        });
        if (error) resetError();
      } catch ({response: {data: {error}}}) {
        console.log(error)
        if (error.code === "ERR_INVALID_ARG_TYPE") return setError("Cannot read image link. Please provide a valid image link (http/https).");
        else return setError("Face-detection failed");
      }
    }

    const handleDetect = () => {
      imageURL.substring(0, 5) === "https"
      ? predictImage()
      : predictImageViaBytes();
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