import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleProduct } from '../store/singleProduct';
import UpdateProductForm from './UpdateProductForm';

class SingleProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      product: {},
    };
    this.handleProductChange = this.handleProductChange.bind(this);
  }
  componentDidMount() {
    try {
      this.props.getSingleProduct(this.props.match.params.id);
      this.setState({ loading: false });
    } catch (err) {
      console.log(err);
    }
  }

  // componentDidUpdate(prevProps) {
  //   if(prev)
  // }

  handleProductChange(product) {
    this.setState(product);
    console.log("***********")
  }

  render() {
    if (this.state.loading) return 'loading';
    return (
      <div>
        <ul>
          <li>{this.props.product.name}</li>
          <li>{this.props.product.description}</li>
          <li>{this.props.product.quantity}</li>
          <li>{this.props.product.price}</li>
        </ul>
        {this.props.product ? (<UpdateProductForm
          item={this.props.product}
          onProductChange={this.handleProductChange}
        />) : <React.Fragment />
        }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getSingleProduct: (product) => dispatch(fetchSingleProduct(product)),
});

const mapState = (state) => ({
  product: state.singleProductReducer,
});

export default connect(mapState, mapDispatchToProps)(SingleProduct);
