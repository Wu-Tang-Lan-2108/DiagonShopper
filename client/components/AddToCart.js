import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCartItem, fetchOrder } from '../store/order';

class AddToCart extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <button
        type="button"
        onClick={() => {
          this.props.createCartItem(this.props.orderId, this.props.productId);
        }}
      >
        Add to cart
      </button>
    );
  }
}
const mapToDispatch = (dispatch) => {
  return {
    createCartItem: (orderId, productId) =>
      dispatch(createCartItem(orderId, productId)),
    fetchOrder: (userId) => dispatch(fetchOrder(userId)),
  };
};

const mapToState = (state) => {
  return {
    order: state.order,
  };
};

export default connect(mapToState, mapToDispatch)(AddToCart);
