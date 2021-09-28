import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/allProducts';
import { Link } from 'react-router-dom';

import { Grid, Card, CardHeader, Typography, Button, Divider, CardMedia } from '@mui/material'

import AddProductForm from './AddProduct';

import { addToCart, fetchCurrentOrder } from '../store/currentOrder';
class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
    this.props.fetchCurrentOrder(this.props.userId);
  }

  render() {
    return (
      <div>


        {this.props.products ? (

          <Grid container spacing={2} sx={{
            alignContent: 'center',
          }}>
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
                     <CardMedia sx={{
                       alignContent:"center",
                     }}>
                       <Typography variant="body1">
                         Price: ${productPrice}
                        </Typography>
                     <Button variant="contained" onClick={() => {
                      this.props.addToCart(
                        this.props.currentOrder,
                        product,
                        this.props.userId
                      );
                    }}>
                       Add To Cart
                     </Button>
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
  };
};

const mapState = (state) => {
  return {
    products: state.allProducts,
    userId: state.auth.id,
    currentOrder: state.currentOrder,
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
