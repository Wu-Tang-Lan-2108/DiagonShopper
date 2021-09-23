import React, { Component } from 'react';

class SingleCart extends React.Component {
  render() {
    const product = this.props.product;
    return <div>
            <p>{product.product.name}</p>
            <p>{product.product.price}</p>
            <input type='number' value={product.quantity}/>
            <button type="button">Remove from cart</button>
          </div>;
  }
}

export default SingleCart;
