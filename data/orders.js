export const orders = JSON.parse(localStorage.getItem("orders")) || [];

export function addOrder(order) {
  if (order !== null) {
    orders.unshift(order);
    saveToStorage();
  }
}

function getOrder(orderId) {
  const matchingOrder;
  orders.forEach((order) => {
    if (order.id === orderId) {
      matchingOrder = order;
    }
    return matchingOrder;
  });
}

function saveToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}
