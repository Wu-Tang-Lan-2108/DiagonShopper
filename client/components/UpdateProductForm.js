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

  componentDidUpdate(prevProps) {
    const product = this.props.product;
    if (prevProps.product !== product) {
      //prevProps.product.name?
      this.setState({
        name: product.name || '',
        price: product.price || '',
        description: product.description || '',
        quantity: product.quantity || '',
      });
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let product = this.props.product;
    this.props.updateProduct(product);
    this.props.onProductChange(product);
  }

  render() {
    const { name, price, description, quantity } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <div>
        <h2>Update form</h2>
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

const mapState = (state) => {
  return {
    product: state.product,
  };
};

const mapDispatch = (dispatch) => {
  return {
    UpdateProduct: (product) => dispatch(updProduct(product)),
  };
};

export default connect(mapState, mapDispatch)(UpdateProductForm);
