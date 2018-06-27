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
  const $shoppingCartForm = $('#shoppingcart-form tbody');
  const $shoppingCartVATS = $('.shoppingcart__taxes');
  const $priceBeforeVAT = $shoppingCartVATS.find('.price-before-vat output b');
  const $VATPercentage = $shoppingCartVATS.find('.price-vat .vat-percentage');
  const $VATPrice = $shoppingCartVATS.find('.price-vat output b');
  const $priceAfterVAT = $shoppingCartVATS.find('.shoppingcart__total output b');

  const cart = Cart.shoppingcartModel();

  function populateCart(newProduct, newProductDesc) {
    const { name, price, quantity } = newProduct;
    const cartRow = `<tr class="shoppingcart__row">
      <td class="shoppingcart__item_info">
        <h5>${name}</h5>
        <p>${newProductDesc}</p>
        <button class="shoppingcart__item_remove">Remove</button>
      </td>
      <td class="shoppingcart__item_price">
        <output>&euro;${price}</output>
      </td>
      <td class="shoppingcart__item_actions">
        <input type="number" min="1" value="${quantity}">
        <span class="controls">
          <button type="button" title="decrease">-</button>
          <button type="button" title="step up">+</button>
        </span>
      </td>
    </tr>`;

    $shoppingCartForm.append(cartRow);
  }

  function _initCart() {
    const total = cart.getCart().total,
          beforeVAT = total.beforeVAT,
          afterVAT = total.afterVAT,
          VAT = total.VAT,
          _VATRate = cart.getVATRate;

    $priceBeforeVAT.html(`&euro; ${beforeVAT}`);
    $VATPercentage.text(_VATRate);
    $priceAfterVAT.html(`&euro; ${afterVAT}`);
    $VATPrice.html(`&euro; ${VAT}`);
  }

  function updateCart(newProduct = {}, newProductDesc = '') {
    populateCart(newProduct, newProductDesc);
    _initCart();
  }

  $(document).ready(function() {
    _initCart();
    $addToCartBtn.each((index, el) => {
      $(el).click((event) => {
        event.preventDefault();
        const buttonData = $(el).data('shop-listing');
        const { name, price } = buttonData;
        const newProduct = Object.assign({
          name,
          price
        }, {quantity: 1});

        cart.addProducts(newProduct);
        updateCart(newProduct, buttonData.description);
      });
    });
  });
}
