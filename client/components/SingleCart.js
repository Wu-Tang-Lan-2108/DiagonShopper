import React, { Component } from 'react';

class SingleCart extends React.Component {
  render() {
    return <div>{this.props.product.name}</div>;
  }
}

export default SingleCart;
