'use strict';

export default class ShoppingcartModel {
  constructor() {
    this.constructor = this;
  }

  init() {
    return 90;
  }
}

// function shoppingcartModel() {
//   var MODULE_NAME = 'shoppingcartModel',
//       NETCENTRIC_NAMESPACE = 'nn';
//
//   window[NETCENTRIC_NAMESPACE] = window[NETCENTRIC_NAMESPACE] || {};
//
//   window[NETCENTRIC_NAMESPACE][MODULE_NAME] = function () {
//     this._getCart = function _getCart() {
//       return {
//         total: {
//           beforeVAT: 0,
//           afterVAT: 0,
//           VAT: 0
//         },
//         products: [],
//         VATRate: null
//       };
//     };
//
//     return {
//       init: function init() {
//         return this._getCart();
//       },
//
//       getCart: this._getCart,
//
//       addProducts: function addProducts(newOrExistingProducts) {
//         return this.getCart( console.log("ss"));
//       },
//
//       changeProductQuantity: function changeProductQuantity(product, newQuantity) {
//         return _getCart();
//       },
//
//       removeProducts: function removeProducts(productsToDelete) {
//         return _getCart();
//       },
//
//       destroy: function destroy() {}
//     };
//   };
// };
