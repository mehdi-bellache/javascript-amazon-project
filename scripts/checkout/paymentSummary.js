import {cart, calculateCartQuantity} from '../../data/cart.js' ;
import {products} from '../../data/products.js';
import {formatCurrency} from '.././utils/money.js'; 
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';


function calculateCartTotalCents() {
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

function calculateTotalCentsBeforeTax(){
    return calculateCartTotalCents() + calculateShippingTotalCents() ;
}

function calculateTaxCents(){
    return calculateTotalCentsBeforeTax() / 10 ;
}

function calculateTotalAfterTax(){
    return calculateTotalCentsBeforeTax() + calculateTaxCents() ;
}

function buildPaymentSummaryHTML(){

    return `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (${calculateCartQuantity()}):</div>
            <div class="payment-summary-money">$${formatCurrency(calculateCartTotalCents())}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(calculateShippingTotalCents())}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(calculateTotalCentsBeforeTax())}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(calculateTaxCents())}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(calculateTotalAfterTax())}</div>
        </div>

        <button class="place-order-button button-primary js-place-order-button">
            Place your order
        </button>` ;
}

export function renderPaymentSummary(){
    document.querySelector('.js-payment-summary').innerHTML = buildPaymentSummaryHTML();

    document.querySelector('.js-place-order-button').addEventListener('click', async ()=>{
        const response = await fetch('https://supersimplebackend.dev/orders',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                cart: cart
            })
        })

        const order = await response.json();
        console.log(order);
    })
}