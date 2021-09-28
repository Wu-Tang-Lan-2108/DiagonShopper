import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/allProducts';
import { Link } from 'react-router-dom';

import { Grid, Card, CardHeader, Typography, Button, Divider, CardMedia } from '@mui/material'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
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
                     <Button variant="contained">
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
  };
};

const mapState = (state) => {
  return {
    products: state.allProducts,
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
