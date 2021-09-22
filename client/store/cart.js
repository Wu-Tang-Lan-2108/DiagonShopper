// Constants
const SET_CART = "SET_CART";
// Actions
const setCart = (cart) => {
  return {
    type: SET_CART,
    cart,
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

// Reducer
export default (state = [], action) => {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    default:
      return state;
  }
};
