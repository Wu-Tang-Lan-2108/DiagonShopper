import axios from 'axios';

// Constants
const SET_ORDER = 'SET_ORDER';
const DELETE_ORDER = 'DELETE_ORDER';
const REMOVE_ORDER_ITEM = 'REMOVE_ORDER_ITEM';
// Actions
const setOrder = (order) => {
  return {
    type: SET_ORDER,
    order,
  };
};

const removeOrder = (orderId) => {
  return {
    type: DELETE_ORDER,
    orderId,
  };
};

const removeOrderItem = (cartItemId) => {
  return {
    type: REMOVE_ORDER_ITEM,
    cartItemId,
  };
};

export const fetchOrder = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${userId}/order`);
      dispatch(setOrder(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteOrder = (orderId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/orders/${orderId}`);
      dispatch(removeOrder(orderId));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteCartItem = (cartItemId) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`/api/cartItem/${cartItemId}`);
      if (res.status === 204) {
        dispatch(removeOrderItem(cartItemId));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// Reducer
export default (state = [], action) => {
  switch (action.type) {
    case SET_ORDER:
      return action.order;
    case DELETE_ORDER:
      return state.filter((order) => order.id !== action.orderId);
    case REMOVE_ORDER_ITEM:
      return state.reduce((acc, cur) => {
        return [
          ...acc,
          ...cur.filter((cartItem) => cartItem.id !== action.cartItemId),
        ];
      }, []);
    default:
      return state;
  }
};
