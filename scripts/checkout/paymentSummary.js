import {cart} from '../../data/cart.js' ;
import {products} from '../../data/products.js';
import {formatCurrency} from '.././utils/money.js'; 
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';


function calculateCartQuantity(){
    let totalQuantity = 0 ;
    cart.forEach(cartItem => {
        totalQuantity += cartItem.quantity ; 
    });

    return totalQuantity ;

}

function calculateCartTotal() {
    let totalCartPriceCents = 0;
    
    cart.forEach(cartItem => {
        products.forEach(product => {
            if (cartItem.productId === product.id) {
                totalCartPriceCents += product.priceCents * cartItem.quantity;
            }
        });
    });

    return totalCartPriceCents ;
}


function calculateShippingTotalCents() {
    let totalShippingCents = 0;
    
    cart.forEach(cartItem => { 
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        if (deliveryOption) {
            totalShippingCents += deliveryOption.priceCents;
        }
    });

    return totalShippingCents ;
}

function calculateTotalBeforeTax(){
    return totalCartPriceCents() + totalShippingCents() ;
}

function calculateTax(){
    return calculateTotalBeforeTax() / 10 ;
}

export function renderPaymentSummary(){

    document.querySelector('.js-items').innerHTML = `Items (${calculateCartQuantity()}):` ;
    document.querySelector('.js-payment-summary-money').innerHTML = `$${countShippingPrice()}` ;
    document.querySelector('.js-payment-summary-money').innerHTML = `$${calculateShippingTotalCents()}` ;
}