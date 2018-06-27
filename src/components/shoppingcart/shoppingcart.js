// import ShoppingcartModel from './shoppingcart.model';
// // A different Approach using ES6 (didn't continue since wont work with current tests)
// export function initShoppingCart() {
//   let shoppingCart = new ShoppingcartModel();
//   console.log(shoppingCart.init()); //eslint-disable-line no-console
// }
import $ from 'jquery';
import Cart from './shoppingcart.model';

export function initShoppingCart() {
  const $addToCartBtn = $('.shop__item button');
  const $shoppingCartForm = $('#shoppingcart-form');
  const $shoppingCartVATS = $('.shoppingcart__taxes');
  const $priceBeforeVAT = $shoppingCartVATS.find('.price-before-vat output');
  const $VATPercentage = $shoppingCartVATS.find('.price-vat output');
  const $priceAfterVAT = $shoppingCartVATS.find('.shoppingcart__total output');

  function initCart() {
    const cart = Cart.shoppingcartModel(),
          total = cart.getCart().total,
          beforeVAT = total.beforeVAT,
          afterVAT = total.afterVAT,
          VAT = total.VAT;

    cart.init();
    $priceBeforeVAT.text(beforeVAT);
    $priceAfterVAT.text(afterVAT);
    $VATPercentage.text(VAT);
  }

  $(document).ready(function() {
    initCart();
    $addToCartBtn.each((index, el) => {
      $(el).click((event) => {
        event.preventDefault();
        console.log($(el).data('shop-listing')) //eslint-disable-line no-console
      });
    });
  });
}
