import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export const defaultFieldValues = {
  email: "",
  password: ""
};

const SignIn = () => {
  const [error, setError] = useState("");
  const [fieldValues, setFieldValues] = useState(defaultFieldValues);
  const {email, password} = fieldValues;
  const navigate = useNavigate();
  const {loginUser} = useContext(AuthContext);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    try {
      await loginUser(fieldValues);
      navigate("/");
    } catch ({response}) {
      setError(response.data);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.name === "email") return setFieldValues({...fieldValues, [e.target.name]: e.target.value})
    if (e.target.name === "password") return setFieldValues({...fieldValues, [e.target.name]: e.target.value})
  };


  return (
    <div className='form-container'>
      <h2>Sign in</h2>
      {error ? <p className='error'>{error}</p> : null}
        <form onSubmit={handleFormSubmit} noValidate>
            <input
              type="email"
              name='email'
              title='Email'
              placeholder='Email'
              defaultValue={email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name='password'
              title='Password'
              placeholder='Password'
              defaultValue={password}
              onChange={handleInputChange}
              required
            />

            <div className='buttons-container'>
                <button type='submit' className='btn'>Sign in</button>
            </div>
        </form>
        <Link to="/register" className='link blue small-text'>I don't have an account</Link>
    </div>
  )
}

export default SignIn;