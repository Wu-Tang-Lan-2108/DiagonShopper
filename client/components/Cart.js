import React from 'React';
import { connect } from 'react-redux';
import { fetchCart } from '../store/cart';
import SingleCart from './SingleCart';

class Cart extends React.Component {
  componentDidMount() {
    this.props.getCart(this.props.match.params.userId);
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.loadCart.map((cart) => (
            <li key={cart.id}>
              <SingleCart product={cart.product} />
            </li>
          ))}
        </ul>
        <div>
          <p>
            {this.props.loadCart.reduce((accumulator, currentValue) => {
              return (
                accumulator + currentValue.product.price * currentValue.quantity
              );
            }, 0)}
          </p>
          <button type="button">purchase</button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  loadCart: state.cart,
});

const mapDispatchToProps = (dispatch) => ({
  getCart: (userId) => dispatch(fetchCart(userId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
