import React, { useContext } from "react";
// import { connect } from "react-redux";
import ShopContext from "../context/shop-context";
import { ADD_PRODUCT } from "../context/GlobalState";

import MainNavigation from "../components/MainNavigation";
// import { addProductToCart } from "../store/actions";
import "./Products.css";

const ProductsPage = props => {
  const { state, dispatch } = useContext(ShopContext);
  return (
    <>
      <MainNavigation
        cartItemNumber={state.cart.reduce((count, curItem) => {
          return count + curItem.quantity;
        }, 0)}
      />
      <main className="products">
        <ul>
          {state.products.map(product => (
            <li key={product.id}>
              <div>
                <strong>{product.title}</strong> - ${product.price}
              </div>
              <div>
                <button
                  onClick={() => dispatch({ type: ADD_PRODUCT, product })}
                >
                  Add to Cart
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
//     products: state.products,
//     cartItemCount: state.cart.reduce((count, curItem) => {
//       return count + curItem.quantity;
//     }, 0)
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     addProductToCart: product => dispatch(addProductToCart(product))
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);

export default ProductsPage;
