import React, { useRef, useState, useEffect } from 'react';
import { ChromePicker } from 'react-color';

import "./index.css";

const SecondComponent = () => {
  const canvasRef = useRef(null);
  const [backgroundColor, setBackgroundColor] = useState("#0369A1");
  const [textColor, setTextColor] = useState("#000000");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [ctaText, setCtaText] = useState("CTA Button");
  const [ctaPosition, setCtaPosition] = useState({ x: 500, y: 800 });
  const [ctaFontSize, setCtaFontSize] = useState(30);
  const [ctaWrapLength, setCtaWrapLength] = useState(20);
  const [ctaTextColor, setCtaTextColor] = useState("#ffffff");
  const [ctaBackgroundColor, setCtaBackgroundColor] = useState("#0369A1");
  const [ctaPadding, setCtaPadding] = useState(24);

  useEffect(() => {
    drawCanvas();
  }, [backgroundColor, textColor, uploadedImage, ctaText, ctaPosition, ctaFontSize, ctaWrapLength, ctaTextColor, ctaBackgroundColor, ctaPadding]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background color
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw uploaded image
    if (uploadedImage) {
      const image = new Image();
      image.src = URL.createObjectURL(uploadedImage);
      image.onload = () => {
        const aspectRatio = image.width / image.height;
        let width = 400;
        let height = width / aspectRatio;

        if (height > 400) {
          height = 400;
          width = height * aspectRatio;
        }

        const x = (canvas.width - width) / 2;
        const y = (canvas.height - height) / 2;
        ctx.drawImage(image, x, y, width, height);

        // Draw CTA Button
        ctx.fillStyle = ctaBackgroundColor;
        ctx.strokeStyle = ctaTextColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(ctaPosition.x - ctaPadding, ctaPosition.y - ctaPadding);
        ctx.lineTo(ctaPosition.x + ctx.measureText(ctaText).width + ctaPadding, ctaPosition.y - ctaPadding);
        ctx.lineTo(ctaPosition.x + ctx.measureText(ctaText).width + ctaPadding, ctaPosition.y + ctaFontSize + ctaPadding);
        ctx.lineTo(ctaPosition.x - ctaPadding, ctaPosition.y + ctaFontSize + ctaPadding);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Draw CTA text
        ctx.fillStyle = ctaTextColor;
        ctx.font = `${ctaFontSize}px Arial`;
        ctx.fillText(ctaText, ctaPosition.x, ctaPosition.y + ctaFontSize);
      };
    }
  };

  const handleBackgroundColorChange = (color) => {
    setBackgroundColor(color.hex);
  };

  const handleTextColorChange = (color) => {
    setTextColor(color.hex);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setUploadedImage(file);
  };

  const handleCtaTextChange = (e) => {
    setCtaText(e.target.value);
  };

  const handleCtaPositionChange = (e) => {
    const { name, value } = e.target;
    setCtaPosition((prevPosition) => ({
      ...prevPosition,
      [name]: parseInt(value, 10),
    }));
  };

  const handleCtaFontSizeChange = (e) => {
    setCtaFontSize(parseInt(e.target.value, 10));
  };

  const handleCtaWrapLengthChange = (e) => {
    setCtaWrapLength(parseInt(e.target.value, 10));
  };

  const handleCtaTextColorChange = (color) => {
    setCtaTextColor(color.hex);
  };

  const handleCtaBackgroundColorChange = (color) => {
    setCtaBackgroundColor(color.hex);
  };

  const handleCtaPaddingChange = (e) => {
    setCtaPadding(parseInt(e.target.value, 10));
  };

  return (
    <div className='card1'>

    <div className='card3'> 
      <div className='c'>
        <div>
          <h1>Ad Customization</h1>
          <p>Customize your Ad and get the Templates accordingly</p>
          <label htmlFor="fileInput" className="fileInputLabel">
            {uploadedImage ? uploadedImage.name : "Select file"}
          </label>
          <input id="fileInput" type="file" accept="image/*" onChange={handleFileInputChange} style={{ display: 'none' }} />

        </div>
        <div className='card2'>
          <label>Background Color:</label>
          <ChromePicker
            color={backgroundColor}
            onChange={handleBackgroundColorChange}
          />
        </div>
         
      </div>
      <div className="cta-customization">
        <h2>CTA Customization</h2>
        <div className="cta-inputs">
          <div>
            <label>CTA Text:</label>
            <input type="text" value={ctaText} onChange={handleCtaTextChange} />
          </div>
          <div>
            <label>X Position:</label>
            <input
              type="number"
              value={ctaPosition.x}
              name="x"
              onChange={handleCtaPositionChange}
            />
          </div>
          <div>
            <label>Y Position:</label>
            <input
              type="number"
              value={ctaPosition.y}
              name="y"
              onChange={handleCtaPositionChange}
            />
          </div>
          <div>
            <label>Font Size:</label>
            <input type="number" value={ctaFontSize} onChange={handleCtaFontSizeChange} />
          </div>
          <div>
            <label>Wrap Length:</label>
            <input type="number" value={ctaWrapLength} onChange={handleCtaWrapLengthChange} />
          </div>
          
          <div>
            <label>Background Color:</label>
            <ChromePicker
              color={ctaBackgroundColor}
              onChange={handleCtaBackgroundColorChange}
            />
          </div>
          </div>
          <div>
            <label>Padding:</label>
            <input type="number" value={ctaPadding} onChange={handleCtaPaddingChange} />
          </div>
        </div>
      </div>
      <canvas ref={canvasRef} width={1080} height={1080} style={{ border: '1px solid black' }} />
    </div>
  );
};

export default SecondComponent;
