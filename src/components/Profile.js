import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { updateUser } from '../http/frontRequests';

const Profile = () => {
    const {currentUser, setCurrentUser} = useContext(AuthContext);
    const handleFileUpload = async (e) => {
        const reader = new FileReader();
        const filesLength = e.target.files.length;
        reader.addEventListener("load", () => setCurrentUser({...currentUser, imgUrl: reader.result}));
        if (filesLength) reader.readAsDataURL(e.target.files[0]);
        await updateUser({...currentUser, imgUrl: reader.result});
        return reader.removeEventListener("load", () => {});
    }

    const handleRemovePicture = async () => {
        setCurrentUser({...currentUser, imgUrl: ""});
        return await updateUser({...currentUser, imgUrl: ""});
    }

    // useEffect(() => {
    //     if (!currentUser) return;
    // }, [currentUser]);


  return (
    <div className='profile-container'>
        <div className='content'>
            <div className='img-container'>
                {currentUser.imgUrl?.length ? <img src={currentUser.imgUrl} alt="Profile"/> : <div className='empty-picture-profile'></div>}
            </div>
            <label htmlFor="upload-profile-picture">{currentUser.imgUrl ? "Change profile picture" : "Upload profile picture"}</label>
            <input type="file" name="upload-profile-picture" id="upload-profile-picture" onChange={handleFileUpload}></input>
            {currentUser.imgUrl ? <button className='btn' onClick={handleRemovePicture}>Remove picture</button> : null}
            <p>Name: <span>{currentUser?.name}</span></p>
            <p>Member since: <span>{currentUser?.created_at.split("T")[0]}</span></p>
            <p>Email: <span>{currentUser?.email}</span></p>
            <p>Score: <span>{currentUser?.predictions}</span></p>
        </div>
    </div>
  )
}

export default Profile;