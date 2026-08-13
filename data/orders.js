export const orders = JSON.parse(localStorage.getItem("orders")) || [];

export function addOrder(order) {
  if (order !== null) {
    orders.unshift(order);
    saveToStorage();
  }
}

export function getOrder(orderId) {
  let matchingOrder;
  orders.forEach((order) => {
    if (order.id === orderId) {
      matchingOrder = order;
    }
    return matchingOrder;
  });
}

export function gerOrderProduct(order, productId) {
  let matchingOrderProduct;
  order.products.foreach((product) => {
    if (product.productId === productId) {
      matchingOrderProduct = product;
    }
    return matchingOrderProduct;
  });
}

function saveToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}
