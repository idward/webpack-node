import React from 'react';

const ProductPage = (props) => {
  const loadImage = async () => {
    await console.log('waiting...');
    console.log('done');
  };

  const { title, imageUrl } = props;

  return (
    <div>
      <h2>{title}</h2>
      <img src={imageUrl} alt="art" />
      <button type="button" onClick={loadImage}>
        Load Image
      </button>
    </div>
  );
};

export default ProductPage;
