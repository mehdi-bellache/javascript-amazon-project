import { orders } from "../data/orders.js";
import { formatCurrency } from "./utils/money.js";
import { products, loadProductsFetch, getProduct } from "../data/products.js";
import { cart } from "../data/cart-class.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

function renderOrderItemHTML(orderProduct) {
  const product = getProduct(orderProduct.productId);

  return `
    <div class="product-image-container">
      <img src="${product.image}">
    </div>

    <div class="product-details">
      <div class="product-name">
        ${product.name}
      </div>
      <div class="product-delivery-date">
        Arriving on: ${dayjs(orderProduct.estimatedDeliveryTime).format("MMMM D")}
      </div>
      <div class="product-quantity">
        Quantity: ${orderProduct.quantity}
      </div>
      <button class="buy-again-button js-buy-again-button button-primary" data-product-id="${product.id}">
        <img class="buy-again-icon" src="images/icons/buy-again.png">
        <span class="buy-again-message">Buy it again</span>
      </button>
    </div>

    <div class="product-actions">
      <a href="tracking.html?orderId=${orderProduct.productId}&productId=${product.id}">
        <button class="track-package-button button-secondary">
          Track package
        </button>
      </a>
    </div>
  `;
}

function renderOrderProductsHTML(orderProducts) {
  let result = `<div class="order-details-grid"> `;

  orderProducts.forEach((orderProduct) => {
    result += `${renderOrderItemHTML(orderProduct)}`;
  });
  result += `</div>`;

  return result;
}

function renderOrderHTML(order) {
  let orderHTML = `
    <div class="order-header">
      <div class="order-header-left-section">
        <div class="order-date">
          <div class="order-header-label">Order Placed:</div>
          <div>${dayjs(order.orderTime).format("MMMM D")}</div>
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

async function loadPage() {
  await loadProductsFetch();

  document.querySelector(".js-orders-grid").innerHTML =
    `${renderOrdersGridHTML()}`;

  document.querySelectorAll(".js-buy-again-button").forEach((button) => {
    button.addEventListener("click", function () {
      cart.addToCart(button.dataset.productId, 1);
      document.querySelector(".js-cart-quantity").innerHTML =
        `${cart.calculateCartQuantity()}`;
    });
  });

  // je peux faire en sorte que je fait une fonction dans cart-class qui affiche la nouvelle quantite.
  document.querySelector(".js-cart-quantity").innerHTML =
    `${cart.calculateCartQuantity()}`;
}

loadPage();
