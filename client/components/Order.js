import React from 'react';
import { connect } from 'react-redux';
import { fetchOrder } from '../store/order';
import SingleCart from './SingleCart';

class Order extends React.Component {
  componentDidMount() {
    this.props.getOrder(this.props.match.params.userId);
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.loadOrder.reduce((acc, cur) => {
            return [
              ...acc,
              ...cur.cartItems.map((cartItem) => {
                return (
                <SingleCart
                  product={{
                    name: cartItem.product.name,
                    price: cartItem.product.price / 100,
                    quantity: cartItem.quantity,
                  }}
                  key={cartItem.id}
                />
              )}),
            ];
          }, [])}
        </ul>
        <div>
          <p>
            total-
            {this.props.loadOrder.reduce((accumulator, currentValue) => {
              return (
                accumulator + currentValue.cartItems.reduce((acc, cur) => {
                  return acc + (cur.quantity * cur.product.price)
                }, 0)
              );
            }, 0) / 100}
          </p>
          <button type="button">purchase</button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  loadOrder: state.order,
});

const mapDispatchToProps = (dispatch) => ({
  getOrder: (userId) => dispatch(fetchOrder(userId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Order);
