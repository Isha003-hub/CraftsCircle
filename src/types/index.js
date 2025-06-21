/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} name
 * @property {'admin' | 'buyer'} role
 */

/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {number} price
 * @property {string} image
 * @property {number} stock
 * @property {string} category
 * @property {Date} createdAt
 */

/**
 * @typedef {Object} CartItem
 * @property {string} id
 * @property {Product} product
 * @property {number} quantity
 */

/**
 * @typedef {Object} WishlistItem
 * @property {string} id
 * @property {Product} product
 */

/**
 * @typedef {Object} CheckoutData
 * @property {string} name
 * @property {string} email
 * @property {string} address
 * @property {string} city
 * @property {string} zipCode
 * @property {string} phone
 */

/**
 * @typedef {Object} Order
 * @property {string} id
 * @property {string} userId
 * @property {CartItem[]} items
 * @property {CheckoutData} checkoutData
 * @property {number} subtotal
 * @property {number} tax
 * @property {number} total
 * @property {'pending' | 'processing' | 'shipped' | 'delivered'} status
 * @property {Date} createdAt
 */
