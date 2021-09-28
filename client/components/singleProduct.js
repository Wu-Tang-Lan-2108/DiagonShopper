import React from 'react';
import { connect } from 'react-redux';
import { addToCart, fetchCurrentOrder } from '../store/currentOrder';
import { fetchSingleProduct } from '../store/singleProduct';

class SingleProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }
  componentDidMount() {
    try {
      this.props.getSingleProduct(this.props.match.params.id);
      this.setState({ loading: false });
      this.props.fetchCurrentOrder(this.props.userId);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    if (this.state.loading) return 'loading';
    return (
      <div>
        <ul>
          <li>{this.props.product.name}</li>
          <li>{this.props.product.description}</li>
          <li>{this.props.product.quantity}</li>
          <li>{this.props.product.price}</li>
        </ul>
        <button
          type="button"
          onClick={() => {
            this.props.addToCart(
              this.props.currentOrder,
              this.props.product,
              this.props.userId
            );
          }}
        >
          Add to Cart
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getSingleProduct: (product) => dispatch(fetchSingleProduct(product)),
  fetchCurrentOrder: (userId) => dispatch(fetchCurrentOrder(userId)),
  addToCart: (orderId, productId, userId) =>
    dispatch(addToCart(orderId, productId, userId)),
});

const mapState = (state) => ({
  product: state.singleProductReducer,
  userId: state.auth.id,
  currentOrder: state.currentOrder,
});

export default connect(mapState, mapDispatchToProps)(SingleProduct);
