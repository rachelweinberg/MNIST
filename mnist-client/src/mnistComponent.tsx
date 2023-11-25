import React, { useState } from 'react';
import PixelArrayToImage from './components/pixelArrayToImage.js';
const { MnistServiceClient } = require('./proto/server_def_grpc_web_pb');
const { MnistRequest, Response } = require('./proto/server_def_pb');


const MnistComponent = () => {
    const [images, setImages] = useState<any>([]);

    const getImages = () => {
        try {        
            const client = new MnistServiceClient('http://localhost:8080');
            const request = new MnistRequest();
            const stream = client.getImage(request);

            stream.on('data', (image) => {
                try {
                    const label = image.getLabel();
                    const pixels = image.getPixelsList();
                    setImages((prevImages) => [...prevImages, {label, pixels}]);
                } catch (error) {
                    console.error(error);
                    alert('error trying to get images, try agaun later')
                }
            });

            stream.on('error', (error) => {
                console.error('Error from server:', error);
                alert('error trying to get images, try agaun later')
            });
        
            stream.on('end', () => {
                console.log('Stream ended');
            });
        } catch (error) {
            console.log('error');
        }
    }

    return (
        <div>
            <button onClick={getImages}>load</button>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {images.map(({label, pixels}, index) => (
                    <div key={index}>
                        <PixelArrayToImage pixelArray={pixels} width={30} height={5} />
                    </div>
                ))}
            </div>
      </div>
    );
};

export default MnistComponent;