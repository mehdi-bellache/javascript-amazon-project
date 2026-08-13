import { orders, getOrder, gerOrderProduct } from "../data/orders.js";
import { formatCurrency } from "./utils/money.js";
import { products, loadProductsFetch, getProduct } from "../data/products.js";
import { cart } from "../data/cart-class.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

function renderTrackingHTML() {
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get("orderId");
  const productId = url.searchParams.get("productId");

  const order = getOrder(orderId);
  const product = getProduct(productId);
  const orderProduct = gerOrderProduct(order, productId);

  const result = `
    <a class="back-to-orders-link link-primary" href="orders.html"> View all orders </a>

        <div class="delivery-date">
          Arriving on ${dayjs(orderProduct.estimatedDeliveryTime).format("dddd, MMMM D")};
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${orderProduct.quantity}
        </div>

        <img class="product-image" src=${product.name}>

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div> `;
}

async function loadPage() {
  await loadProductsFetch();
  document.querySelector(".js-order-tracking").innerHTML = renderTrackingHTML();
}

loadPage();
