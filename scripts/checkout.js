import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js" ;
import { calculateCartQuantity } from "../data/cart.js" ;
import '.././data/cart-class.js' ;


// je dois faire un nettoyage a mon code. !!!!

export function renderCheckoutHeader(){
    document.querySelector('.js-checkout-header-middle-section').innerHTML = `Checkout (<a class="return-to-home-link"
            href="amazon.html">${calculateCartQuantity()}</a>)` ;
}


renderOrderSummary();
renderPaymentSummary();
renderCheckoutHeader();