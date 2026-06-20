import {cart} from '../data/cart.js' ;
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js'; 



function buildProductHTML(cartProduct, product){

    let html = `<div class = "cart-item-container">` ;
    html += `<div class="delivery-date">Delivery date: Tuesday, June 21</div>` ;
    html += `<div class="cart-item-details-grid"><img class="product-image" src=${product.image}>` ; 
    html += `<div class="cart-item-details"> <div class="product-name">${product.name}</div> <div class="product-price">$${formatCurrency(product.priceCents)} </div>` ;
    html += `<div class="product-quantity"> <span> Quantity: <span class="quantity-label">${cartProduct.quantity}</span> </span> <span class="update-quantity-link link-primary"> Update </span> <span class="delete-quantity-link link-primary"> Delete </span> </div></div>`;
    html += `<div class="delivery-options"> <div class="delivery-options-title"> Choose a delivery option: </div>` ;
    html += `<div class="delivery-option"> <input type="radio" checked class="delivery-option-input" name="delivery-option-${cartProduct.id}"> <div> <div class="delivery-option-date"> Tuesday, June 21 </div>`;
    html += `<div class="delivery-option-price"> FREE Shipping </div> </div> </div>`;
    html += `<div class="delivery-option"> <input type="radio" class="delivery-option-input" name="delivery-option-${cartProduct.id}"> <div> <div class="delivery-option-date">Wednesday, June 15 </div>` ;
    html += `<div class="delivery-option-price"> $4.99 - Shipping </div> </div> </div> <div class="delivery-option"> <input type="radio" class="delivery-option-input" name="delivery-option-${cartProduct.id}">` ;
    html += `<div> <div class="delivery-option-date"> Monday, June 13 </div> <div class="delivery-option-price"> $9.99 - Shipping </div>` ;
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