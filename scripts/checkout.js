import {cart, deleteProductFromCart} from '../data/cart.js' ;
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js'; 
import {} from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js' ;


function buildProductHTML(cartProduct, product){

    let html = `<div class = "cart-item-container js-cart-item-container-${product.id}">` ;
    html += `<div class="delivery-date">Delivery date: Tuesday, June 21</div>` ;
    html += `<div class="cart-item-details-grid"><img class="product-image" src=${product.image}>` ; 
    html += `<div class="cart-item-details"> <div class="product-name">${product.name}</div> <div class="product-price">$${formatCurrency(product.priceCents)} </div>` ;
    html += `<div class="product-quantity"> <span> Quantity: <span class="quantity-label">${cartProduct.quantity}</span> </span> <span class="update-quantity-link link-primary"> Update </span> <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${product.id}"> Delete </span> </div></div>`;
    html += `<div class="delivery-options"> <div class="delivery-options-title"> Choose a delivery option: </div>` ;
    html += `<div class="delivery-option"> <input type="radio" checked class="delivery-option-input" name="delivery-option-${product.id}"> <div> <div class="delivery-option-date delivery-option-date-js-0"></div>`;
    html += `<div class="delivery-option-price"> FREE Shipping </div> </div> </div>`;
    html += `<div class="delivery-option"> <input type="radio" class="delivery-option-input" name="delivery-option-${product.id}"> <div> <div class="delivery-option-date delivery-option-date-js-1"></div>` ;
    html += `<div class="delivery-option-price"> $4.99 - Shipping </div> </div> </div> <div class="delivery-option"> <input type="radio" class="delivery-option-input" name="delivery-option-${product.id}">` ;
    html += `<div> <div class="delivery-option-date delivery-option-date-js-2"></div> <div class="delivery-option-price"> $9.99 - Shipping </div>` ;
    html += `</div> </div> </div> </div> </div>`;
    
    return html ;
}

function buildAllProductsHTML(cart, products){
    let allProductsHTML = `` ;

    cart.forEach(cartProduct => {
    products.forEach(product => { if(product.id === cartProduct.productId){
        allProductsHTML += buildProductHTML(cartProduct, product) ;

        }})
    })

    return allProductsHTML ;

}

function renderProducts(){
    document.querySelector('.js-order-summary').innerHTML = buildAllProductsHTML(cart, products);
}

renderProducts();


document.querySelectorAll('.js-delete-link').forEach(deleteButton => {deleteButton.addEventListener('click', () =>{
    const productId = deleteButton.dataset.productId ;
        deleteProductFromCart(productId);
        document.querySelector(`.js-cart-item-container-${productId}`).remove();
    })
});


const a = dayjs() ;
const b = a.add(7, 'day');
const c = a.add(3, 'day');
const d = a.add(1, 'day');

document.querySelectorAll('.delivery-option-date-js-0').forEach(deliveryOption =>{
    deliveryOption.innerHTML = b.format('dddd, D MMMM');
})
document.querySelectorAll('.delivery-option-date-js-1').forEach(deliveryOption =>{
    deliveryOption.innerHTML = c.format('dddd, D MMMM');
})
document.querySelectorAll('.delivery-option-date-js-2').forEach(deliveryOption =>{
    deliveryOption.innerHTML = d.format('dddd, D MMMM');
})