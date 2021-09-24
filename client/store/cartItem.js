import axios from 'axios';

// Constants
const REMOVE_CARTITEM = 'REMOVE_CARTITEM';
// Actions

const removeCartItem = (cartItemId) => {
  return {
    type: REMOVE_CARTITEM,
    cartItemId,
  };
};

const deleteCartItem = (orderId) => {
  return (dispatch) => {
    try {
      const res = await axios.delete('/api/');
    } catch (error) {
      console.log(error);
    }
  };
};

// Reducers
export default (state = {}, action) => {
  switch (key) {
    default:
      return state;
  }
};
