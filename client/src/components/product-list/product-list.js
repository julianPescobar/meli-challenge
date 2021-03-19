import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './product-list.css';
import hasShipping from '../../Assets/ic_shipping@2x.png.png.png'

//Esta es una funcion para que muestre el iconito si tiene free shipping o no.
function ShowShipping(props){
     
  if(props.freeShipping)
  return <div><img alt="has-shipping" src={hasShipping} width='24px' height='24px'></img></div>
  else
  return null
}

class ProductList extends Component {
  constructor() {
    super();
    this.state = {
      Productos: [],
      Categorias: [],
    };
  }
  
  componentDidMount(){
    this.handleProducts();
  }


  //aca creamos el handler de productos.
  handleProducts = async() => {
    let data = await  fetch(`http://localhost:5000/api/items${this.props.location.search}`)
    .then(response => response.json())
    .then((jsonData) => {
      return jsonData;
    })
    .catch((error) => {
      console.error(error)
      return 'error';
    })
   //guardamos data que viene del Json para ser mostrada en render() o tenerla a mano por las dudas.
    this.setState({
     
      //aca guardamos las primeras 2 categorias para mostrar en el bread
      //Nos interesa el filter de categoria nada mas, asi que filtramos.
      Categorias: data.available_filters.filter(({ 'id': v }) => v === 'category').map((cats) =>(
        <ul key="breacrumb" className="breadcrumb">
          <li ><a href="true">{cats.values[0].name}</a></li>
          <li ><a href="true">{cats.values[1].name}</a></li>
          </ul>
        
      )) ,
      //aca guardamos toda la info que va a estar populando cada item de la lista
      Productos: data.results.map((id) => (
        <a key={id.id} href={"items/"+id.id}>
          <div className="list-item">
            <div className="list-item-container" >
              <img className="container-img" src={id.thumbnail} alt={id.thumbnail_id}  />
            </div>
            <div className="container-description">
    
                 <div className="container-description price">$ {id.price} <ShowShipping freeShipping={id.shipping.free_shipping}></ShowShipping>    </div>
               
                  <br/>
                 <div className="container-description name">{id.title}</div> 
            </div>
            <div className="list-item-container container-location">
                {id.seller_address.state.name}
           
            </div>
          </div>
        </a>
      ))
    })
  };
    
  
  render() {
    
    const ListItem = [];
    const BreadCrumb = [];

  this.state.Productos.forEach(element => {
    ListItem.push(element)
  })

  this.state.Categorias.forEach(element => {
    BreadCrumb.push(element)
  })

    return (
      <BrowserRouter>
        <div>
        
          {BreadCrumb}
         
        </div>
        
        <div className="list-container">
          {ListItem}
        </div>
      </BrowserRouter>


    );
  }
}

export default ProductList;
