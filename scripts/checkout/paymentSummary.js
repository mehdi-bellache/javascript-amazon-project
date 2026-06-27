import {cart} from '../../data/cart.js' ;
import {products} from '../../data/products.js';
import {formatCurrency} from '.././utils/money.js'; 




function countItems(){
    let itemsNumber = 0 ;
    cart.forEach(element => {
        itemsNumber += element.quantity ; 
    });

    return itemsNumber ;

}

// function countShipping(){
//     let itemsNumber = 0 ;
//     cart.forEach(element => {
//         itemsNumber += element.quantity ; 
//     });
//     deliveryOptionId;

//     return itemsNumber ;

// }


export function renderPaymentSummary(){
    document.querySelector('.js-items').innerHTML = `Items (${countItems()}):` ;
}