import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './product-detail.css';
class ProductDetail extends Component {
  constructor() {
    super();
    this.state = {
      Response: {},
      Pictures: {},
      Categorias: []

    };
  }


  componentDidMount() {
    this.handleProducts();
  }


  //aca creamos el handler de productos.
  handleProducts = async () => {
    let data = await fetch('http://localhost:5000/api/items/'.concat(this.props.match.params.id))
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
      Pictures: data.pictures[0],
      Response: data,
      //agarramos los primeros 2 atributos, aca honestamente desconozco de donde sacar los categories.
      //no los encontre por ninguna parte del response, asi que use los atributos como categorias, mil disculpas.
      Categorias: data.attributes.map((cats) => (


        <li ><a href="true">{cats.value_name}</a></li>


      ))
    })
  };

  render() {

    //el display lo hice con 2 rows, el primero tiene 2 columns y el segundo 1 column, algo masomenos asi:
    //  __|__
    //  _____
    let BreadCrumb = []
    BreadCrumb.push(this.state.Categorias);

    return (
      <BrowserRouter>
        <ul key="breadcrumb" className="breadcrumb">
          {BreadCrumb}
        </ul>
        <div className="card-container">
          <div className="detail-container">
            <div className="row">
              <div className="column">
                <div className="detail-container-img">
                  <img src={this.state.Pictures.url} alt={this.state.Response.title} />
                </div>
              </div>

              <div className="column">

                <div className="detail-container-title">
                  <div className="row">
                    <div className="product-status">
                      {this.state.Response.condition && this.state.Response.condition === 'new' ? 'Nuevo. ' : 'used' ? 'Usado. ' : null} {this.state.Response.sold_quantity && this.state.Response.sold_quantity > 0 ? this.state.Response.sold_quantity + ' vendidos.' : null}
                    </div>
                  </div>
                  <div className="row">
                    <div className="title-label">
                      {this.state.Response.title}
                    </div>
                  </div>
                  <div className="row">
                    <div className="column">
                      <div className="product-price">
                        ${this.state.Response.price}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="column">
                      <div className="buy-button">
                        Comprar
              </div>
                    </div>

                  </div>


                </div>
              </div>

            </div>
            <div className="row">
              <div className="column">
                <div className="description-label">Descripción del Producto</div>
                <div className="detail-container-description">
                  {this.state.Response.description}
                </div>
              </div>
            </div>

          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default ProductDetail;
