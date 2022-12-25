import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ImageContext } from './contexts/ImageContext';

export const USER_ID = 'tomrossner';
export const PAT = 'dfa460d3b60349279af5c811ed720d9a';
export const APP_ID = 'smart-brain';

export const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

export const stub = ClarifaiStub.grpc();
export const metadata = new grpc.Metadata();
metadata.set("authorization", "Key 2da155be2a9d4b3fa56f384d6aea9b7d" + PAT);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ImageContext>
          <App />
        </ImageContext>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();