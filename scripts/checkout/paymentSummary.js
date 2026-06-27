import {cart} from '../../data/cart.js' ;
import {products} from '../../data/products.js';
import {formatCurrency} from '.././utils/money.js'; 
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';


function countItems(){
    let itemsNumber = 0 ;
    cart.forEach(element => {
        itemsNumber += element.quantity ; 
    });

    return itemsNumber ;

}

function countPrice(){
    let cartPrice = 0 ;
    cart.forEach(element => {
        products.forEach(product => {if(element.productId === product.id ){
            cartPrice += product.priceCents * element.quantity ;

        }} )
    });

    return formatCurrency(cartPrice) ;
}

function countShippingPrice(){
    let price = 0 ;
    cart.forEach(element =>{
        const deliveryOption = getDeliveryOption(element.deliveryOption);
        price += deliveryOption.priceCents ;
    })

    return price ;

}

export function renderPaymentSummary(){

    document.querySelector('.js-items').innerHTML = `Items (${countItems()}):` ;
    document.querySelector('.js-payment-summary-money').innerHTML = `$${countPrice()}` ;
    document.querySelector('.js-payment-summary-money').innerHTML = `$${countPrice()}` ;
    countShippingPrice();

}