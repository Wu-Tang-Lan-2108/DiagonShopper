import React from 'react';
import { connect } from 'react-redux';
import {
  fetchCurrentOrder,
  purchaseOrder,
  deleteCartItem,
  updateQty,
} from '../store/currentOrder';
import { updateQty } from '../store/order';
import SingleCart from './SingleCart';

class Order extends React.Component {
  componentDidMount() {
    this.props.getOrder(this.props.match.params.userId);
  }

  render() {
    console.log(this.props.loadOrder);
    return this.props.loadOrder.cartItems &&
      this.props.loadOrder.cartItems.length >= 1 ? (
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
                  maxQuantity: cur.product.quantity,
                  purchasingUser: this.props.loadOrder.userId,
                }}
                deleteCartItem={this.props.deleteCartItem}
                update={this.props.updateCartItemQty}
                userId={this.props.match.params.userId}
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
            onClick={() =>
              this.props.purchaseOrder(
                this.props.loadOrder.id,
                this.props.loadOrder.userId
              )
            }
          >
            purchase
          </button>
        </div>
      </div>
    ) : (
      <p>Nothing in Cart!</p>
    );
  }
}
const mapStateToProps = (state) => ({
  loadOrder: state.currentOrder,
});

const mapDispatchToProps = (dispatch) => ({
  getOrder: (userId) => dispatch(fetchCurrentOrder(userId)),
  deleteCartItem: (cartItemId, userId) =>
    dispatch(deleteCartItem(cartItemId, userId)),
  updateCartItemQty: (qtyObj, userId) => dispatch(updateQty(qtyObj, userId)),
  purchaseOrder: (orderId, userId) => dispatch(purchaseOrder(orderId, userId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Order);
