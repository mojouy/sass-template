import _ from 'lodash';
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
    let storeCart = {
      products: [],
      total: {
        beforeVAT: 0,
        afterVAT: 0,
        VAT: 0
      }
    };

    const _getCart = function() {
      return storeCart;
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

    function _calculateTotals(product) {
      let { beforeVAT, afterVAT, VAT } = storeCart.total;
      const { quantity } = product;
      if (quantity > 1) {
        beforeVAT = _getProductBeforeVAT(product) * quantity;
        VAT = _getVAT(beforeVAT, _VATRate);
        afterVAT = _getAfterVAT(product.price * quantity, VAT);
      } else {
        beforeVAT = _getProductBeforeVAT(product);
        VAT = _getVAT(beforeVAT, _VATRate);
        afterVAT = _getAfterVAT(product.price, VAT);
      }

      return  {
        beforeVAT,
        afterVAT,
        VAT
      };
    }//Calculate Totals (beforeVAT afterVAT VAT)

    function _isProductInCart(product) {
      return _.filter(storeCart.products, p => p.name === product.name).length > 0;
    }

    function _shapeCart(product) {
      let newCart = {...storeCart};
      let { products, total } = newCart;
      if (_isProductInCart(product)) {
        const quantity = _.filter(products, p => p.name === product.name).length + 1;
        products = [Object.assign(product, {quantity})];
        total = _calculateTotals(product);
      } else {
        products = [...products, product];
        total = _calculateTotals(product);
      }

      storeCart = Object.assign(storeCart, {products}, {total});
    }

    return {
      init: function() {
        return _getCart();
      },

      getCart: _getCart,

      addProducts: function(newOrExistingProducts) {
        let newCart = {};

        if (Array.isArray(newOrExistingProducts)) {
          newOrExistingProducts.map((product) => {
            newCart = Object.assign(newCart, _shapeCart(product));
          });
        } else {
          newCart = Object.assign(newCart, _shapeCart(newOrExistingProducts));
        }
        return _getCart();
      },

      changeProductQuantity: function() { //product, newQuantity
        console.log('change quantity')//eslint-disable-line no-console
        // const cartWithoutProduct =
        //_.filter(products, p => p.name !== newOrExistingProducts.name);
        // newProducts = [...cartWithoutProduct, newOrExistingProducts];
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
