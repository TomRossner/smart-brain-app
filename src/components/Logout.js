import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Logout = () => {
    const navigate = useNavigate();
    const {setCurrentUser} = useContext(AuthContext);

    useEffect(() => {
        setCurrentUser(null);
        navigate("/");
    }, []);
    
  return null;
}

export default Logout;