import React, { useState, useReducer } from "react";
import ShopContext from "./shop-context";
import { shopReducer, ADD_PRODUCT, DELETE_PRODUCT } from "./reducer";

const GlobalState = props => {
  const [cartState, dispatch] = useReducer(shopReducer, { cart: [] });
  const products = [
    { id: "p1", title: "Gaming Mouse", price: 29.99 },
    { id: "p2", title: "Harry Potter 3", price: 9.99 },
    { id: "p3", title: "Used plastic bottle", price: 0.99 },
    { id: "p4", title: "Half-dried plant", price: 2.99 }
  ];

  const addProductToCart = product => {
    setTimeout(() => {
      dispatch({ type: ADD_PRODUCT, product });
    }, 700);
  };

  const removeProductFromCart = productID => {
    setTimeout(() => {
      dispatch({ type: DELETE_PRODUCT, productID });
    }, 700);
  };

  return (
    <ShopContext.Provider
      value={{
        products: products,
        cart: cartState.cart,
        addProductToCart: addProductToCart,
        removeProductFromCart: removeProductFromCart
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};

export default GlobalState;
