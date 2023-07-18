import React from 'react';
import { BsDownload } from 'react-icons/bs';

const ImageDownloader = ({ imageUrl, imageName }) => {
  const handleDownloadClick = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `image_${imageName}.png`;
    link.click();
  };

  return (
    <button className="btn bg-none" onClick={handleDownloadClick}>
      Download <BsDownload />
    </button>
  );
};

export default ImageDownloader;
