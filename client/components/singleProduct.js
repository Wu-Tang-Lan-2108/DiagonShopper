import React from 'react';
import { connect } from 'react-redux';
import fetchSingleProduct from '../store/singleProduct';

class SingleProduct extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    try {
      this.props.getSingleProduct(this.props.params.id);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div>
        <ul>
          <li>{this.props.product.name}</li>
          <li>{this.props.product.description}</li>
          <li>{this.props.product.quantity}</li>
          <li>{this.props.product.price}</li>
        </ul>
      </div>
    );
  }
}

mapDispatchToProps = dispatch => ({
  getSingleProduct: product => dispatch(fetchSingleProduct(product)),
});

export default connect(null, mapDispatchToProps)(SingleProduct);
