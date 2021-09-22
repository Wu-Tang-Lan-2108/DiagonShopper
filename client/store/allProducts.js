import axios from "axios";

// Constants
const SET_PRODUCTS = "SET_PRODUCTS";

// Actions
function setProducts(products) {
  return {
    type: SET_PRODUCTS,
    products,
  };
}

export function fetchProducts() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/products");
      dispatch(setProducts(data));
    } catch (error) {
      console.log(error);
    }
  };
}

// Reducer
export default function reducer(state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
