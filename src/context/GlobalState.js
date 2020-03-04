import React, { useState } from "react";
import ShopContext from "./shop-context";

const GlobalState = props => {
  const [state, setState] = useState({
    products: [
      { id: "p1", title: "Gaming Mouse", price: 29.99 },
      { id: "p2", title: "Harry Potter 3", price: 9.99 },
      { id: "p3", title: "Used plastic bottle", price: 0.99 },
      { id: "p4", title: "Half-dried plant", price: 2.99 }
    ],
    cart: [],
    cartSum: 0
  });

  const addProductToCart = product => {
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
    setState(state => {
      return {
        ...state,
        cart: updatedCart
      };
    });
  };

  const removeProductFromCart = productID => {
    const updatedCart = [...state.cart];
    const updatedItemIndex = updatedCart.findIndex(
      item => item.id === productID
    );

    const updatedItem = {
      ...updatedCart[updatedItemIndex]
    };
    updatedItem.quantity--;
    if (updatedItem.quantity <= 0) {
      updatedCart.splice(updatedItemIndex, 1);
    } else {
      updatedCart[updatedItemIndex] = updatedItem;
    }
    setState(state => {
      return {
        ...state,
        cart: updatedCart
      };
    });
  };

  return (
    <ShopContext.Provider
      value={{
        products: state.products,
        cart: state.cart,
        addProductToCart: addProductToCart,
        removeProductFromCart: removeProductFromCart
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};

export default GlobalState;
