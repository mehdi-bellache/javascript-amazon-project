import {cart, addToCart} from '../data/cart.js' ;
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js'; 


function buildQuantitySelect(product){
    let html = `<select class = "js-quantity-selector-${product.id}"> <option selected value="1">1</option>` ; 
    for(let i = 2; i<=10; i++){
        html += `<option value="${i}">${i}</option> ` ;
    }

    html += `</select>` ;

    return html ;
}

function buildProductHTML(product) {
    const { id, image, name, rating, priceCents } = product;

    return `
        <div class="product-container">
            <div class="product-image-container">
                <img class="product-image" src="${image}">
            </div>
            
            <div class="product-name limit-text-to-2-lines">${name}</div>
            
            <div class="product-rating-container">
                <img class="product-rating-stars" src="images/ratings/rating-${rating.stars * 10}.png">
                <div class="product-rating-count link-primary">${rating.count}</div>
            </div>
            
            <div class="product-price">$${formatCurrency(priceCents)}</div>
            
            <div class="product-quantity-container">
                ${buildQuantitySelect(product)}
            </div>
            
            <div class="product-spacer"></div>
            
            <div class="added-to-cart js-added-to-cart-${id}">
                <img src="images/icons/checkmark.png">Added
            </div>
            
            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${id}">
                Add to Cart
            </button>
        </div>
    `;
}

function buildAllProductsHTML(products){
    let allProductsHTML = `` ;
    products.forEach(product => {
        allProductsHTML += buildProductHTML(product) ;
    });

    return allProductsHTML ;

}

function renderProducts(){
    document.querySelector('.products-grid').innerHTML = buildAllProductsHTML(products);
}

renderProducts() ;


function countCartQuantity(){
    let cartQuantity = 0 ;

    cart.forEach(element =>{
        cartQuantity += element.quantity ;
    })

    return cartQuantity ;

}

function calculateCartQuantity(){
    let totalQuantity = 0 ;
    cart.forEach(cartItem => {
        totalQuantity += cartItem.quantity ; 
    });

    return totalQuantity ;

}

const addedMessageTimeouts = {};

document.querySelectorAll('.js-add-to-cart').forEach((button) => {

    button.addEventListener('click', function() {   
        const { productId } = button.dataset;

        const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
        addToCart(productId, quantity);
        document.querySelector('.js-cart-quantity').innerHTML = countCartQuantity();
        
        const addedElements = document.querySelectorAll(`.js-added-to-cart-${productId}`);
        addedElements.forEach(element => {
            element.classList.add('added-to-cart-visible');
        });
        
        const previousTimeoutId = addedMessageTimeouts[productId];
        if (previousTimeoutId) {
            clearTimeout(previousTimeoutId);
        }
        
        const timeoutId = setTimeout(function() {
            addedElements.forEach(element => {
                element.classList.remove('added-to-cart-visible');
            });
        }, 2000);
        
        addedMessageTimeouts[productId] = timeoutId;
    });
});