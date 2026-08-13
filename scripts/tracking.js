import { orders, getOrder, getOrderProduct } from "../data/orders.js";
import { products, loadProductsFetch, getProduct } from "../data/products.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

function calculateDeliveryProgress(order, orderProduct) {
  const currentTime = dayjs();
  const orderTime = dayjs(order.orderTime);
  const deliveryTime = dayjs(orderProduct.estimatedDeliveryTime);
  return ((currentTime - orderTime) / (deliveryTime - orderTime)) * 100;
}

function renderTrackingHTML() {
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get("orderId");
  const productId = url.searchParams.get("productId");

  const order = getOrder(orderId);
  const product = getProduct(productId);
  const orderProduct = getOrderProduct(order, productId);

  const result = `
    <a class="back-to-orders-link link-primary" href="orders.html"> View all orders </a>

        <div class="delivery-date">
          Arriving on ${dayjs(orderProduct.estimatedDeliveryTime).format("dddd, MMMM D")}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${orderProduct.quantity}
        </div>

        <img class="product-image" src=${product.image}>

        <div class="progress-labels-container" style="width:${calculateDeliveryProgress(order, orderProduct)}%">
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

  return result;
}

async function loadPage() {
  await loadProductsFetch();
  document.querySelector(".js-order-tracking").innerHTML = renderTrackingHTML();
}

loadPage();
