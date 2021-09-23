import React, { Component } from 'react';

class SingleCart extends React.Component {
  render() {
    const product = this.props.product;
    console.log(this.props)
    return <div>
            <p>{product.name}</p>
            <p>{product.price}</p>
            <input type='number' value={product.quantity}/>
            <button type="button">Remove from cart</button>
          </div>;
  }
}

export default SingleCart;
