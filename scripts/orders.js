import { orders } from "../data/orders.js";
import { formatCurrency } from "./utils/money.js";
import { Product, products } from "../data/products.js";
import { cart } from "../data/cart-class.js";
import {
  deliveryOptions,
  getDeliveryOption,
  calculateDeliveryDate,
} from "../data/deliveryOptions";

// js - orders - grid;

function renderOrderItemHTML(orderProduct) {
  const product = products.find((product) => product.id === orderProduct.id);
  const cartItem = cart.cartItems.find(
    (cartItem) => cartItem.id === orderProduct.id,
  );

  const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

  return `
    <div class="product-image-container">
      <img src="${product.image}">
    </div>

    <div class="product-details">
      <div class="product-name">
        ${product.name}
      </div>
      <div class="product-delivery-date">
        Arriving on: ${calculateDeliveryDate(deliveryOption)}
      </div>
      <div class="product-quantity">
        Quantity: ${cartItem.quantity}
      </div>
      <button class="buy-again-button button-primary">
        <img class="buy-again-icon" src="images/icons/buy-again.png">
        <span class="buy-again-message">Buy it again</span>
      </button>
    </div>

    <div class="product-actions">
      <a href="tracking.html?orderId=${orderProduct.id}&productId=${product.id}">
        <button class="track-package-button button-secondary">
          Track package
        </button>
      </a>
    </div>
  `;
}

function renderOrderProductsHTML(orderProducts) {
  let result = ``;

  orderProducts.forEach((orderProduct) => {
    result +=
      `<div class="order-details-grid">` +
      renderOrderItemHTML(orderProduct) +
      `</div>`;
  });

  return result;
}

function renderOrderHTML(order) {
  let orderHTML = `
    <div class="order-header">
      <div class="order-header-left-section">
        <div class="order-date">
          <div class="order-header-label">Order Placed:</div>
          <div>${order.orderTime}</div>
        </div>
        <div class="order-total">
          <div class="order-header-label">Total:</div>
          <div>$${formatCurrency(order.totalCostCents)}</div>
        </div>
      </div>

      <div class="order-header-right-section">
        <div class="order-header-label">Order ID:</div>
        <div>${order.id}</div>
      </div>
    </div>
  `;

  orderHTML += renderOrderProductsHTML(order.products);

  return orderHTML;
}

function renderOrdersGridHTML() {
  let result = ``;
  orders.forEach((order) => {
    result += `<div class="order-container">${renderOrderHTML(order)}</div>`;
  });

  return result;
}
