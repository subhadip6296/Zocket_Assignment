import React, { useRef, useState, useEffect } from 'react';

import SecondComponent from './SecondComponent';

import "./App.css";

const TemplateEditor = () => {
  const [isTrueorNot, setIstrue] = useState(true);
  

  const firstComponent = () => (
    <div className='bg'>
      <div className='card'>
        <h1 className='head'>1 & 2 BHK Luxury Apartments at <br/>just Rs.34.97 Lakhs</h1>
        <img src="https://res.cloudinary.com/ddswhkwjc/image/upload/v1713115379/download_2_yeo4y0.png" alt="kfc" className='img'/>
      </div>
      <div><button className='but' onClick={clickme}>Shop Now</button></div>
      <div>
        <img src="https://res.cloudinary.com/ddswhkwjc/image/upload/v1713117400/WhatsApp_Image_2024-04-14_at_23.26.05_7d075fba_dpjekn.jpg" alt=""  className='img1'/>
      </div>
    </div>
  );
 

  const clickme = () => {
    setIstrue(false);
  };

  
  return (
    <>
      {isTrueorNot ? firstComponent() : <SecondComponent />}
    </>
  );
};

export default TemplateEditor;
