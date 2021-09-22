import React from 'react';
import { connect } from 'react-redux';
import fetchSingleProduct from '../store/singleProduct';

class SingleProduct extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    try {
      this.props.getSingleProduct(this.props.match.params.id);
    } catch (err) {
      console.log("12: "+this.props.match.params.id);
      console.log(err);
    }
  }

  render() {
    console.log(this.props);
    return (
      <div/>
      // {this.props.product ? (
      //   <div>
      //   <ul>
      //     <li>{this.props.product.name}</li>
      //     <li>{this.props.product.description}</li>
      //     <li>{this.props.product.quantity}</li>
      //     <li>{this.props.product.price}</li>
      //   </ul>
      // </div>
      // ):(
      //   <React.Fragment/>
      // )}
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
