import React from 'react';
import { connect } from 'react-redux';
import { updProduct } from '../store/allProducts';

class UpdateProductForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      price: 0,
      description: '',
      quantity: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.makeProduct({ ...this.state });
  }

  render() {
    const { name, price, description, quantity } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label hmtlfor="name">Name: </label>
          <input name="name" onChange={handleChange} value={name} />

          <label hmtlfor="price">Price: </label>
          <input name="price" onChange={handleChange} value={price} />

          <label hmtlfor="description">Description: </label>
          <input
            name="description"
            onChange={handleChange}
            value={description}
          />

          <label hmtlfor="quantity">Quantity: </label>
          <input name="quantity" onChange={handleChange} value={quantity} />

          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    makeProduct: (product) => dispatch(makeProduct(product)),
  };
};

export default connect(null, mapDispatch)(UpdateProductForm);
