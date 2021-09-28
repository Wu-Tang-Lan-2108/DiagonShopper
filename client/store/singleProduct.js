import Axios from 'axios';

/**
 * ACTION TYPES
 */
const SET_PRODUCT = 'SET_PRODUCT';

/**
 * ACTION CREATORS
 */
const setProduct = (product) => ({ type: SET_PRODUCT, product });

/**
 * THUNK CREATORS
 */
export const fetchSingleProduct = (id) => async (dispatch) => {
  try {
    const { data } = await Axios.get(`/api/products/${id}`);
    dispatch(setProduct(data));
  } catch (error) {
    console.log(error);
  }
};

//REDUCER

export default function singleProductReducer(state = {}, action) {
  switch (action.type) {
    case SET_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
