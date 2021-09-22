import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleProduct } from '../store/singleProduct';

class SingleProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    }
  }
  componentDidMount() {
    try {
      this.props.getSingleProduct(this.props.match.params.id);
      this.setState({loading: false})
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    if(this.state.loading)
      return 'loading'
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

const mapDispatchToProps = dispatch => ({
  getSingleProduct: (product) => dispatch(fetchSingleProduct(product)),
});

const mapState = (state) => ({
  product: state.singleProductReducer
})

export default connect(mapState, mapDispatchToProps)(SingleProduct);
