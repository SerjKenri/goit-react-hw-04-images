import React, { useState } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ToastContainer } from "react-toastify";
import { ImageGallery } from "./ImageGallery/ImageGallery";

import 'react-toastify/dist/ReactToastify.css';

export function App() {
  const [request, setRequest] = useState('');

  const handleFormSubmit = request => {
    setRequest(request);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: 16,
        paddingBottom: 24,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 40,
        color: '#010101'
      }}
    >
      <Searchbar onSubmit={handleFormSubmit}/>
      <ImageGallery request={request}/>
      <ToastContainer
      position="top-right"
      autoClose={3000}
      closeOnClick
      pauseOnHover
      theme="colored"
      />
    </div>
  );
};
