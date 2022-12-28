import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export const defaultFieldValues = {
  email: "",
  password: "",
  confirmPassword: "",
  name: ""
}

const Register = () => {
    const [fieldValues, setFieldValues] = useState(defaultFieldValues);
    const [error, setError] = useState("");
    const {registerUser} = useContext(AuthContext);
    const {name, password, confirmPassword, email} = fieldValues;
    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
      e.preventDefault();
      Object.values(fieldValues).map(value => !value ? setError("You must fill out all fields") : value);
      if (password !== confirmPassword) return setError("Passwords do not match. Please try again");
      try {
        await registerUser(fieldValues);
        navigate("/sign-in");
      } catch ({response}) {
        setError(response.data);
      }
    };

    const handleInputChange = (e) => {
      if (e.target.name === "email") return setFieldValues({...fieldValues, [e.target.name]: e.target.value});
      if (e.target.name === "password") return setFieldValues({...fieldValues, [e.target.name]: e.target.value});
      if (e.target.name === "confirmPassword") return setFieldValues({...fieldValues, [e.target.name]: e.target.value});
      if (e.target.name === "name") return setFieldValues({...fieldValues, [e.target.name]: e.target.value});
    };

  return (
    <div className='form-container'>
      <h2>Create an account</h2>
      {error ? <p className='error'>{error}</p> : null}
        <form onSubmit={handleFormSubmit} noValidate>
            <input
              type="text"
              title='Name'
              name='name'
              placeholder='Name'
              defaultValue={name}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              title='Email'
              name='email'
              placeholder='Email'
              defaultValue={email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              title='Password'
              name='password'
              placeholder='Password'
              defaultValue={password}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              title='Confirm password'
              name='confirmPassword'
              placeholder='Confirm password'
              defaultValue={confirmPassword}
              onChange={handleInputChange}
              required
            />

            <div className='buttons-container'>
                <button type='submit' className='btn'>Register</button>
            </div>
        </form>
        <Link to="/sign-in" className='link blue small-text'>I already have an account</Link>
    </div>
  )
}

export default Register;