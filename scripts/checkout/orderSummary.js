import {cart, deleteProductFromCart, updateDeliveryOption, updateQuantity, calculateCartQuantity} from '../../data/cart.js' ;
import {products} from '../../data/products.js';
import {formatCurrency} from '.././utils/money.js'; 
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js' ;
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js' ;
import { renderCheckoutHeader } from '../checkout.js' ;


function deliveryOptionsHTML(cartProduct, product){
    let html = ``;
    deliveryOptions.forEach(deliveryOption =>{
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days').format('dddd, D MMMM');
        const deliveryPrice = deliveryOption.priceCents;
        const priceString = deliveryPrice === 0 ? `FREE Shipping` : `$${formatCurrency(deliveryPrice)} - Shipping` ;
        const isChecked = deliveryOption.id === cartProduct.deliveryOptionId ;
        html += `
            <div class="delivery-option js-delivery-option" data-product-id ="${product.id}" data-delivery-option-id="${deliveryOption.id}">
                <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${product.id}">
                <div>
                    <div class="delivery-option-date delivery-option-date-js">${deliveryDate}</div>
                    <div class="delivery-option-price">${priceString}</div>
                </div>
            </div>
        `;
    })

    return html ;
}

function buildProductHTML(cartProduct, product) {
    const {id, image, name, priceCents} = product ;

    const deliveryOptionId = cartProduct.deliveryOptionId ;
    const deliveryOption = getDeliveryOption(deliveryOptionId);
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days').format('dddd, D MMMM');

    return `
        <div class="cart-item-container js-cart-item-container js-cart-item-container-${id}">
            <div class="delivery-date">Delivery date: ${deliveryDate}</div>
            
            <div class="cart-item-details-grid">
                <img class="product-image" src="${image}">
                
                <div class="cart-item-details">
                    <div class="product-name">${name}</div>
                    <div class="product-price">$${product.getPrice()}</div>
                    
                    <div class="product-quantity js-product-quantity-${id}">
                        <span>Quantity: <span class="quantity-label">${cartProduct.quantity}</span></span>
                        <span class="update-quantity-link link-primary js-update-link" data-product-id="${id}">Update</span>
                        <input type = "number" min= "0" max ="999"class="quantity-input js-quantity-input js-quantity-input-${id}" data-product-id="${id}">
                        <span class="save-quantity-link link-primary js-save-link" data-product-id="${id}">Save</span>
                        <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${id}" data-product-id="${id}">Delete</span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">Choose a delivery option:</div>
                    ${deliveryOptionsHTML(cartProduct, product)}
                </div>
            </div>
        </div>
    `;
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

function saveQuantity(productId){
    document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');
    const newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
    updateQuantity(productId, newQuantity);
    renderOrderSummary();
    document.querySelector('.js-checkout-header-middle-section').innerHTML = `Checkout (<a class="return-to-home-link"
        href="amazon.html">${calculateCartQuantity()}</a>)` ;
}

export function renderOrderSummary(){
    document.querySelector('.js-order-summary').innerHTML = buildAllProductsHTML(cart, products) ;

    document.querySelectorAll('.js-delete-link').forEach(deleteButton => {
        deleteButton.addEventListener('click', () =>{

            const {productId} = deleteButton.dataset ;
            deleteProductFromCart(productId);
            document.querySelector(`.js-cart-item-container-${productId}`).remove();
            renderPaymentSummary();
            renderCheckoutHeader();
        })
    });

    document.querySelectorAll('.js-update-link').forEach(updateButton => {
        updateButton.addEventListener('click', () =>{
            const {productId} = updateButton.dataset ;
            document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity');
        })
    });

    document.querySelectorAll('.js-save-link').forEach((saveButton) =>{
        saveButton.addEventListener('click', () =>{
            const {productId} = saveButton.dataset ;
            saveQuantity(productId);
        })
    })

    document.querySelectorAll('.js-quantity-input').forEach(inputField => {
        inputField.addEventListener('keydown', (event) =>{
            if(event.key === 'Enter'){
                const {productId} = inputField.dataset ;
                saveQuantity(productId);
            }

        })

    })

    document.querySelectorAll('.js-delivery-option').forEach(element =>{

        element.addEventListener('click', function(){
            const {productId, deliveryOptionId} = element.dataset ;
            updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
            
        })

    })
}