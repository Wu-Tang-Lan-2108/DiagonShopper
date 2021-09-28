import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/allProducts';
import { Link } from 'react-router-dom';
import { addToCart, fetchCurrentOrder } from '../store/currentOrder';
class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
    this.props.fetchCurrentOrder(this.props.userId);
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
                  <button
                    type="button"
                    onClick={() => {
                      this.props.addToCart(
                        this.props.currentOrder,
                        product,
                        this.props.userId
                      );
                    }}
                  >
                    Add to Cart
                  </button>
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
    fetchCurrentOrder: (userId) => dispatch(fetchCurrentOrder(userId)),
    addToCart: (orderId, productId, userId) =>
      dispatch(addToCart(orderId, productId, userId)),
  };
};

const mapState = (state) => {
  return {
    products: state.allProducts,
    userId: state.auth.id,
    currentOrder: state.currentOrder,
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
