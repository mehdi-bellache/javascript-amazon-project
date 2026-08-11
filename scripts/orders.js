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

// fff(order)

function fff(order) {
  const hh = `<div class="order-header">
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
              <div>${order.id}</</div>
            </div>
          </div>`;

  hh += gg(order.products);
}

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
    result += renderOrderItemHTML(orderProduct);
  });

  return result;
}

function jjjj() {
  return orders.forEach((order) => {
    `<div class="order-container">
          <div class="order-details-grid">
            <div class="product-image-container">
              <img src="images/products/athletic-cotton-socks-6-pairs.jpg">
            </div>

            <div class="product-details">
              <div class="product-name">
                Black and Gray Athletic Cotton Socks - 6 Pairs
              </div>
              <div class="product-delivery-date">
                Arriving on: August 15
              </div>
              <div class="product-quantity">
                Quantity: 1
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=123&productId=456">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>

            <div class="product-image-container">
              <img src="images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg">
            </div>

            <div class="product-details">
              <div class="product-name">
                Adults Plain Cotton T-Shirt - 2 Pack
              </div>
              <div class="product-delivery-date">
                Arriving on: August 19
              </div>
              <div class="product-quantity">
                Quantity: 2
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          </div>
        </div>`;
  });
}
