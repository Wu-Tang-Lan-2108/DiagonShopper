import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/allProducts';
import { Link } from 'react-router-dom';
class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

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
                  </Link>
                </li>
              );
            })}
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
  };
};

const mapState = (state) => {
  return {
    products: state.allProducts,
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
