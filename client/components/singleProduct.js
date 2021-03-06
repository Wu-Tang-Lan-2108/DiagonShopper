import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import { addToCart, fetchCurrentOrder } from '../store/currentOrder';
import { fetchSingleProduct } from '../store/singleProduct';
import UpdateProductForm from './UpdateProductForm';

class SingleProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      product: {
        name: '',
        description: '',
        price: 0,
        quantity: 0,
      }
    };
    this.handleProductChange = this.handleProductChange.bind(this);
  }
  componentDidMount() {
    try {
      this.props.getSingleProduct(this.props.match.params.id);
      this.setState({
        loading: false,});
      this.props.fetchCurrentOrder(this.props.userId);
    } catch (err) {
      console.log(err);
    }
  }


  handleProductChange(product) {
    this.setState(product);
  }

  render() {
    if (this.state.loading) return 'loading';

    const { name, description, quantity, price } = this.props.product
    // let productPrice = price.toString().slice(0,-2) + '.' + price.toString().slice(-2)
    return (
      <div>
        <Card>
          <CardHeader
          title={name}
          subheader={`$${price ? (price.toString().slice(0,-2) + '.' + price.toString().slice(-2)) : price}`}
          />
          <CardContent>
          <Typography variant="h6">
              Description
            </Typography>
            <Typography variant="body1">
              {description}
            </Typography>
            <Divider />
            <Typography variant="body2">
              Qty left: {quantity}
            </Typography>
          </CardContent>
        </Card>
        {/* <ul>
          <li>{this.props.product.name}</li>
          <li>{this.props.product.description}</li>
          <li>{this.props.product.quantity}</li>
          <li>{this.props.product.price}</li>
        </ul> */}

        {this.props.user.type === 'admin' ? (
          <UpdateProductForm
            item={this.props.product}
            onProductChange={this.handleProductChange}
          />
        ) : (
          <React.Fragment />
        )}
        <button
          type="button"
          onClick={() => {
            this.props.addToCart(
              this.props.currentOrder,
              this.props.product,
              this.props.userId
            );
          }}
        >
          Add to Cart
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getSingleProduct: (product) => dispatch(fetchSingleProduct(product)),
  fetchCurrentOrder: (userId) => dispatch(fetchCurrentOrder(userId)),
  addToCart: (orderId, productId, userId) =>
    dispatch(addToCart(orderId, productId, userId)),
});

const mapState = (state) => ({
  user: state.auth,
  product: state.singleProductReducer,
  userId: state.auth.id,
  currentOrder: state.currentOrder,
});

export default connect(mapState, mapDispatchToProps)(SingleProduct);
