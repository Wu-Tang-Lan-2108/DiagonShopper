import axios from 'axios';

// Constants
const SET_CART = 'SET_CART';
const DELETE_CART = 'DELETE_CART';
// Actions
const setCart = (cart) => {
  return {
    type: SET_CART,
    cart,
  };
};

const removeCart = (cartId) => {
  return {
    type: DELETE_CART,
    cartId,
  };
};

export const fetchCart = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${userId}/cart`);
      dispatch(setCart(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteCart = (cartId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/carts/${cartId}`);
      dispatch(removeCart(cartId));   
    } catch (error) {
      console.log(error)
    }
  };
};

// Reducer
export default (state = [], action) => {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    case DELETE_CART:
      return state.filter(cart => cart.id !== action.cartId);
    default:
      return state;
  }
};
