import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts, delProduct } from '../store/allProducts';
import { Link } from 'react-router-dom';
import AddProductForm from './AddProduct';

class AllProductAdmin extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchProducts();
  }

  // this.handleDelete(id){
  //   this.props.delProduct()
  // }

  render() {
    return (
      <div>
        {this.props.products ? (
          <ul>
            {this.props.products.map((product) => {
              return (
                <li key={product.id}>
                  <Link to={`/products/${product.id}`}>
                    <h2>{product.name}</h2>
                    <button
                      type="button"
                      onClick={() => this.props.deleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </Link>
                </li>
              );
            })}
            <AddProductForm />
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
  };
};

export default connect(mapState, mapDispatch)(AllProductAdmin);
