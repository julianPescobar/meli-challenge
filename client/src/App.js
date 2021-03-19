import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import ProductList from './components/product-list/product-list';
import ProductDetail from './components/product-detail/product-detail';
import SearchBar from './components/searchbar/searchbar';

class App extends Component {
  render() {
    //en el pdf pareciera que el searchbar siempre está, asi que se respeta eso.
    return (
      <Router>
        <div className="App">
          <SearchBar />
          <Switch>
          <Route path="/items/:id" component={ProductDetail} />
            <Route path="/items" component={ProductList} />
           
             
            
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
