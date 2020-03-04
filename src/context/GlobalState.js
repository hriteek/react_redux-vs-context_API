import React, { useReducer } from "react";
import ShopContext from "./shop-context";
// import { shopReducer, ADD_PRODUCT, DELETE_PRODUCT } from "./reducer";

export const ADD_PRODUCT = "ADD_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

const addProductToCart = (product, state) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    item => item.id === product.id
  );

  if (updatedItemIndex < 0) {
    updatedCart.push({ ...product, quantity: 1 });
  } else {
    const updatedItem = {
      ...updatedCart[updatedItemIndex]
    };
    updatedItem.quantity++;
    updatedCart[updatedItemIndex] = updatedItem;
  }
  return { ...state, cart: updatedCart };
};

const removeProductFromCart = (productID, state) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(item => item.id === productID);

  const updatedItem = {
    ...updatedCart[updatedItemIndex]
  };
  updatedItem.quantity--;
  if (updatedItem.quantity <= 0) {
    updatedCart.splice(updatedItemIndex, 1);
  } else {
    updatedCart[updatedItemIndex] = updatedItem;
  }
  return {
    ...state,
    cart: updatedCart
  };
};

const initialState = {
  cart: [],
  products: [
    { id: "p1", title: "Gaming Mouse", price: 29.99 },
    { id: "p2", title: "Harry Potter 3", price: 9.99 },
    { id: "p3", title: "Used plastic bottle", price: 0.99 },
    { id: "p4", title: "Half-dried plant", price: 2.99 }
  ]
};

const GlobalState = props => {
  // const [cartState, dispatch] = useReducer(shopReducer, { cart: [] });

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case ADD_PRODUCT:
        return addProductToCart(action.product, state);
      case DELETE_PRODUCT:
        return removeProductFromCart(action.productID, state);
      default:
        return state;
    }
  }, initialState);

  // const products = [
  //   { id: "p1", title: "Gaming Mouse", price: 29.99 },
  //   { id: "p2", title: "Harry Potter 3", price: 9.99 },
  //   { id: "p3", title: "Used plastic bottle", price: 0.99 },
  //   { id: "p4", title: "Half-dried plant", price: 2.99 }
  // ];

  // const addProductToCart = product => {
  //   setTimeout(() => {
  //     dispatch({ type: ADD_PRODUCT, product });
  //   }, 700);
  // };

  // const removeProductFromCart = productID => {
  //   setTimeout(() => {
  //     dispatch({ type: DELETE_PRODUCT, productID });
  //   }, 700);
  // };

  return (
    <ShopContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};

export default GlobalState;
