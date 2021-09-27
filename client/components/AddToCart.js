import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCartItem } from '../store/order';

class AddToCart extends React.Component {
  render() {
    return <div></div>;
  }
}
const mapToDispatch = (dispatch) => {
  return {
    createCartItem: (orderId, productId) =>
      dispatch(createCartItem(orderId, productId)),
  };
};

const mapToState = (state) => {
  return {
    order: state.order,
  };
};

export default AddToCart;
