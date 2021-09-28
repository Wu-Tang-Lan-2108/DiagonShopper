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
          window.localStorage.setItem('CURRENT_ORDER', JSON.stringify(data));
          dispatch(setCurrentOrder(data));
        } else {
          let currentCart;
          if (window.localStorage.getItem('CURRENT_ORDER')) {
            currentCart = JSON.parse(
              window.localStorage.getItem('CURRENT_ORDER')
            );
          } else {
            currentCart = { status: 'CURRENT', cartItems: [], userId: 0 };
          }
          const fetchedProductItem = (
            await axios.get(`/api/products/${productId}`)
          ).data;
          const potentialCartItemFromLS = currentCart.cartItems.find(
            (cartItem) => cartItem.productId === productId
          );
          console.log(potentialCartItemFromLS);
          if (potentialCartItemFromLS) {
            if (product.quantity < potentialCartItemFromLS.quantity + 1) {
              window.alert('Not Enough Stock');
            } else {
              currentCart.cartItems = currentCart.cartItems.map((cartItem) => {
                if (cartItem.id === potentialCartItemFromLS.id) {
                  return { ...cartItem, quantity: cartItem.quantity + 1 };
                }
              });
              window.localStorage.setItem(
                'CURRENT_ORDER',
                JSON.stringify(currentCart)
              );
            }
          } else {
            const biggestIndex = currentCart.cartItems.reduce((acc, cur) => {
              return acc.id >= cur.id ? acc.id : cur.id;
            }, 0);
            currentCart.cartItems.push({
              id: biggestIndex + 1,
              orderId: 0,
              productId: fetchedProductItem.id,
              product: fetchedProductItem,
              quantity: 1,
            });
            window.localStorage.setItem(
              `CURRENT_ORDER`,
              JSON.stringify(currentCart)
            );
          }
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
          const currentCart = {
            id: 0,
            status: 'CURRENT',
            cartItems: [],
            userId: 0,
          };
          window.localStorage.setItem(
            'CURRENT_ORDER',
            JSON.stringify(currentCart)
          );
          dispatch(setCurrentOrder(currentCart));
        }
      } else {
        const { data } = await axios.get(`/api/orders/${userId}/current`);
        window.localStorage.setItem('CURRENT_ORDER', JSON.stringify(data));
        dispatch(setCurrentOrder(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const purchaseOrder = (orderId, userId) => {
  return async (dispatch) => {
    try {
      if (orderId === 0) {
        const order = JSON.parse(window.localStorage.getItem('CURRENT_ORDER'));
        await Promise.all(
          order.cartItems.map((cartItem) => {
            axios.put(`/api/products/${cartItem.product.id}`, {
              quantity: cartItem.product.quantity - cartItem.quantity,
            });
          })
        );
        order.cartItems = [];
        window.localStorage.setItem('CURRENT_ORDER', JSON.stringify(order));
        dispatch(setCurrentOrder(order));
      } else {
        const pastOrder = (
          await axios.put(`/api/orders/${orderId}`, {
            status: 'PAST',
          })
        ).data;
        await Promise.all(
          pastOrder.cartItems.map((cartItem) => {
            axios.put(`/api/products/${cartItem.product.id}`, {
              quantity: cartItem.product.quantity - cartItem.quantity,
            });
          })
        );
        const { data } = await axios.post(`/api/orders/`, { userId });
        dispatch(setCurrentOrder(data));
      }
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
