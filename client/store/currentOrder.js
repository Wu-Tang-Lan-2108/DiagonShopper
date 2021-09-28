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

export const fetchCurrentOrder = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/orders/${userId}/current`);
      dispatch(setCurrentOrder(data));
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
