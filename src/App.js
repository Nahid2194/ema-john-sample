import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Shop from './Components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Inventory from './Components/inventory/Inventory';
import NotFound from './Components/NotFound/NotFound';
import Review from './Components/review/Review';
import ProductDetail from './Components/ProductDetail/ProductDetail';

function App() {
  return (

    <Router>
      <div className="App">

        <Header></Header>

        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/manage">
            <Inventory></Inventory>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="/product/:ProductKey">
            <ProductDetail></ProductDetail>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
