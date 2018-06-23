require('./shoppingcart.model');

const NETCENTRIC_NAMESPACE = 'nn',
  MODULE_NAME = 'shoppingcartModel';

/**
 * @param {number} beforeVAT
 * @param {number} VATRate (in percentage)
 */
function _getVAT(beforeVAT, VATRate) {
  return (beforeVAT / 100) * VATRate;
}

/**
 * @param {number} beforeVAT
 * @param {number} VAT
 */
function _getAfterVAT(beforeVAT, VAT) {
  return beforeVAT + VAT;
}

/**
 * @param {Object} product
 * @property {number} product.price
 * @property {number} product.quantity
 */
function _getProductBeforeVAT(product) {
  return product.price * product.quantity
}

describe(`NO product added`, () => {
  test(`cart`, () => {
    const instance = window[NETCENTRIC_NAMESPACE][MODULE_NAME]();
    const emptyCart = {
      products: [],
      total: {
        beforeVAT: 0,
        afterVAT: 0,
        VAT: 0
      }
    }

    instance.init();
    expect(instance.getCart()).toEqual(emptyCart);
  });
});

describe(`ONE product added`, () => {
  const _VATRate = 20
  const _product = {
    name: 'product1',
    price: 1.50,
    quantity: 1
  };
  let _instance
  let _cart

  beforeEach(() => {
    _instance = window[NETCENTRIC_NAMESPACE][MODULE_NAME]();
    _instance.init(_VATRate);
    _cart = _instance.addProducts(_product);
  });

  test(`cart's products`, () => {
    expect(_cart.products).toEqual([_product]);
  });

  test(`cart's beforeVAT`, () => {
    expect(_cart.total.beforeVAT).toBe(_getProductBeforeVAT(_product));
  });

  test(`cart's afterVAT`, () => {
    const beforeVAT = _getProductBeforeVAT(_product)
    const VAT = _getVAT(beforeVAT, _VATRate)
    const afterVAT = _getAfterVAT(_product.price, VAT)

    expect(_cart.total.afterVAT).toBe(afterVAT);
  });

  test(`cart's VAT`, () => {
    const beforeVAT = _getProductBeforeVAT(_product)
    const VAT = _getVAT(beforeVAT, _VATRate)

    expect(_cart.total.VAT).toBe(VAT);
  });
});

describe(`TWO TIMES the SAME product ADDED`, () => {
  const _VATRate = 20;
  const _product = {
    name: 'product1',
    price: 1.50,
    quantity: 1
  };
  let _instance;
  let _cart;

  beforeEach(() => {
    _instance = window[NETCENTRIC_NAMESPACE][MODULE_NAME]();
    _instance.init(_VATRate);

    _cart = _instance.addProducts([_product, _product]);
  });

  test(`cart's products`, () => {
    const result = Object.assign({}, _product, {'quantity': 2});
    expect(_cart.products).toEqual([result]);
  });

  test(`cart's beforeVAT`, () => {
    const beforeVAT = _getProductBeforeVAT(_product) + _getProductBeforeVAT(_product)

    expect(_cart.total.beforeVAT).toBe(beforeVAT);
  });

  test(`cart's afterVAT`, () => {
    const beforeVAT = _getProductBeforeVAT(_product) + _getProductBeforeVAT(_product)
    const VAT = _getVAT(beforeVAT, _VATRate)
    const afterVAT = _getAfterVAT(_product.price * 2, VAT)

    expect(_cart.total.afterVAT).toBe(afterVAT);
  });

  test(`cart's VAT`, () => {
    const beforeVAT = _getProductBeforeVAT(_product) + _getProductBeforeVAT(_product)
    const VAT = _getVAT(beforeVAT, _VATRate)

    expect(_cart.total.VAT).toBe(VAT);
  });
});

describe(`TWO DIFFERENT products with MULTIPLE quantities ADDED`, () => {
  const _VATRate = 20;
  const _product1 = {
    name: 'product1',
    price: 1.50,
    quantity: 2
  };

  const _product2 = {
    name: 'product2',
    price: 2.50,
    quantity: 3
  };
  let _instance;
  let _cart;

  beforeEach(() => {
    _instance = window[NETCENTRIC_NAMESPACE][MODULE_NAME]();
    _instance.init(_VATRate);

    _cart = _instance.addProducts([_product1, _product2]);
  });

  test(`cart's beforeVAT`, () => {
    const beforeVAT = _getProductBeforeVAT(_product1) +
    _getProductBeforeVAT(_product2)

    expect(_cart.total.beforeVAT).toBe(beforeVAT);
  });
});
