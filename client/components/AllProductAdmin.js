import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts, delProduct } from '../store/allProducts';
import { Link } from 'react-router-dom';
import AddProductForm from './AddProduct';

class AllProductAdmin extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    this.setState({
      user: this.props.user //this could be guest
    });
    this.props.fetchProducts();
  }

  render() {
    console.log("state: ",this.state)
    return (
      <div>
        {this.props.products ? (
          <ul>
            {this.props.products.map((product) => {
              return (
                <li key={product.id}>
                  <Link to={`/products/${product.id}`}>
                    <h2>{product.name}</h2>
                  </Link>
                  {this.state.user.type === 'admin' ? (
                    <button
                      type="button"
                      onClick={() => this.props.deleteProduct(product.id)}
                    >
                      Delete
                    </button>
                   ) : (
                     <React.Fragment />
                     )}
                </li>
              );
            })}
            {this.state.user.type === 'admin' ? (
            <AddProductForm />
            ) : (
              <React.Fragment />
            )}
          </ul>
        ) : (
          <React.Fragment />
        )}
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    deleteProduct: (id) => dispatch(delProduct(id)),
  };
};

const mapState = (state) => {
  return {
    products: state.allProducts,
    user: state.auth
  };
};

export default connect(mapState, mapDispatch)(AllProductAdmin);
