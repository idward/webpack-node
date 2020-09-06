import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import universal from 'react-universal-component';
import { trimEnd } from 'lodash';
// import personData from './data/person';
// import AsyncComponent from './hoc/AsyncComponent';
// import ProductPage from './container/Product';
// import ContactPage from './container/Contact';
import './style.scss';
import './main.scss';

// const MyImage = require('../public/images/MarketplaceArtwork.png');

console.log(`${trimEnd(' aaaa  ')}`);

// const data = personData;

// const Home = AsyncComponent(() =>
//   import(/* webpackChunkName: 'Home' */ './container/HomePage.js')
// );

const UniversalComponent = universal((props) =>
  import(`./container/${props.page}`)
);

const App = () => {
  // const persons = [...data];
  // console.log('persons:', persons);
  return (
    <div>
      <div className="nav">
        <Link to="/">Home</Link>
        <Link to="/product">Product</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className="container">
        <h1 className="title">Hello world!</h1>
        <Switch>
          <Route
            path="/"
            exact
            render={() => <UniversalComponent page="Home" />}
          />
          <Route
            path="/product"
            exact
            render={() => <UniversalComponent page="Product" />}
          />
          <Route
            path="/contact"
            exact
            render={() => <UniversalComponent page="Contact" />}
          />
        </Switch>
        {/* <Home /> */}
        {/* <ProductPage imageUrl={MyImage} /> */}
        {/* <ProductPage title="this is product page" imageUrl="" /> */}
        {/* <ContactPage /> */}
      </div>
    </div>
  );
};

export default App;
