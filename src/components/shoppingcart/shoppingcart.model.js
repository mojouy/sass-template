// 'use strict';
// A different Approach using ES6 (didn't continue since wont work with current tests)
//
// export default class ShoppingcartModel {
//   constructor() {
//     console.log(window[NETCENTRIC_NAMESPACE])
//   }
//
//   init() {
//     return window[NETCENTRIC_NAMESPACE][MODULE_NAME];
//   }
// }

(function() {
  const MODULE_NAME = 'shoppingcartModel',
    NETCENTRIC_NAMESPACE = 'nn';

  window[NETCENTRIC_NAMESPACE] = window[NETCENTRIC_NAMESPACE] || {};

  window[NETCENTRIC_NAMESPACE][MODULE_NAME] = function() {
    const _VATRate = 20;

    const _getCart = function() {
      return {
        products: [],
        total: {
          beforeVAT: 0,
          afterVAT: 0,
          VAT: 0
        }
      };
    };

    const _getProductBeforeVAT = function(product) {
      return product.price * product.quantity;
    }

    function _getVAT(beforeVAT, VATRate) {
      return (beforeVAT / 100) * VATRate;
    }

    function _getAfterVAT(beforeVAT, VAT) {
      return beforeVAT + VAT;
    }

    function _calculateTotals(product, total) {
      let { beforeVAT, afterVAT } = total;
      beforeVAT = _getProductBeforeVAT(product);
      let VAT = _getVAT(beforeVAT, _VATRate);
      afterVAT = _getAfterVAT(product.price, VAT);

      return  {
        beforeVAT,
        afterVAT,
        VAT
      };
    }//Calculate Totals (beforeVAT afterVAT VAT)

    return {
      init: function() {
        return 99;
      },

      getCart: _getCart,

      addProducts: function(newOrExistingProducts) {
        let cart = _getCart();
        let { products, total} = cart;

        cart.total = _calculateTotals(newOrExistingProducts, total);
        console.log(//eslint-disable-line no-console
          products.filter(
            product => product.name !== newOrExistingProducts.name));
        products.push(newOrExistingProducts);
        return cart;
      },

      changeProductQuantity: function() { //product, newQuantity
        return _getCart();
      },

      removeProducts: function() { //productsToDelete
        return _getCart();
      },

      destroy: function() {
        return console.log('Destroy'); //eslint-disable-line no-console
      },
    };
  };
})();
module.exports = window.nn;
