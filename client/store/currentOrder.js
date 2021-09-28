import axios from 'axios';
// Constants
const SET_CURRENT_ORDER = 'SET_CURRENT_ORDER';

// Actions

const setCurrentOrder = (order) => {
  return {
    type: SET_CURRENT_ORDER,
    order,
  };
};

export const addToCart = (order, product, userId) => {
  return async (dispatch) => {
    try {
      const productId = product.id;
      const orderId = order.id;
      console.log(order);
      const potentialCartItem = order.cartItems.find(
        (cartItem) => cartItem.productId === productId
      );
      if (
        potentialCartItem &&
        product.quantity <= potentialCartItem.quantity + 1
      ) {
        window.alert('Not enough Stock');
      } else {
        if (userId) {
          await axios.post(`/api/cartItem`, {
            quantity: 1,
            orderId,
            productId,
          });
          const { data } = await axios.get(`/api/orders/${orderId}`);
          window.localStorage.setItem('CURRENT_CART', JSON.stringify(data));
          dispatch(setCurrentOrder(data));
        } else {
          let currentCart;
          if (window.localStorage.getItem('CURRENT_CART')) {
            currentCart = JSON.parse(
              window.localStorage.getItem('CURRENT_CART')
            );
          } else {
            currentCart = { status: 'CURRENT', cartItems: [], userId: 0 };
          }
          currentCart.cartItems.push({ orderId, productId });
          window.localStorage.setItem(
            `CURRENT_CART`,
            JSON.stringify(currentCart)
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchCurrentOrder = (userId) => {
  return async (dispatch) => {
    try {
      if (!userId) {
        if (window.localStorage.getItem('CURRENT_ORDER')) {
          dispatch(
            setCurrentOrder(
              JSON.parse(window.localStorage.getItem('CURRENT_ORDER'))
            )
          );
        } else {
          const currentCart = { status: 'CURRENT', cartItems: [], userId: 0 };
          window.localStorage.setItem(
            'CURRENT_CART',
            JSON.stringify(currentCart)
          );
          dispatch(setCurrentOrder(currentCart));
        }
      }
      const { data } = await axios.get(`/api/orders/${userId}/current`);
      window.localStorage.setItem('CURRENT_CART', JSON.stringify(data));
      dispatch(setCurrentOrder(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const purchaseOrder = (orderId, userId) => {
  return async (dispatch) => {
    try {
      const pastOrder = (
        await axios.put(`/api/orders/${orderId}`, {
          status: 'PAST',
        })
      ).data;
      await Promise.all(
        pastOrder.cartItems.map((cartItem) => {
          console.log(cartItem);
          axios.put(`/api/products/${cartItem.product.id}`, {
            quantity: cartItem.product.quantity - cartItem.quantity,
          });
        })
      );
      const { data } = await axios.post(`/api/orders/`, { userId });
      dispatch(setCurrentOrder(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteCartItem = (cartItemId, userId) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`/api/cartItem/${cartItemId}`);
      if (res.status === 204) {
        dispatch(fetchCurrentOrder(userId));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// Reducer
export default (state = {}, action) => {
  switch (action.type) {
    case SET_CURRENT_ORDER:
      return action.order;
    default:
      return state;
  }
};
