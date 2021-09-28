import React from 'react';
import { connect } from 'react-redux';
import { deleteCartItem, updateQty, deleteOrder } from '../store/order';
import { fetchCurrentOrder } from '../store/currentOrder';
import SingleCart from './SingleCart';

class Order extends React.Component {
  componentDidMount() {
    this.props.getOrder(this.props.match.params.userId);
  }

  render() {
    console.log(this.props.loadOrder);
    return this.props.loadOrder.cartItems ? (
      <div>
        <ul>
          {this.props.loadOrder.cartItems.reduce((acc, cur) => {
            return [
              ...acc,
              <SingleCart
                product={{
                  id: cur.id,
                  name: cur.product.name,
                  price: cur.product.price,
                  quantity: cur.quantity,
                  deleteCartItem: this.props.deleteCartItem,
                }}
                update={this.props.updateCartItemQty}
                key={cur.id}
              />,
            ];
          }, [])}
        </ul>
        <div>
          <p>
            Total: $
            {this.props.loadOrder.cartItems.reduce((acc, cur) => {
              return acc + (cur.quantity * cur.product.price) / 100;
            }, 0)}
          </p>
          <button
            type="button"
            onClick={() => this.props.deleteOrder(this.props.loadOrder[0].id)}
          >
            purchase
          </button>
        </div>
      </div>
    ) : (
      <React.Fragment />
    );
  }
}
const mapStateToProps = (state) => ({
  loadOrder: state.currentOrder,
});

const mapDispatchToProps = (dispatch) => ({
  getOrder: (userId) => dispatch(fetchCurrentOrder(userId)),
  deleteCartItem: (cartItemId) => dispatch(deleteCartItem(cartItemId)),
  updateCartItemQty: (qtyObj) => dispatch(updateQty(qtyObj)),
  deleteOrder: (orderId) => dispatch(deleteOrder(orderId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Order);
