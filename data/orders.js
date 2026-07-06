export const orders = [];


function addOrder(order){
    if(order !== null){
        orders.unshift(order);
    }
}

function saveToStorage(){
    localStorage.setItem('orders', JSON.stringify(orders));
}