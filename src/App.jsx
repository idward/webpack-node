import React from 'react';
import { trimEnd } from 'lodash';
import personData from './data/person';
import AsyncComponent from './hoc/AsyncComponent';
import ProductPage from './container/Product';
import ContactPage from './container/Contact';
import MyImage from '../public/images/MarketplaceArtwork.png';
import './style.scss';
import './main.scss';

// const MyImage = require('../public/images/MarketplaceArtwork.png');

console.log(`${trimEnd(' aaaa  ')}`);

const data = personData;

const Home = AsyncComponent(() =>
  import(/* webpackChunkName: 'Home' */ './container/HomePage.js')
);

const App = () => {
  const persons = [...data];
  console.log('persons:', persons);
  return (
    <div>
      <h1 className="title">Hello world11!</h1>
      <Home />
      <ProductPage title="this is product page" imageUrl={MyImage} />
      {/* <ProductPage title="this is product page" imageUrl="" /> */}
      <ContactPage />
    </div>
  );
};

export default App;
