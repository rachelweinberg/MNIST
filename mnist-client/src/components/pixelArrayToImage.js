import React, { useRef, useEffect } from 'react';

const PixelArrayToImage = ({ pixelArray, width, height }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const context = canvas.getContext('2d');

      if (context) {
        // Assuming 28x28 image
        const width = 28;
        const height = 28;

        canvas.width = width;
        canvas.height = height;

        context.clearRect(0, 0, width, height);
        for (let i = 0; i < pixelArray.length; i++) {
          const x = i % width; // Calculate x-coordinate
          const y = Math.floor(i / width); // Calculate y-coordinate

          const pixelValue = pixelArray[i];
          context.fillStyle = `rgb(${pixelValue}, ${pixelValue}, ${pixelValue})`;
          context.fillRect(x, y, 1, 1);
        }
      }
    }
  }, [pixelArray, width, height]);

  return <canvas ref={canvasRef} width={width} height={height}/>;
};

export default PixelArrayToImage;
