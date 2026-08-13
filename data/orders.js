export const orders = JSON.parse(localStorage.getItem("orders")) || [];

export function addOrder(order) {
  if (order !== null) {
    orders.unshift(order);
    saveToStorage();
  }
}

export function getOrder(orderId) {
  return orders.find((order) => order.id === orderId);
}

export function getOrderProduct(order, productId) {
  return order.products.find((product) => product.productId === productId);
}

function saveToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}
