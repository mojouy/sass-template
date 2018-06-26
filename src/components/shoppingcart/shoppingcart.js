// import ShoppingcartModel from './shoppingcart.model';
// // A different Approach using ES6 (didn't continue since wont work with current tests)
// export function initShoppingCart() {
//   let shoppingCart = new ShoppingcartModel();
//   console.log(shoppingCart.init()); //eslint-disable-line no-console
// }
import Cart from './shoppingcart.model';

export function initShoppingCart() {
  Cart.shoppingcartModel().init();
}
