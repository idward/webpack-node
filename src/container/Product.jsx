import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTitleAsyn } from '../store/action';
import MyImage from '../../public/images/MarketplaceArtwork.png';
// import { connect } from 'react-redux';

const ProductPage = (_props) => {
  const { title } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const loadImage = async () => {
    await console.log('waiting...');
    console.log('done');
  };

  // const { imageUrl } = props;

  useEffect(() => {
    dispatch(fetchTitleAsyn('This is product page'));
  }, []);

  return (
    <div>
      <h2>{title}</h2>
      <img src={MyImage} alt="art" />
      <button type="button" onClick={loadImage}>
        Load Image
      </button>
    </div>
  );
};

export default ProductPage;

// export default connect((state) => {
//   return { title: state.product.title };
// })(ProductPage);
