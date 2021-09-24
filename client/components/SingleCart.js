import React, { Component } from 'react';

class SingleCart extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      cartItemId: this.props.product.id || 0,
      quantity: this.props.product.quantity || 0
    }
  }


  render() {
    const product = this.props.product;
    const id = product.id;
    console.log(this.props);
    return (
      <div>
        <p>{product.name}</p>
        <p>{product.price}</p>
        <input type="number" value={this.state.quantity} onChange={(evt) => {
          this.setState({quantity: evt.target.value})
          this.props.update(this.state)
          }}/>
        <button
          onClick={() => {
            product.deleteCartItem(id);
          }}
          type="button"
        >
          Remove from cart
        </button>
      </div>
    );
  }
}

export default SingleCart;
