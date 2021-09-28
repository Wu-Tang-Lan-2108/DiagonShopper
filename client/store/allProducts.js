import axios from 'axios';

// Constants
const SET_PRODUCTS = 'SET_PRODUCTS';
const CREATE_PRODUCT = 'CREATE_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';

// Actions
function setProducts(products) {
  return {
    type: SET_PRODUCTS,
    products,
  };
}

function createProduct(product) {
  return {
    type: CREATE_PRODUCT,
    product,
  };
}

function updateProduct(product) {
  return {
    type: UPDATE_PRODUCT,
    product,
  };
}

function deleteProduct(product) {
  return {
    type: DELETE_PRODUCT,
    product,
  };
}

//Thunks
export function fetchProducts() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/products');
      dispatch(setProducts(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function updProduct(product) {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      const { data } = await axios.put(`/api/products/${product.id}`, product, {
        headers: { authorization: token },
      });
      dispatch(updateProduct(data));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
}

export function makeProduct(product) {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      const { data } = await axios.post('/api/products', product, {
        headers: { authorization: token },
      });
      dispatch(createProduct(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function delProduct(id) {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      const { data } = await axios.delete(`/api/products/${id}`, {
        headers: { authorization: token },
      });
      dispatch(deleteProduct(data));
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
    case UPDATE_PRODUCT:
      return state.map((product) => {
        if (product.id === action.product.id) {
          return action.product;
        } else return product;
      });
    case CREATE_PRODUCT:
      return [...state, action.product];
    case DELETE_PRODUCT:
      return state.filter((product) => product.id !== action.product.id);
    default:
      return state;
  }
}
