import React from 'react';
import { connect } from 'react-redux';
import { updateSingleProduct } from '../store/singleProduct';
import { delProduct } from '../store/allProducts';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class UpdateProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: 0,
      description: '',
      quantity: 0,
      redirect: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    const product = this.props.item;
    if (prevProps.item !== product) {
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
    let product = this.props.item;
    let updatedProduct = {...product, ...this.state}
    this.props.UpdateProduct(updatedProduct);
    this.props.onProductChange(updatedProduct);
  }

  render() {
    const { name, price, description, quantity } = this.state;
    const { handleChange, handleSubmit } = this;
    if(this.state.redirect){
      return <Redirect to={this.state.redirect} />
    }
    return(  
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

          <button type="submit">Update</button>
        </form>
        <button type="button" onClick={
          () => {
            this.props.deleteProduct(this.props.item.id);
            //useHistory().push('/');
            this.setState({ redirect: '/products' });
          }
        }>Delete Item</button>
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
    UpdateProduct: (product) => dispatch(updateSingleProduct(product)),
    deleteProduct: (productId) => dispatch(delProduct(productId))
  };
};

export default connect(mapState, mapDispatch)(UpdateProductForm);
