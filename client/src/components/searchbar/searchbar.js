import React, { Component } from 'react';
import './searchbar.css';
import logo from '../../Assets/Logo_ML@2x.png.png.png'
import searchIcon from '../../Assets/ic_Search@2x.png.png.png'
class SearchBar extends Component {
  constructor() {
    super();
    this.state = { searchquery: '' };
    this.handleChange = this.handleChange.bind(this);

  }
  handleChange(event) { this.setState({ searchquery: event.target.value }); }

  onSubmitHandler = (e) => {
    e.preventDefault();
    window.location.href = "/items?search=" + this.state.searchquery;
  }


  render() {


    return (


      <div className="siteHeader">

        <div className="siteHeader__HeaderItem">
          <a href="/">
            <img className="meli-img" src={logo} width='50px' height='35px' alt="MLA" />
          </a>

        </div>


        <div className="siteHeader__section" >
          <form onSubmit={this.onSubmitHandler} >
            <input onChange={this.handleChange} className="searchbar" id="txt_buscar" placeholder='Nunca dejes de buscar' />
            <div className="siteHeader__section">
              <input className="search-button" width="24px" height="24px" type="image" id="btn_buscar" src={searchIcon} alt="Buscar" />
            </div>
          </form>
        </div>


      </div>

    );
  }
}

export default SearchBar;
