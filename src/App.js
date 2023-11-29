import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Categories from './components/Categories';
import Checkout from './components/Checkout';
import Main from './components/Main';
import NotFound from './components/NotFound';
import ProductDetails from './components/ProductDetails';
import ShoppingCart from './components/ShoppingCart';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/product-details/:id" component={ ProductDetails } />
        <Route exact path="/checkout" component={ Checkout } />
        <Route exact path="/shopping-cart" component={ ShoppingCart } />
        <Route exact path="/categories" component={ Categories } />
        <Route exact path="/" component={ Main } />
        <Route exact path="*" component={ NotFound } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
