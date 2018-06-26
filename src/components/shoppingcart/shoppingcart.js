import ShoppingcartModel from './shoppingcart.model';

export function initShoppingCart() {
  let shoppingCart = new ShoppingcartModel();
  console.log(shoppingCart.init()); //eslint-disable-line no-console
}
