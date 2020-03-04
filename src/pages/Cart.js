import React, { useContext, useEffect } from "react";
// import { connect } from "react-redux";

import ShopContext from "../context/shop-context";
import { DELETE_PRODUCT } from "../context/GlobalState";
import MainNavigation from "../components/MainNavigation";
// import { removeProductFromCart } from "../store/actions";
import "./Cart.css";

const CartPage = props => {
  const { state, dispatch } = useContext(ShopContext);

  useEffect(() => {
    console.log(state);
  }, []);

  const { cart } = state;
  return (
    <>
      <MainNavigation
        cartItemNumber={cart.reduce((count, curItem) => {
          return count + curItem.quantity;
        }, 0)}
      />
      <main className="cart">
        {cart.length <= 0 && <p>No Item in the Cart!</p>}
        <ul>
          {cart.map(cartItem => (
            <li key={cartItem.id}>
              <div>
                <strong>{cartItem.title}</strong> - ${cartItem.price} (
                {cartItem.quantity})
              </div>
              <div>
                <button
                  onClick={() =>
                    dispatch({ type: DELETE_PRODUCT, productID: cartItem.id })
                  }
                >
                  Remove from Cart
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

// const mapStateToProps = state => {
//   return {
//     cartItems: state.cart,
//     cartItemCount: state.cart.reduce((count, curItem) => {
//       return count + curItem.quantity;
//     }, 0)
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     removeProductFromCart: id => dispatch(removeProductFromCart(id))
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(CartPage);

export default CartPage;
