import React, { Component } from 'react';

class SingleCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItemId: this.props.product.id || 0,
      quantity: this.props.product.quantity || 0,
    };
  }

  render() {
    const product = this.props.product;
    const id = product.id;
    return (
      <div>
        <p>{product.name}</p>
        <p>{product.price}</p>
        <input
          type="number"
          value={this.state.quantity}
          min="1"
          max={product.maxQuantity}
          onChange={(evt) => {
            this.setState({ quantity: parseInt(evt.target.value) });
            this.props.update({
              cartItemId: this.state.cartItemId,
              quantity: parseInt(evt.target.value),
            });
          }}
        />
        <button
          onClick={() => {
            this.props.deleteCartItem(id, product.purchasingUser);
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
