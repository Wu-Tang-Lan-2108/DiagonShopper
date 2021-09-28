import Axios from 'axios';

/**
 * ACTION TYPES
 */
const SET_PRODUCT = 'SET_PRODUCT';

const UPDATE_SINGLE_PRODUCT = 'UPDATE_SINGLE_PRODUCT';

/**
 * ACTION CREATORS
 */
const setProduct = product => ({ type: SET_PRODUCT, product });

const updSingleProduct = product => ({ type: UPDATE_SINGLE_PRODUCT, product });

/**
 * THUNK CREATORS
 */
export const fetchSingleProduct = id => async dispatch => {
  try {
    const { data } = await Axios.get(`/api/products/${id}`);
    dispatch(setProduct(data));
  } catch (error) {
    console.log(error);
  }
};

export function updateSingleProduct(product) {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      const { data } = await Axios.put(`/api/products/${product.id}`, product, {
        headers: { authorization: token },
      });
      dispatch(updSingleProduct(data));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
}

//REDUCER

export default function singleProductReducer(state = {}, action) {
  switch (action.type) {
    case SET_PRODUCT:
      return action.product;
    case UPDATE_SINGLE_PRODUCT:
      if(state.id === action.product.id){
        return action.product;
      }else
        break;
    default:
      return state;
  }
}
