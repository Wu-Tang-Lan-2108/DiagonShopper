import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/allProducts';
import { Link } from 'react-router-dom';

import { Grid, Card, CardHeader, Typography, Button, Divider, CardMedia } from '@mui/material'

import AddProductForm from './AddProduct';

import { addToCart, fetchCurrentOrder } from '../store/currentOrder';
import { Box } from '@mui/system';
class AllProducts extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {}
    }
  }
  componentDidMount() {
    this.setState({
      user: this.props.user
    });
    this.props.fetchProducts();
    this.props.fetchCurrentOrder(this.props.userId);
  }

  render() {
    return (
      <div>
        {this.props.products ? (

          <Grid container spacing={2}>
            {this.state.user.type === 'admin' ? (

            <Grid item container xs={12} alignContent="center">
              <Card>
                <CardHeader
                title="Add Product"
                />
                <AddProductForm />
              </Card>
            </Grid>
            ) : (
              <React.Fragment />
            )}
            {this.props.products.map((product) => {
              let productPrice = product.price.toString().slice(0,-2) + '.' + product.price.toString().slice(-2)
              return (
                <Grid item key={product.id} xs={6}>

                  <Card>
                    <CardHeader
                    title={
                    <Link to={`/products/${product.id}`}>
                      <Typography variant="h4">
                        {product.name}
                      </Typography>
                    </Link>
                    }
                     />
                     <Divider />
                     <CardMedia>
                       <Typography variant="body1">
                         Price: ${productPrice}
                        </Typography>
                        {this.state.user.type === 'admin' ? (
                    <Button
                      variant="contained"
                      onClick={() => this.props.deleteProduct(product.id)}
                    >
                      Delete
                    </Button>
                   ) : (
                    <Button variant="contained" onClick={() => {
                      this.props.addToCart(
                        this.props.currentOrder,
                        product,
                        this.props.userId
                      );
                    }}>
                       Add To Cart
                     </Button>
                     )}

                     </CardMedia>
                  </Card>

                </Grid>
              );
            })}
        </Grid>
        ) : (
          <React.Fragment />
        )}


      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    fetchCurrentOrder: (userId) => dispatch(fetchCurrentOrder(userId)),
    addToCart: (orderId, productId, userId) =>
      dispatch(addToCart(orderId, productId, userId)),
    deleteProduct: (id) => dispatch(delProduct(id))
  };
};

const mapState = (state) => {
  return {
    products: state.allProducts,
    userId: state.auth.id,
    currentOrder: state.currentOrder,
    user: state.auth
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
